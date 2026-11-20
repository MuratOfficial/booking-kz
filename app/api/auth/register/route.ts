import { NextResponse } from "next/server";
import { randomInt } from "crypto";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
import { escapeHtml } from "@/lib/auth-guard";

import { transporter } from "@/config/nodemailer";

const CODE_TTL_MS = 15 * 60 * 1000; // 15 minutes

const generateEmailContent = (
  data: { email: string; name: string | null },
  verificationCode: string
) => {
  const email = escapeHtml(data.email);
  const name = escapeHtml(data.name);

  // Background text and welcome text
  const backgroundText = "Вы авторизировались в системе etazhi.kz";
  const welcomeText = `Уважаемый ${name}, приветствуем вас в нашей платформе etazhi.kz`;

  // Company information (footer)
  const companyInfo = "© 2024 “etazhi.kz” | etazhi.kz | kzbooking@mail.ru";

  const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Email Template</title>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <style>
          /* Styles for email content */
          body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            background: linear-gradient(45deg, #485563, #29323c);
            color: #ffffff;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #ffffff;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          .background-text {
            background: #7f8c8d;
            color: #ffffff;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 20px;
          }
          .user-info {
            border: 2px solid #bdc3c7;
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 20px;
          }
          .user-info h3 {
            margin-bottom: 5px;
          }
          .user-info p {
            margin: 0;
          }
          .code-text {
            font-size: 30px;
            text-align: center;
            padding: 20px;
            background: #3498db;
            color: #ffffff;
            border-radius: 10px;
            margin-bottom: 20px;
          }
          .company-info {
            font-size: 12px;
            text-align: center;
            color: #bdc3c7;
            margin-top: 20px;
          }
        </style>
        </head>
        <body>
          <div class="container">
            <h2>Верификация почты</h2>
            <div class="background-text">${backgroundText}</div>
            <p>${welcomeText}</p>
            <div class="user-info">
              <h3>Почта:</h3>
              <p>${email}</p>
              <h3>Имя:</h3>
              <p>${name}</p>
              <h3>Код подтверждения:</h3>

            </div>
            <div class="code-text">${verificationCode}</div>
            <div class="company-info">${companyInfo}</div>
          </div>
        </body>
      </html>
    `;

  return { html };
};

const isNonEmptyString = (value: unknown, max = 200): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= max;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, phone, name, password } = body ?? {};
    const plainPassword = password?.password;

    if (!isNonEmptyString(name)) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (
      !isNonEmptyString(email, 254) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return new NextResponse("Valid email is required", { status: 400 });
    }
    if (!isNonEmptyString(username, 100)) {
      return new NextResponse("Username is required", { status: 400 });
    }
    if (phone !== undefined && phone !== null && typeof phone !== "string") {
      return new NextResponse("Invalid phone", { status: 400 });
    }
    if (
      typeof plainPassword !== "string" ||
      plainPassword.length < 6 ||
      plainPassword.length > 128
    ) {
      return new NextResponse("Password must be 6-128 characters", {
        status: 400,
      });
    }

    // A pending (never verified) registration for the same e-mail may be
    // replaced — otherwise a lost code would lock the address forever.
    const existing = await prismadb.user.findUnique({ where: { email } });
    if (existing) {
      if (existing.isVerified === false) {
        await prismadb.user.delete({ where: { id: existing.id } });
      } else {
        return new NextResponse("User already exists", { status: 409 });
      }
    }

    const verificationCode = randomInt(1000, 10000).toString();
    const hashedPassword = await hash(plainPassword, 12);

    const user = await prismadb.user.create({
      data: {
        username,
        isVerified: false,
        verificationCode: await hash(verificationCode, 10),
        verificationCodeExpires: new Date(Date.now() + CODE_TTL_MS),
        verificationAttempts: 0,
        email,
        phone,
        name,
        passwordHash: hashedPassword,
        notifications: {
          text: "Добро пожаловать в etazhi.kz",
          type: "Аккаунт",
          isOpened: false,
        },
      },
      select: { id: true, email: true, name: true },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        ...generateEmailContent(user, verificationCode),
        subject: "Валидация почты",
      });
    } catch (err) {
      console.log("[REGISTER_MAIL]", err);
      await prismadb.user.delete({ where: { id: user.id } });
      return new NextResponse("Failed to send verification e-mail", {
        status: 502,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("[REGISTER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
