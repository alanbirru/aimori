import React from "react";
import { getOrCreateUser } from "@/actions/user.actions";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import BackgroundGrid from "@/components/BackgroundGrid";
import Sidebar from "@/components/DashboardComponents/Sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = async () => {
  const dbUser = await getOrCreateUser();

  if (!dbUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-5">
        <h2 className="text-2xl font-semibold text-gray-800">Not Signed In</h2>
        <p className="text-gray-600">Please sign in to access your dashboard</p>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <BackgroundGrid />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <div className="flex h-[calc(100vh-64px)] bg-gradient-to-b from-white to-blue-50/30 mt-16 pl-16 sm:pl-0">
            <div className="container mx-auto p-4">
              <WelcomeMessage
                firstName={dbUser.firstName}
                lastName={dbUser.lastName}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
