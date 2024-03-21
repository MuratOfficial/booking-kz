"use client";
import * as React from "react";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const registerFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Логин должен быть не меньше 2 значении.",
    })
    .max(30, {
      message: "Логин должен быть не больше 30 значении.",
    }),
  email: z
    .string({
      required_error: "Пожалуйста, укажите email.",
    })
    .email("Укажите правильный email"),
  phone: z.string().refine((data) => /^\+?\d+$/.test(data), {
    message: "Укажите правильный номер телефона",
  }),
  name: z
    .string()
    .min(2, {
      message: "Имя должна быть не меньше 2 значении.",
    })
    .max(38, {
      message: "Имя должна быть не больше 38 значении.",
    }),
  password: z
    .object({
      password: z
        .string()
        .min(2, {
          message: "Пароль должен быть не меньше 5 значении.",
        })
        .max(12, {
          message: "Пароль должен быть не больше 12 значении.",
        }),
      confirmPassword: z.string(),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      {
        message: "Пароли должны совпадать",
        path: ["confirmPassword"],
      }
    ),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isVisible, setIsVisible] = React.useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      name: "",
      password: { password: "", confirmPassword: "" },
    },

    mode: "onChange",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isRegister, setIsRegister] = React.useState(false);

  async function onRegisterSubmit(formData: RegisterFormValues) {
    try {
      setIsLoading(true);

      await axios.post(`/api/auth/register`, formData);

      router.refresh();
      router.push(`/`);
      toast({
        title: "Вы успешно зарегистрировались",
      });
    } catch (error: any) {
      toast({
        description: "Что-то пошло не так... Попробуйте заново",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      await signIn("credentials", {
        email: formData.email,
        password: formData.password.password,
      });
    }
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    setIsLoading(true);

    try {
      // Call your API to handle authentication
      await signIn("credentials", {
        email: email,
        password: password,
      });

      router.push("/");
    } catch (error) {
      // Handle error, show error message, or update UI as needed

      toast({
        description: "Вами указанные почта или пароль не верны",
        variant: "destructive",
      });
      console.error("Authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isRegister ? (
        <div className=" mx-auto flex max-w-md flex-col justify-center py-6 rounded-xl bg-opacity-80 backdrop-blur-sm   px-6 bg-white">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Регистрация
            </h1>
            <p className="text-sm text-muted-foreground">
              Введите свои данные чтобы регистрироваться в системе
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onRegisterSubmit)}
                className=" text-slate-900 pb-4 flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Логин*</FormLabel>
                      <FormControl>
                        <Input placeholder="login" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя*</FormLabel>
                      <FormControl>
                        <Input placeholder="Максутов Максут" {...field} />
                      </FormControl>
                      <FormDescription>
                        Укажите полное имя (Ф.И.О.)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="login@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номер телефона*</FormLabel>
                      <FormControl>
                        <Input placeholder="+ 7 777 777 77 77" {...field} />
                      </FormControl>

                      <FormDescription>
                        Номер телефона в формате +7 ХХХ ХХХ ХХ ХХ
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password.password"
                  render={({ field }) => (
                    <FormItem className="text-slate-800">
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="rounded-xl placeholder:text-slate-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password.confirmPassword"
                  render={({ field }) => (
                    <FormItem className="text-slate-800">
                      <FormLabel>Подтвердить пароль</FormLabel>

                      <FormControl>
                        <Input
                          className="rounded-xl placeholder:text-slate-300"
                          type="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="rounded-xl bg-slate-900 col-span-2 mt-4"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Зарегистироваться
                </Button>
              </form>
            </Form>
            <div className="flex flex-row items-center justify-center">
              <p className="text-sm">Уже есть учетная запись? </p>
              <Button
                disabled={isLoading}
                variant="link"
                onClick={() => setIsRegister(false)}
              >
                Авторизоваться
              </Button>
            </div>
            <p className="px-8 mt-4 text-center text-sm text-muted-foreground">
              Нажимая вы соглашаетесь{" "}
              <Link
                href="/cms/policy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Политикой конфиденциальности
              </Link>{" "}
              системы.
            </p>
          </div>
        </div>
      ) : (
        <div className=" mx-auto flex max-w-sm flex-col justify-center space-y-6 py-6 rounded-xl bg-opacity-80 backdrop-blur-sm   px-6 bg-white">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Войти в систему
            </h1>
            <p className="text-sm text-muted-foreground">
              Введите свою почту чтобы войти в систему
            </p>
          </div>
          <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="etazhi@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="password">
                    Пароль
                  </Label>
                  <div className="w-full flex flex-row items-center relative">
                    <Input
                      id="password"
                      placeholder="Введите пароль"
                      type={isVisible ? "text" : "password"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl w-full"
                    />
                    <button
                      className="focus:outline-none absolute right-3 text-slate-600"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {!isVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-2xl text-default-400 pointer-events-none"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-2xl text-default-400 pointer-events-none"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="bg-slate-900  rounded-xl"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Авторизоваться через Email
                </Button>
                <div className="flex flex-row items-center justify-center">
                  <p className="text-sm">Нету учетной записи? </p>
                  <Button
                    disabled={isLoading}
                    variant="link"
                    onClick={() => setIsRegister(true)}
                  >
                    Зарегистироваться
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <p className="px-8  text-center text-sm text-muted-foreground">
            Нажимая вы соглашаетесь{" "}
            <Link
              href="/cms/policy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Политикой конфиденциальности
            </Link>{" "}
            системы.
          </p>
        </div>
      )}
    </>
  );
}
