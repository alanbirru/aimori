import { getOrCreateUser } from "@/actions/user.actions";
import CharacterForm from "@/components/CharacterCreatorComponents/CharacterForm";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import BackgroundGrid from "@/components/BackgroundGrid";
export default async function CharacterCreation() {
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
      <div>
        <CharacterForm />
      </div>
    </>
  );
}
