"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, getDoc , onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../lib/firebase";

export default function Navbar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Auth", path: "/login" },
    { name: "CreateProfile", path: "/form" },
    { name: "Planner", path: "/planner" },
    { name: "Analytics", path: "/analytics" },
  ];

 useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (!user) {
      setUserName("");
      return;
    }

    const unsubscribeProfile = onSnapshot(
      doc(db, "profiles", user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        }
      }
    );

    return () => unsubscribeProfile();
  });

  return () => unsubscribeAuth();
}, []);

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between relative ">

   
      <div className="flex items-center gap-2">
        <Image
          src="/mainlogo.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
        />
        <p className="text-base sm:text-lg font-semibold tracking-wide">
          <span className="text-[#91c7da]">Influencer</span>{" "}
          <span className="text-[#124253]">Hub</span>
        </p>
      </div>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;

          return (
            <Link
              key={link.name}
              href={link.path}
              className={`relative text-[16px] font-medium transition-colors duration-200 ${
                isActive
                  ? "text-[#124253]"
                  : "text-gray-500 hover:text-[#124253]"
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute -bottom-3 left-0 w-full h-[3px] bg-[#91c7da] rounded-full"></span>
              )}
            </Link>
          );
        })}
      </div>

     
      <div className="hidden md:flex items-center gap-3">
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <Image
            src="/profile.png"
            alt="profile"
            width={32}
            height={32}
          />
        </div>
        <span className="text-sm font-semibold text-[#124253]">
          {userName || "Loading..."}
        </span>
      </div>

    
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-0.5 bg-[#124253] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-[#124253] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-[#124253] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

     
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="flex flex-col py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#124253] bg-gray-50 border-l-4 border-[#91c7da]"
                      : "text-gray-500 hover:text-[#124253] hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="flex items-center gap-3 px-6 py-3 mt-2 border-t border-gray-200">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src="/profile.png"
                  alt="profile"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-sm font-semibold text-[#124253]">
                {userName || "Loading..."}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
