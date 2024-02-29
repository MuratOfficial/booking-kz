import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function PaymentHistory() {
  return (
    <div className="bg-white rounded-2xl w-full p-4 flex flex-col gap-2">
      <h3 className="font-bold text-2xl text-slate-800">История платежей</h3>
      <Tabs defaultValue="all" className="w-[400px] text-slate-800">
        <TabsList className="rounded-xl p-2">
          <TabsTrigger value="all" className="rounded-lg font-semibold">
            Все
          </TabsTrigger>
          <TabsTrigger value="repl" className="rounded-lg font-semibold">
            Пополнения
          </TabsTrigger>
          <TabsTrigger value="exp" className="rounded-lg font-semibold">
            Расходы
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="repl">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default PaymentHistory;
