"use server";

import { sendMail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { IReqProviderProps, IReqUserProps } from "../../types";

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
    if (userExists?.emailVerified) {
      return {
        error: "Provider already exists. Please try another one. or Try Login",
      };
    }

    if (userExists && !userExists.emailVerified) {
      // Generate the email verification token
      const token = await generateVerificationToken(userExists?.email);
      await sendMail(userExists?.email, "Verify your email", token.token);
      return {
        error:
          "Provider is already registered but not verified. A new verification email has been sent.",
      };
    }
    const user = await prisma.user.create({
      data: {
        email: email,
        name: companyDetails.contactName,
        password: hashedPassword,
        image: companyDetails.avatar,
        role: "provider",
      },
    });
    if (!user) {
      return { error: "Error creating provider" };
    } else {
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
      // Generate the email verification token
      const token = await generateVerificationToken(email.toLowerCase());
      await sendMail(email.toLowerCase(), "Verify your email", token.token);
    }
    // revalidatePath("/provider");
    return {
      status: "success",
      message:
        "Provider created successfully! Please check your email for verify",
    };
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
      return {
        error: "User already exists. Please try another one. or Try Login",
      };
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
      message: "User created successfully! Please check your email for verify.",
    };
  } catch (error: any) {
    console.error("Error in signUpUserWithCredentials:", error);
    return { error: error.message };
  }
};

// Update user profile details
export const updateUserProfile = async (updateDetails: IReqUserProps) => {
  try {
    const id = updateDetails.id;
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image: updateDetails.avatar || "",
        name: updateDetails.firstName + " " + updateDetails.lastName,
      },
    });

    const existingUserProfile = await prisma.userProfile.findUnique({
      where: {
        userId: id,
      },
    });

    if (existingUserProfile) {
      await prisma.userProfile.update({
        where: {
          userId: id,
        },
        data: {
          firstName: updateDetails.firstName,
          lastName: updateDetails.lastName,
          phone: updateDetails.phone,
          countryId: updateDetails.country_id,
          regionId: updateDetails.region_id,
          city: updateDetails.city,
          state: updateDetails.street,
          dob: updateDetails?.dateOfBirth
            ? new Date(updateDetails.dateOfBirth).toISOString()
            : undefined,
          gender: updateDetails.gender,
          avatar: updateDetails.avatar,
        },
      });
    } else {
      await prisma.userProfile.create({
        data: {
          userId: id,
          firstName: updateDetails.firstName,
          lastName: updateDetails.lastName,
          phone: updateDetails.phone,
          countryId: updateDetails.country_id,
          regionId: updateDetails.region_id,
          city: updateDetails.city,
          state: updateDetails.street,
          dob: updateDetails?.dateOfBirth
            ? new Date(updateDetails.dateOfBirth).toISOString()
            : undefined,
          gender: updateDetails.gender,
          avatar: updateDetails.avatar,
        },
      });
    }
    return { status: "success", message: "Profile updated successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to update profile" };
  }
};

// get logged in user details
export const getUserDetails = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        image: true,
        name: true,
        role: true,
        userProfile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            countryId: true,
            regionId: true,
            city: true,
            state: true,
            dob: true,
            gender: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return { error: "User fetch error" };
  }
};
