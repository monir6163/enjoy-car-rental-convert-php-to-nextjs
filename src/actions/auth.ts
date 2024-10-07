"use server";

import { sendMail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { IReqProviderProps } from "../../types";

//create a new provider with the given credentials
export const signUpWithCredentials = async (
  email: string,
  password: string,
  companyDetails: Partial<IReqProviderProps>
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    //check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExists) {
      return { error: "User already exists" };
    }

    const res = await prisma.$transaction(async (prisma: any) => {
      // Create the user first
      const user = await prisma.user.create({
        data: {
          email: email,
          name: companyDetails.contactName,
          password: hashedPassword,
          image: companyDetails.avatar,
          role: "provider",
        },
      });

      // Use the userId from the created user for the provider
      const provider = await prisma.provider.create({
        data: {
          userId: user.id,
          email: companyDetails.email,
          companyName: companyDetails.companyName,
          businessReg: companyDetails.businessRegistrationNumber,
          contactName: companyDetails.contactName,
          contactPhone: companyDetails.phone,
          countryId: companyDetails.country_id,
          regionId: companyDetails.region_id,
          city: companyDetails.city,
          street: companyDetails.street,
          avatar: companyDetails.avatar,
          latitude: companyDetails.latitude,
          longitude: companyDetails.longitude,
        },
      });

      return { user, provider };
    });
    revalidatePath("/providers");
    return { status: "success", message: "Provider created successfully" };
  } catch (error: any) {
    return { error: error.message };
  }
};

//create a new user with the given credentials
export const signUpUserWithCredentials = async (
  email: string,
  password: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (userExists?.emailVerified) {
      return { error: "User already exists. Please try another one." };
    }

    if (userExists && !userExists.emailVerified) {
      // Generate the email verification token
      const token = await generateVerificationToken(userExists?.email);
      await sendMail(userExists?.email, "Verify your email", token.token);
      return {
        error:
          "User is already registered but not verified. A new verification email has been sent.",
      };
    }

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "user",
      },
    });

    // Generate the email verification token
    const token = await generateVerificationToken(email.toLowerCase());
    await sendMail(email.toLowerCase(), "Verify your email", token.token);

    return {
      status: "success",
      message: "User created successfully! Please check your email.",
    };
  } catch (error: any) {
    console.error("Error in signUpUserWithCredentials:", error);
    return { error: error.message };
  }
};
