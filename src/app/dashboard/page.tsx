import React from "react";
import { getOrCreateUser } from "@/actions/user.actions";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import BackgroundGrid from "@/components/BackgroundGrid";
import Sidebar from "@/components/DashboardComponents/Sidebar";

export default async function DashboardPage() {
  const dbUser = await getOrCreateUser();
  if (!dbUser) return <div>Not signed in</div>;

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
}
