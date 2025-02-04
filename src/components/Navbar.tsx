import React from "react";
import ClerkForm from "./ClerkForm";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b z-50">
      <nav className="h-16 flex items-center">
        <div className="flex justify-between items-center container mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            Ai Mori
          </Link>

          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full",
                  },
                }}
              />
            </SignedIn>
            <SignedIn>
              <ClerkForm text={"Sign Out"} />
            </SignedIn>

            <div className="hidden sm:block">
              <ClerkForm text={"Sign In"} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
