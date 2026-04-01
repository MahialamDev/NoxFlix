"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/", emoji: "🏠" },
  { label: "Movies", href: "/movies", emoji: "🎬" },
  { label: "Thriller", href: "/movies?genre=Thriller", emoji: "🔪" },
  { label: "Sci-Fi", href: "/movies?genre=Sci-Fi", emoji: "🚀" },
  { label: "Horror", href: "/movies?genre=Horror", emoji: "💀" },
  { label: "Action", href: "/movies?genre=Action", emoji: "💥" },
  { label: "Crime", href: "/movies?genre=Crime", emoji: "🕵️" },
];

function useActiveLink() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  return function isActive(href) {
    if (href === "/") return pathname === "/";
    if (href.includes("?genre=")) {
      return pathname === "/movies" && genre === href.split("?genre=")[1];
    }
    return pathname === "/movies" && !genre;
  };
}

function DesktopLinks() {
  const isActive = useActiveLink();
  return (
    <>
      {navLinks.slice(0, 5).map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`text-sm font-medium transition-colors ${
            isActive(href) ? "text-red-500" : "text-gray-400 hover:text-white"
          }`}
        >
          {label}
        </Link>
      ))}
    </>
  );
}

function DrawerLinks({ onClose }) {
  const isActive = useActiveLink();
  return (
    <>
      {navLinks.map(({ label, href, emoji }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            isActive(href)
              ? "bg-red-600/15 text-red-400 border border-red-600/30"
              : "text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent"
          }`}
        >
          <span className="text-lg w-6 text-center">{emoji}</span>
          {label}
          {isActive(href) && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />
          )}
        </Link>
      ))}
    </>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    }
    if (drawerOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [drawerOpen]);

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800 py-1">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* Logo */}
          <Logo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Suspense fallback={null}>
              <DesktopLinks />
            </Suspense>
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
              Login
            </Link>
            <Link href="/register" className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Register
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-gray-950 border-l border-gray-800 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 text-xl font-black">NOIR</span>
            <span className="text-white text-xl font-black">FLIX</span>
            <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">18+</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Auth buttons */}
        <div className="px-4 py-4 border-b border-gray-800 flex gap-3">
          <Link
            href="/login"
            onClick={() => setDrawerOpen(false)}
            className="flex-1 text-center bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            onClick={() => setDrawerOpen(false)}
            className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <p className="text-gray-600 text-xs uppercase font-bold tracking-widest px-4 mb-3">Navigation</p>
          <Suspense fallback={null}>
            <DrawerLinks onClose={() => setDrawerOpen(false)} />
          </Suspense>
        </div>

        {/* Drawer footer */}
        <div className="px-5 py-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-500 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </>
  );
}
