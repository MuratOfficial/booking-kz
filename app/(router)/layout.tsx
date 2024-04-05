import type { Metadata } from "next";
import MainNav from "@/components/layouts/main-nav";
import Footer from "@/components/layouts/footer";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import prismadb from "@/lib/prismadb";
import { fetchUserChats } from "@/lib/fetchChats";

export const metadata: Metadata = {
  title: {
    template: "%s | etazhi.kz",
    default: " etazhi.kz",
  },
  description: " Обьявления аренды и продажи недвижимостей",
};

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;

  let userData;
  let chats;

  if (session?.user) {
    userData = await prismadb?.user?.findUnique({
      where: {
        id: userIdData?.id,
      },
    });
    chats = await fetchUserChats();
  } else {
    userData = null;
    chats = null;
  }

  return (
    <main className="min-h-screen">
      <Suspense>
        <MainNav userData={userData} chats={chats} />
      </Suspense>
      {children}
      <Footer />
    </main>
  );
}
