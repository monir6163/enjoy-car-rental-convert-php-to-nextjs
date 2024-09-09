"use client";
import Toast from "@/lib/Toast";
import { Divider, PasswordInput, Stack, TextInput } from "@mantine/core";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "../shared/Container";
import { GoogleButton } from "./GoogleLogin";

export default function SignupApp() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: payload.email,
      password: payload.password,
    });
    if (response?.status == 200) {
      toast.success("Login successful");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 500);
      // window.location.href = "/";
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

      <div className="w-full sm:w-2/3 md:w-2/5  mx-auto border py-5 px-5 sm:px-12 md:px-5">
        <p className="text-gray-500 font-inter text-sm text-center">
          Login to your account
        </p>
        <GoogleButton />
        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="sm"
        />
        <form onSubmit={handleLogin} className="space-y-4">
          <Stack>
            <TextInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter your password"
              type="password"
            />
          </Stack>

          <div className="flex justify-between text-sm text-blue-500 my-4 ">
            <Link
              href={"/login"}
              className="text-right hover:underline hover:text-green-700 "
            >
              Already have an account? Login
            </Link>
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
        </form>
        <Link
          href={"/providers"}
          className="text-sm text-blue-500 hover:underline hover:text-green-700"
        >
          Want to Rent your Car? Create Provider Account.
        </Link>
      </div>
    </Container>
  );
}
