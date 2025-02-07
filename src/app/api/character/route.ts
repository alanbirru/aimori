import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  console.log("Received chat request");

  try {
    // Get the authenticated user using currentUser
    const user = await currentUser();
    console.log("Clerk currentUser:", user); // Debugging

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Fetch or create the user in the database
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await request.json();
    console.log("Request body:", body);

    if (!body?.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Find the character for the user
    const character = await prisma.character.findUnique({
      where: {
        userId: dbUser.id,
      },
    });

    if (!character) {
      return NextResponse.json(
        { error: "Please create a character first" },
        { status: 404 }
      );
    }

    console.log("Found character:", character.name);

    // System prompt for the chatbot
    const systemPrompt = `You are roleplaying as ${character.name}, with these traits:
    Personality: ${character.personality}
    Appearance: ${character.appearance}
    Gender: ${character.gender}
    Occupation: ${character.occupation}

    Rules:
    1. Stay in character at all times
    2. Keep responses brief (2-3 sentences)
    3. Include actions in [brackets] to show body language
    4. Never mention being an AI
    5. Respond naturally and show personality through speech
    6. Use emotive language appropriate to your character`;

    try {
      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Use the correct model name
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: body.message },
        ],
        temperature: 0.9,
        max_tokens: 150,
      });

      const reply = completion.choices[0]?.message?.content?.trim();
      if (!reply) {
        throw new Error("Empty response from OpenAI");
      }

      console.log("Generated reply:", reply);

      // Extract action from reply if present
      let content = reply;
      let action = undefined;
      const actionMatch = reply.match(/\[(.*?)\]/);
      if (actionMatch) {
        action = actionMatch[1];
        content = reply.replace(/\[(.*?)\]/, "").trim();
      }

      // Save the chat message to the database
      await prisma.chat.create({
        data: {
          message: body.message,
          userId: dbUser.id,
          characterId: character.id,
        },
      });

      return NextResponse.json({
        success: true,
        reply: content,
        action: action,
        character: {
          name: character.name,
          avatar: "/images/character-avatar.jpg", // Update this with your actual avatar logic
        },
      });
    } catch (openAiError) {
      console.error("OpenAI API Error:", openAiError);
      return NextResponse.json(
        {
          error: "Failed to generate response",
          details:
            openAiError instanceof Error
              ? openAiError.message
              : "Unknown OpenAI error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
