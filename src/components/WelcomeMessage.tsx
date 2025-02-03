"use client";

import { Card } from "@/components/ui/card";

interface WelcomeMessageProps {
  firstName?: string | null;
  lastName?: string | null;
}

export function WelcomeMessage({ firstName, lastName }: WelcomeMessageProps) {
  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "night"; // 12 AM - 5:59 AM
    if (hour < 12) return "morning"; // 6 AM - 11:59 AM
    if (hour < 18) return "afternoon"; // 12 PM - 5:59 PM
    if (hour < 22) return "evening"; // 6 PM - 9:59 PM
    return "night"; // 10 PM - 11:59 PM
  };

  const displayName = firstName || "there";

  return (
    <Card className="p-6 ">
      <h1 className="text-3xl font-bold mb-2 ">
        Good {timeOfDay()},{" "}
        <span className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
          {displayName}
        </span>
        !
      </h1>
      <p className="text-gray-600">
        Welcome to your AI companion dashboard. What would you like to do today?
      </p>
    </Card>
  );
}
