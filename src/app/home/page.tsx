import { auth } from "@/auth";
import Content from "./content";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <Content session={session} />
    </div>
  );
}
