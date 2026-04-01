"use client";
import { useEffect, useState } from "react";

function InfoItem({ label, value, full = false }) {
  return (
    <div className={`space-y-1 ${full ? "col-span-2" : "col-span-1"}`}>
      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{label}</p>
      <p className="text-sm text-white font-semibold truncate">{value || "N/A"}</p>
    </div>
  );
}

export default function UserInsights() {
  const [myIp, setMyIp] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      // get ip
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      const ip = ipData.ip;
      setMyIp(ip);

      // get location
      const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const locData = await locRes.json();
      setLocation(locData);

      // store ip in database
      await fetch("https://pagenation-server.vercel.app/all-ip-collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ip: ip,
          city: locData.city,
          country: locData.country_name,
          org: locData.org,
          time: new Date()
        })
      });

    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  fetchUserData();
}, []);

  return (
    <div className="mb-12 ">
      <h2 className="text-white font-bold text-xl mb-5 flex items-center gap-2">
        <span>📍</span> Your Network Info
      </h2>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-400 text-sm">Your IP Address</span>
            <span className="font-mono text-red-400 font-bold text-sm">
              {myIp || "Detecting..."}
            </span>
          </div>
          {location && (
            <span className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-400 text-xs font-bold rounded-lg uppercase tracking-widest">
              {location.version}
            </span>
          )}
        </div>

        {location ? (
          <>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              <InfoItem label="City / Region" value={`${location.city}, ${location.region}`} />
              <InfoItem label="Country" value={`${location.country_name} (${location.country_code})`} />
              <InfoItem label="Timezone" value={location.timezone} />
              <InfoItem label="Currency" value={`${location.currency_name} (${location.currency})`} />
              <InfoItem label="ISP" value={location.org} full />
            </div>
            <div className="bg-black/40 px-6 py-3 border-t border-gray-800 text-center">
              <p className="text-gray-600 text-xs tracking-wide">
                Secure connection via:{" "}
                <span className="text-red-400 font-mono">{location.network}</span>
              </p>
            </div>
          </>
        ) : (
          <div className="p-6 flex items-center gap-3 text-gray-500 text-sm">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Fetching location data...
          </div>
        )}
      </div>
    </div>
  );
}
