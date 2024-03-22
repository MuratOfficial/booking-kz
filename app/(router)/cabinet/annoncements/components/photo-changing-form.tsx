"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Loader2 } from "lucide-react";
import ImageUpload from "@/components/uploaders/image-upload";

const FormSchema = z.object({
  images: z.object({ url: z.string() }).array(),
  id: z.string(),
});

interface PhotoChangingFormProps {
  images:
    | {
        url: string;
      }[]
    | null;
  id: string;
}

export function PhotoChangingForm({ images, id }: PhotoChangingFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      images: images || [],
      id: id,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      await axios.patch(`/api/cabinet/profile/settings/password`, data);
      setTimeout(() => {
        router.refresh();
        toast({
          title: "Пароль изменен успешно",
        });
      }, 1000);
    } catch (error: any) {
      toast({ description: "Что-то пошло не так...", variant: "destructive" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-between h-full gap-4"
      >
        <div className="flex flex-col gap-2 items-center">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormControl className="z-40">
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="rounded-xl " type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Изменить фотографии
        </Button>
      </form>
    </Form>
  );
}
