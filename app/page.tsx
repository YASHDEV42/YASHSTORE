import { auth } from "@/auth";
import Hero from "@/components/pages/Hero";
import { Session } from "next-auth";
import { User } from "@/types";
export default async function Home() {
  const session = (await auth()) as Session | null;
  const user = session?.user as User | null;

  return (
    <main className="">
      <Hero user={user || null} />
    </main>
  );
}
