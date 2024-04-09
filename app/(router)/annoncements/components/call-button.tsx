"use client";
import { Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CallButtonProps {
  phone: string | null | undefined;
}

function CallButton({ phone }: CallButtonProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {open ? (
        <Link
          href={`tel:${phone}`}
          className="flex flex-row items-center gap-x-2 justify-center font-semibold hover:text-blue-500"
        >
          <Phone size={16} />
          {phone}
        </Link>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex flex-row p-3 hover:opacity-80 items-center gap-x-1.5 justify-center rounded-xl bg-blue-500 font-medium text-neutral-50"
        >
          <Phone size={16} />
          <span>Позвонить</span>
        </button>
      )}
    </>
  );
}

export default CallButton;
