"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Auth", path: "/auth" },
    { name: "Create Profile", path: "/create-profile" },
    { name: "Planner", path: "/planner" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between">
      
      
      <div className="flex items-center gap-2">
        <Image
          src="/mainlogo.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="text-lg font-semibold tracking-wide">
          <span className="text-[#91c7da]">Influencer</span>{" "}
          <span className="text-[#124253]">Hub</span>
        </p>
      </div>

      
      <div className="flex items-center gap-10 relative">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;

          return (
            <Link
              key={link.name}
              href={link.path}
              className={`relative text-sm font-medium transition-colors duration-200 ${
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

   
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <Image
            src="/profile.png"
            alt="profile"
            width={32}
            height={32}
          />
        </div>
        <span className="text-sm font-semibold text-[#124253]">
          Name
        </span>
      </div>
    </nav>
  );
}
