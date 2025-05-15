
import React from "react";
import { Loader as LoaderIcon } from "lucide-react";

const FuturisticLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="flex flex-col items-center animate-fadeIn">
      <LoaderIcon className="animate-spin text-blue-500" size={60} strokeWidth={1.5}/>
      <span className="mt-4 text-lg text-blue-200 font-medium tracking-widest neon-text">Loading...</span>
      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 6px #00f0ff, 0 0 12px #00c0cc, 0 0 20px #75ffff;
        }
        @keyframes fadeIn {
          0% { opacity: 0 }
          100% { opacity: 1 }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s;
        }
      `}</style>
    </div>
  </div>
);

export default FuturisticLoader;
