import { getOrCreateUser } from "@/actions/user.actions";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import BackgroundGrid from "@/components/BackgroundGrid";

export default async function Page() {
  const dbUser = await getOrCreateUser();
  if (!dbUser) return <div>Not signed in</div>;

  return (
    <>
      <BackgroundGrid />

      <div className="container mx-auto p-4 mt-16">
        <WelcomeMessage
          firstName={dbUser.firstName}
          lastName={dbUser.lastName}
        />
      </div>
    </>
  );
}
