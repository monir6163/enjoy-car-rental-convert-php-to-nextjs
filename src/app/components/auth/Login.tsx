"use client";
import { loginWithCredentials } from "@/hooks/login";
import { useLoginForm } from "@/hooks/useLoginForm";
import {
  Divider,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Container from "../shared/Container";
import { FormError } from "./Form-error";
import { GithubLogin } from "./GithubLogin";
import { GoogleButton } from "./GoogleLogin";
export default function LoginApp() {
  const params = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as { role: string };
  const errorUrl = params.get("private");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const loginForm = useLoginForm();
  const handleLogin = async () => {
    const { email, password } = loginForm.values;
    setIsSubmitting(true);
    setError(null);
    const res = await loginWithCredentials(email, password);
    setIsSubmitting(false);
    if (res?.error) {
      setError(res?.error);
      toast.error(res?.error);
      return;
    } else {
      toast.success("Login successful");
      router.refresh();
    }
  };

  useEffect(() => {
    if (session && session.user) {
      router.refresh();
      if (user?.role === "provider") {
        router.push("/provider/dashboard");
        router.refresh();
      } else if (user?.role === "admin") {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        router.push("/");
        router.refresh();
      }
    }
  }, [session, user, router]);
  //protecting error message
  useEffect(() => {
    if (window !== undefined) {
      toast.error(errorUrl);
    }
  }, [errorUrl]);

  return (
    <Container>
      <LoadingOverlay
        visible={isSubmitting}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <ToastContainer position="bottom-right" theme="colored" />
      <div className="w-full sm:w-2/3 md:w-2/5  mx-auto border py-5 px-5 sm:px-12 md:px-5">
        <p className="text-gray-500 font-inter text-sm text-center">
          Login to your account
        </p>
        <div className="flex gap-3">
          <GoogleButton />
          <GithubLogin />
        </div>
        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="sm"
        />
        <form
          onSubmit={loginForm.onSubmit(() => handleLogin())}
          className="space-y-4"
        >
          <Stack>
            <TextInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={loginForm.values.email}
              onChange={(e) =>
                loginForm.setFieldValue("email", e.currentTarget.value)
              }
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={loginForm.values.password}
              onChange={(e) =>
                loginForm.setFieldValue("password", e.currentTarget.value)
              }
            />
          </Stack>

          <div className="flex justify-between text-sm text-blue-500 my-4 ">
            <Link
              href={"/signup"}
              className="text-right hover:underline hover:text-green-700 "
            >
              Create an account ? Signup
            </Link>
            <Link
              href={"/forgot-password"}
              className="text-right hover:underline hover:text-green-700 "
            >
              Forgot password?
            </Link>
          </div>

          <FormError message={error} />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        <Link
          href={"/provider"}
          className="text-sm text-blue-500 hover:underline hover:text-green-700"
        >
          Want to Rent your Car? Create Provider Account.
        </Link>
      </div>
    </Container>
  );
}
