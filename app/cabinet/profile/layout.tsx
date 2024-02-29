import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | Профиль | booking.kz",
    default: "Профиль",
  },
  description: "booking.kz | booking.kz",
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
      <div className="rounded-3xl h-fit bg-gradient-to-r from-slate-900 to-slate-800 col-span-1 pt-4 pb-2 px-2 flex flex-col gap-1">
        <Link
          href="/cabinet/profile/billing"
          className="font-semibold flex flex-row items-center justify-center gap-x-1 h-fit bg-slate-900 rounded-full text-neutral-50  transition delay-150 duration-500 p-1.5 hover:text-slate-900 hover:bg-neutral-50"
        >
          Счета и Платежи
        </Link>
        <Link
          href="/cabinet/profile/notifications"
          className="font-semibold flex flex-row items-center justify-center gap-x-1 h-fit bg-slate-900 rounded-full text-neutral-50  transition delay-150 duration-500 p-1.5 hover:text-slate-900 hover:bg-neutral-50"
        >
          Оповещения
        </Link>
        <Link
          href="/cabinet/profile/settings"
          className="font-semibold flex flex-row items-center justify-center gap-x-1 h-fit bg-slate-900 rounded-full text-neutral-50  transition delay-150 duration-500 p-1.5 hover:text-slate-900 hover:bg-neutral-50"
        >
          Настройки
        </Link>
        <div
          className="w-full py-16 bg-no-repeat bg-center bg-contain my-2"
          style={{ backgroundImage: `url(/svg/settings.svg)` }}
        ></div>
      </div>
      <div className="rounded-3xl  col-span-4   flex flex-col gap-4 w-full">
        {children}
      </div>
    </div>
  );
}
