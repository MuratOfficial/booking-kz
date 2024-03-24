import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import SideMenuProfile from "./components/side-menu";

export const metadata: Metadata = {
  title: {
    template: "%s | Профиль | etazhi.kz",
    default: "Профиль",
  },
  description: "etazhi.kz | etazhi.kz",
};

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  //   const session = await getServerSession(authOptions);

  //   const userIdData = JSON.parse(JSON.stringify(session));

  //   const isAdmin = await prismadb.user.findUnique({
  //     where: {
  //       id: userIdData?.user?.id,
  //     },
  //   });

  //   if (isAdmin?.isAdmin === false) {
  //     return <NotFound />;
  //   }

  return (
    <div className="w-full grid grid-cols-5 gap-4">
      <SideMenuProfile />
      <div className="rounded-3xl  col-span-4   flex flex-col gap-4 w-full">
        {children}
      </div>
    </div>
  );
}
