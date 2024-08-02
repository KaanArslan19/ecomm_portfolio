"use client";

import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required!"),
});

export default function SignUp() {
  const formErrors: string[] = [];
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values, action) => {
      action.setSubmitting(true);
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { message, error } = (await res.json()) as {
        message: string;
        error: string;
      };
      if (res.ok) {
        toast.success(message);
        await signIn("credentials", { email, password });
      }
      if (!res.ok || error) {
        toast.error(error);
      }
      action.setSubmitting(false);
    },
  });
  const { email, name, password } = values;
  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input name="name" label="Name" onChange={handleChange} value={name} />
      <Input name="email" label="Email" onChange={handleChange} value={email} />
      <Input
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
        value={password}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Sign up
      </Button>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}
