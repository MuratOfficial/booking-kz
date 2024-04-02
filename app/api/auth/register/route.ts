import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/auth";

import { transporter } from "@/config/nodemailer";
import { User } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const generateRandomCode = () => {
      return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a random number between 1000 and 9999
    };

    const verificationCode = generateRandomCode();

    const generateEmailContent = (data: User) => {
      const { email, name } = data;

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
    // const session = await getServerSession(authOptions);

    // const userIdData = JSON.parse(JSON.stringify(session));

    // const admin = await prismadb.user.findUnique({
    //   where: {
    //     id: userIdData?.user?.id,
    //   },
    // });

    // if (admin?.isAdmin === false) {
    //   return new NextResponse("Access denied", { status: 401 });
    // }

    const body = await req.json();

    const { username, email, phone, name, password } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const hashedPassword = await hash(password.password, 12);

    const users = await prismadb.user.create({
      data: {
        username,
        isVerified: false,
        verificationCode: verificationCode,
        email,
        phone,
        name,
        password: password.password,
        passwordHash: hashedPassword,
        notifications: {
          text: "Добро пожаловать в etazhi.kz",
          type: "Аккаунт",
          isOpened: false,
        },
      },
    });

    // try {
    //   await sendWhatsAppNotification(
    //     userPhoneNumber,
    //     "Автошкола TORE приветствует вас!"
    //   );
    //   NextResponse.json({ message: "Registration successful!" });
    // } catch (error) {
    //   console.error("Failed to send welcome notification:", error);
    //   NextResponse.json({ error: "Failed to send welcome notification" });
    // }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: users.email,
        ...generateEmailContent(users),
        subject: "Валидация почты",
      });

      return NextResponse.json(users);
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log("[REGISTER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
