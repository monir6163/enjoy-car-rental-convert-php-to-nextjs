"use client";
import { useSignupFrom } from "@/hooks/useSignupFrom";
import Toast from "@/lib/Toast";
import {
  Divider,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Container from "../shared/Container";
import { EmailConfirmation } from "../shared/EmailConfirmation";
import { GoogleButton } from "./GoogleLogin";

export default function SignupApp() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { push } = useRouter();
  const signupForm = useSignupFrom();
  const handleSignup = async () => {
    const { email, password } = signupForm.values;
    setIsSubmitting(true);
    try {
      toast.success("Signup successful. ");
      setIsSubmitted(true);
      push("/");
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Container>
      <Toast />
      {isSubmitted ? (
        <EmailConfirmation email={signupForm.values.email} />
      ) : (
        <>
          <LoadingOverlay
            visible={isSubmitting}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
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
            <form
              onSubmit={signupForm.onSubmit(() => handleSignup())}
              className="space-y-4"
            >
              <Stack>
                <TextInput
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={signupForm.values.email}
                  onChange={(e) =>
                    signupForm.setFieldValue("email", e.currentTarget.value)
                  }
                  error={signupForm.errors.email && signupForm.errors.email}
                />
                <PasswordInput
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={signupForm.values.password}
                  onChange={(e) =>
                    signupForm.setFieldValue("password", e.currentTarget.value)
                  }
                  error={
                    signupForm.errors.password && signupForm.errors.password
                  }
                />

                <PasswordInput
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Enter your password"
                  type="password"
                  value={signupForm.values.confirmPassword}
                  onChange={(e) =>
                    signupForm.setFieldValue(
                      "confirmPassword",
                      e.currentTarget.value
                    )
                  }
                  error={
                    signupForm.errors.confirmPassword &&
                    signupForm.errors.confirmPassword
                  }
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
              >
                Signup
              </button>
            </form>
            <Link
              href={"/providers"}
              className="text-sm text-blue-500 hover:underline hover:text-green-700"
            >
              Want to Rent your Car? Create Provider Account.
            </Link>
          </div>
        </>
      )}
    </Container>
  );
}
