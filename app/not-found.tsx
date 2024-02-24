import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-4 w-full py-8">
      <Image
        width={480}
        height={600}
        src="/svg/404.svg"
        alt="not-found"
        className="max-w-[480px]"
      />
      <p className=" text-blue-900 text-lg uppercase font-bold text-center mx-auto">
        Упс... Кажется что-то пошло не так!..
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-500 text-sm font-semibold text-neutral-100 px-6 py-3 rounded-xl hover:bg-slate-900 transition duration-300"
      >
        На главную
      </Link>
    </div>
  );
}
