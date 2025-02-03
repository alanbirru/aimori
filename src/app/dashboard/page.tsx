import { currentUser } from "@clerk/nextjs/server";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { prisma } from "@/lib/prisma";
import BackgroundGrid from "@/components/BackgroundGrid";

export default async function Page() {
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;

  // Crear o actualizar usuario en Neon directamente
  try {
    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      create: {
        clerkId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    return (
      <>
        <BackgroundGrid />

        <div className="container mx-auto p-4 mt-16">
          <WelcomeMessage firstName={user.firstName} lastName={user.lastName} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error al sincronizar usuario:", error);
    return <div>Error loading dashboard</div>;
  }
}
