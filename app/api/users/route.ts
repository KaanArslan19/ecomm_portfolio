import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { NewUserRequest } from "@/app/types";
import { NextResponse } from "next/server";
import crypto from "crypto";
import EmailVerificationToken from "@/app/models/emailVerificationToken";
import { sendEmail } from "@/app/lib/email";

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as NewUserRequest;
    console.log(body);
    await startDb();
    const newUser = await UserModel.create({
      ...body,
    });
    const token = crypto.randomBytes(36).toString("hex");
    await EmailVerificationToken.create({
      user: newUser._id,
      token,
    });
    const verificationUrl = `https://www.nextecommportfoliokaanarslan.xyz/verify?token=${token}&userId=${newUser._id}`;
    await sendEmail({
      profile: { name: newUser.name, email: newUser.email },
      subject: "verification",
      linkUrl: verificationUrl,
    });
    return NextResponse.json({ message: "Please check your email!" });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" });
  }
};
