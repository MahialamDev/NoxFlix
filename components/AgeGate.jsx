"use client";
import { useState, useEffect } from "react";

export default function AgeGate({ children }) {
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("age_verified");
    setVerified(stored === "true");
  }, []);

  function handleConfirm() {
    sessionStorage.setItem("age_verified", "true");
    setVerified(true);
  }

  function handleDeny() {
    setVerified(false);
  }

  if (verified === null) return null; // avoid flash

  if (!verified) {
    return (


     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
  <div className="max-w-md w-full mx-4 text-center">
    
    {/* ব্র্যান্ড লোগো বা আইকন */}
    <div className="mb-8">
      <div className="inline-block p-4 rounded-full bg-red-600/10 border border-red-600/20 mb-4">
        <span className="text-4xl">🎬</span> 
      </div>
      <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
        VANT<span className="text-red-600">FLIX</span>
      </h1>
    </div>

    <h2 className="text-xl font-bold text-white mb-3">Welcome to the Cinema</h2>
    
    <p className="text-gray-400 mb-8 text-sm leading-relaxed px-4">
      To provide the best streaming experience, we use cookies and require agreement to our content policy and age guidelines.
    </p>

    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 mb-6 shadow-2xl">
      <p className="text-white font-bold mb-6 text-lg">Are you ready to watch?</p>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={handleConfirm}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-600/20 uppercase tracking-wider"
        >
          Enter Cinema
        </button>
        
        <button
          onClick={handleDeny}
          className="w-full bg-transparent border border-gray-700 hover:border-gray-500 text-gray-400 font-bold py-3 rounded-xl transition-all text-sm uppercase"
        >
          No, Take me back
        </button>
      </div>
    </div>

    <div className="space-y-2">
      <p className="text-gray-600 text-[10px] uppercase tracking-widest leading-tight">
        By entering, you agree to our Terms of Service, Privacy Policy, and confirm you meet the age requirements for cinematic content.
      </p>
    </div>
  </div>
</div>
    );
  }

  return children;
}

