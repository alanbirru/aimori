"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface UserData {
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  email: string | null;
}

export async function getOrCreateUser() {
  try {
    const clerkUser = await currentUser();
    const { userId } = await auth();

    console.log("Clerk User:", clerkUser);
    console.log("User ID:", userId);

    if (!clerkUser || !userId) {
      console.log("Unauthorized: Missing Clerk User or User ID");
      throw new Error("Unauthorized");
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { character: true },
    });

    if (!user) {
      console.log("Creating a new user in the database");
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          imageUrl: clerkUser.imageUrl,
        },
        include: { character: true },
      });
    }

    return user;
  } catch (error) {
    console.error("Error in getOrCreateUser:", error);
    throw error;
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
