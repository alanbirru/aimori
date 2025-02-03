import React from "react";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface ClerkFormProps {
  text: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

function ClerkForm({ text, variant = "default", size = "lg" }: ClerkFormProps) {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant={variant}
            size={size}
            className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:scale-105 text-white shadow-lg hover:shadow-xl transition-all duration-300 bg-[length:200%_auto] hover:bg-[center_right_1rem] animate-gradient"
          >
            {text}
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}

export default ClerkForm;
