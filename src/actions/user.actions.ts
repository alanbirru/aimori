import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

interface UserData {
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  email: string | null;
}

export async function getOrCreateUser(): Promise<User | null> {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("No authenticated user found");
    }

    const email = user.emailAddresses[0]?.emailAddress ?? null;

    // Obtener nombre del email si no hay firstName
    const nameFromEmail = email
      ? email.split("@")[0].replace(/[0-9]/g, "").replace(/\./g, " ")
      : null;

    // Extraer datos del usuario de Clerk
    const userData: UserData = {
      firstName: user.firstName || nameFromEmail || "User", // Fallback a nameFromEmail o "User"
      lastName: user.lastName || "", // Fallback a string vacío
      imageUrl: user.imageUrl,
      email: email,
    };

    if (!user.id) {
      throw new Error("User ID is required");
    }

    const dbUser = await prisma.user.upsert({
      where: {
        clerkId: user.id,
      },
      update: {
        ...userData,
        updatedAt: new Date(),
      },
      create: {
        clerkId: user.id,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return dbUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserId(): Promise<string | null> {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("No authenticated user found");
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!dbUser) {
      throw new Error("User not found in database");
    }

    return dbUser.id;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}
