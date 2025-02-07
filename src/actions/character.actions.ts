"use server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.actions";

interface CharacterData {
  name: string;
  personality: string;
  appearance: string;
  gender: string;
  occupation: string;
}

export async function createCharacter(data: CharacterData) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    // Verificar si el usuario ya tiene un personaje (debido al @unique en userId)
    const existingCharacter = await prisma.character.findUnique({
      where: { userId },
    });

    if (existingCharacter) {
      return { success: false, error: "User already has a character" };
    }

    const character = await prisma.character.create({
      data: {
        ...data,
        userId: userId,
      },
    });

    return { success: true, character };
  } catch (error) {
    console.error("Error creating character:", error);
    return { success: false, error: "Error creating character" };
  }
}

export async function getCharacter() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    const character = await prisma.character.findUnique({
      where: { userId },
    });

    if (!character) {
      return { success: false, error: "No character found" };
    }

    return { success: true, character };
  } catch (error) {
    console.error("Error getting character:", error);
    return { success: false, error: "Error getting character" };
  }
}
