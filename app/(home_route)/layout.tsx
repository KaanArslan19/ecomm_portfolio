import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Navbar from "../components/navbar";
interface Props {
  children: ReactNode;
}
export default async function HomeLayout({ children }: Props) {
  return (
    <div className="max-w-screen-xl mx-auto xl:p-0 p-4">
      <Navbar />
      {children}
    </div>
  );
}
