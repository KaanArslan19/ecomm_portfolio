import React, { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
interface Props {
  children: ReactNode;
}
export default async function GuessLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }
  return <div>{children}</div>;
}
