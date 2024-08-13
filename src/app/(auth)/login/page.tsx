"use client";
import FormInput from "@/app/components/form/FormInput";
import FormWrapper from "@/app/components/form/FormWrapper";
import Container from "@/app/components/shared/Container";
import { loginZodSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const handleLogin = async (payload: FieldValues) => {
    try {
      const res = await fetch(
        "https://medicine-e-commerce-backend.vercel.app/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-32  lg:px-10  min-h-[calc(100vh-90px)]">
      <Container>
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
            >
              Login
            </button>
          </FormWrapper>
          <Link href={"/register"} className="">
            <p className="text-center my-4  w-full py-3 text-gray-500 text-lg">
              Don&apos;t have an account?{" "}
              <span className="inline-block text-blue-500 hover:text-blue-600 hover:underline">
                Create account
              </span>
            </p>
          </Link>
        </div>
      </Container>
    </div>
  );
}
