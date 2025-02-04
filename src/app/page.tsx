import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import FeaturesSection from "@/components/LandingPageComponents/FeaturesSection";
import BackgroundGrid from "@/components/BackgroundGrid";

import HeroSection from "@/components/LandingPageComponents/HeroSection";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      {/* Grid Background - Movido fuera del main y ajustado para cubrir toda la pantalla */}
      <BackgroundGrid />
      <main className="flex flex-col items-center justify-between">
        {/* Hero Section */}
        <HeroSection />
        {/* Features Section */}
        <FeaturesSection />
      </main>
    </>
  );
}
