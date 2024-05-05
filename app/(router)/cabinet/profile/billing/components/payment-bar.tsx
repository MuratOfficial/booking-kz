"use client";
import { Refill } from "@prisma/client";
import { Coins, CreditCard, Loader } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

const RefillSchema = z.object({
  sum: z.string().optional(),
  bonus: z.string().optional(),
  userId: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

type RefillValue = z.infer<typeof RefillSchema>;

interface PaymentBarProps {
  refills?: Refill[] | null;
  userId?: string | null;
  phone?: string | null;
  email?: string | null;
}

function PaymentBar({ refills, userId, phone, email }: PaymentBarProps) {
  const [picked, setPicked] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<RefillValue>({
    resolver: zodResolver(RefillSchema),
    defaultValues: {
      userId: userId || "",
      phone: phone || "",
      email: email || "",
    },
  });

  async function onSubmit(formData: RefillValue) {
    try {
      setLoading(true);

      const paymentUrl = await axios.post(
        `/api/cabinet/payment/refill`,
        formData
      );

      setTimeout(() => {
        router.refresh();
        toast({
          title: "Идет переадресация...",
        });
      }, 500);

      router.push(paymentUrl?.data);
    } catch (error: any) {
      toast({ description: "Что-то пошло не так...", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full py-4 px-4 rounded-3xl bg-gradient-to-l from-green-500 to-green-400 flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex flex-row gap-x-1 bg-green-700 items-center transition delay-75 duration-300 justify-center text-neutral-50 hover:bg-neutral-50 rounded-xl font-semibold p-2 hover:text-blue-500">
            <CreditCard className=" stroke-2" size={20} /> Пополнить
          </button>
        </DialogTrigger>
        <DialogContent className=" max-w-fit min-w-36 rounded-lg">
          <DialogHeader>
            <DialogTitle>Выберите сумму пополнения</DialogTitle>
          </DialogHeader>
          <div className="w-full gap-4 grid grid-cols-2">
            {refills?.map((el, ind) => (
              <div
                className={cn(
                  "flex flex-col p-4 w-full justify-center items-center border-2 cursor-pointer hover:border-slate-800 border-slate-100 rounded-xl",
                  picked === el.id && "border-slate-800"
                )}
                key={ind}
                onClick={() => {
                  setPicked(el.id);
                  form.setValue("sum", el.total.toString());
                  form.setValue("bonus", el?.bonus?.toString());
                }}
              >
                <div className="flex flex-row gap-x-1  items-center">
                  <p className="font-bold text-slate-700 text-lg">
                    {el.total} ₸
                  </p>
                  <p className="font-bold text-neutral-50 py-0.5 px-1.5 rounded-lg bg-yellow-400">
                    +{el?.bonusPerc}%
                  </p>
                </div>
                <p className=" items-center text-sm text-green-500 font-semibold">
                  + {el?.bonus} б.
                </p>
              </div>
            ))}
          </div>
          <DialogFooter className="w-full flex flex-row gap-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Закрыть
              </Button>
            </DialogClose>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button type="submit">
                {loading && <Loader className="w-4 animate-spin mr-2" />}{" "}
                Подтвердить
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="w-full border-2 mt-4 flex flex-col items-center p-2 rounded-3xl">
        <p className="text-slate-50 text-sm  flex flex-row gap-x-1 w-full font-semibold items-center justify-center">
          <Coins size={16} className="stroke-2" />
          Бонусы
        </p>
        <p className="text-slate-50 text-sm  flex flex-row gap-x-1 w-full font-semibold  items-center justify-center">
          при пополнении
        </p>
        {refills?.map((el, key) => (
          <div
            className="flex flex-col mt-2 w-full justify-center items-center"
            key={key}
          >
            <div className="flex flex-row gap-x-1  items-center">
              <p className="font-bold text-slate-700 text-lg">{el.total} ₸</p>
              <p className="font-bold text-neutral-50 py-0.5 px-1.5 rounded-lg bg-yellow-400">
                +{el?.bonusPerc}%
              </p>
            </div>
            <p className=" items-center text-sm text-green-50 font-semibold">
              + {el?.bonus} б.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentBar;
