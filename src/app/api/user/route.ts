import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/actions/user.actions";

export async function GET() {
  try {
    const user = await getOrCreateUser();
    console.log("api user:", user);

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}
