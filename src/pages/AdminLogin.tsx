import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

// Simple password hashing (SHA-256)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

const ADMIN_USERNAME = "hmeinventory";
const ADMIN_PASSWORD = "12345678";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const isValidPassword = (pw: string) => pw.length >= 8;

  // Register admin user if not present
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      toast({ title: "Weak Password", description: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }
    const passHash = await hashPassword(password);
    // Only support one admin registration for now
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (user) {
      toast({ title: "Account Exists", description: "Admin already registered. Please login." });
      return;
    }

    const { error: insertError } = await supabase
      .from("users")
      .insert({ username, password_hash: passHash });
    if (insertError) {
      toast({ title: "Registration Error", description: insertError.message, variant: "destructive" });
      return;
    }
    toast({ title: "Account Created!", description: "Admin registered. Please login." });
    setRegisterMode(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const passHash = await hashPassword(password);
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password_hash", passHash)
      .single();
    if (error || !user) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem("adminSession", "true");
    toast({
      title: "Login Success",
      description: "Welcome, admin!",
    });
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={registerMode ? handleRegister : handleLogin}
        className="w-full max-w-sm bg-white shadow rounded-md p-8 space-y-5"
      >
        <h2 className="text-xl font-semibold text-center">
          {registerMode ? "Admin Registration" : "Admin Login"}
        </h2>
        <Input
          autoFocus
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">
          {registerMode ? "Register" : "Login"}
        </Button>
        <div className="flex justify-center mt-2">
          <Button
            type="button"
            variant="link"
            className="text-xs"
            onClick={() => setRegisterMode(!registerMode)}
          >
            {registerMode
              ? "Already have an account? Login"
              : "No account? Register"}
          </Button>
        </div>
        <div className="mt-3 text-xs text-center text-muted-foreground">
          Demo: <b>hmeinventory</b> / <b>12345678</b>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
