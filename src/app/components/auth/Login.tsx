"use client";
import FormInput from "@/app/components/form/FormInput";
import FormWrapper from "@/app/components/form/FormWrapper";
import Toast from "@/lib/Toast";
import { loginZodSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import Container from "../shared/Container";

export default function LoginApp() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const handleLogin = async (payload: FieldValues) => {
    setIsSubmitting(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: payload.email,
      password: payload.password,
    });
    if (response?.status == 200) {
      // toast.success("Login successful");
      // router.replace("/");
      window.location.href = "/";
    } else {
      toast.error("Invalid email or password", { theme: "colored" });
      setIsSubmitting(false);
    }
  };

  //get error from query params
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("error")) {
      toast.error(searchParams.get("error") as string, { theme: "colored" });
    }
  }, [searchParams]);
  return (
    <Container>
      <Toast />

      <div className="w-full sm:w-2/3 lg:2/4 2xl:w-3/5  mx-auto border py-10 px-5 sm:px-12 md:px-20 lg:px-32">
        <h2 className="text-3xl lg:text-4xl text-gray-800 text-center">
          Login
        </h2>
        <p className="text-gray-500 mt-3 font-inter text-sm text-center mb-5">
          Login to your account
        </p>
        <FormWrapper
          onSubmit={handleLogin}
          resolver={zodResolver(loginZodSchema)}
          defaultValues={{ email: "", password: "" }}
        >
          <FormInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <div className="text-right   text-lg text-blue-500 my-4 ">
            <Link
              href={"/forgot-password"}
              className="text-right hover:underline hover:text-green-700 "
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </FormWrapper>
      </div>
    </Container>
  );
}
