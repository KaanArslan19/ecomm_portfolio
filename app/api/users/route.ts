import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { NewUserRequest } from "@/app/types";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;
  await startDb();
  const newUser = await UserModel.create({
    ...body,
  });
  console.log(await newUser.comparePassword("12345678"));
  console.log(await newUser.comparePassword("12345"));
  return NextResponse.json(newUser);
};
