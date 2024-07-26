"use client";
import { useRouter, notFound } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
interface Props {
  searchParams: { token: string; userId: string };
}

const VerifyPage = (props: Props) => {
  const { token, userId } = props.searchParams;
  const router = useRouter();
  console.log(token);
  useEffect(() => {
    if (!token || !userId || token === "" || userId === "") {
      return notFound;
    }

    const verifyUser = async () => {
      try {
        const res = await fetch("/api/users/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, userId }),
        });

        const { error, message } = await res.json();

        if (res.ok) {
          toast.success(message);
          router.replace("/");
        } else if (error) {
          toast.error(error);
        }
      } catch (err) {
        toast.error("An error occurred while verifying.");
      } finally {
        router.replace("/");
      }
    };

    verifyUser();
  }, [token, userId, router]);

  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      Please wait...
      <p>We are verifying your email</p>
    </div>
  );
};

export default VerifyPage;
