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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="mb-6">
            <span className="text-6xl">🔞</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Age Verification</h1>
          <p className="text-gray-400 mb-8">
            This website contains content intended for adults only (18+). You must confirm your age to continue.
          </p>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
            <p className="text-white font-medium mb-4">Are you 18 years of age or older?</p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Yes, I am 18+
              </button>
              <button
                onClick={handleDeny}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                No, exit
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-xs">
            By entering, you confirm you are of legal age in your jurisdiction to view adult content.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
