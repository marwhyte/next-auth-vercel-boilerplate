import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logout from "@/components/Logout";

const HomePage = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Hello, {session?.user?.name ?? session?.user?.email}</h1>
      {/* <Image
        src={session.user.image!}
        alt={session.user.name!}
        width={100}
        height={100}
        className="rounded-full"
      /> */}
      <Logout />
    </div>
  );
};

export default HomePage;
