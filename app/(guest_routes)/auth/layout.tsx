import React, { ReactNode } from "react";
import Notification from "../../components/Notification";
interface Props {
  children: ReactNode;
}
export default function AuthLayout({ children }: Props) {
  return (
    <>
      <div className="max-h-screen flex justify-center">{children}</div>
      <Notification />
    </>
  );
}
