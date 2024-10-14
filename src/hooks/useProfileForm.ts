import { useForm, UseFormReturnType } from "@mantine/form";
import { IProfileDetails, IResUserProps } from "../../types";

export const useProfileForm = (
  user: IResUserProps | null
): UseFormReturnType<IProfileDetails> => {
  const form = useForm({
    initialValues: {
      firstName: user?.userProfile?.firstName || "",
      lastName: user?.userProfile?.lastName || "",
      country_id: user?.userProfile?.countryId?.toString() || "",
      region_id: user?.userProfile?.regionId?.toString() || "",
      phone: user?.userProfile?.phone || "",
      city: user?.userProfile?.city || "",
      street: user?.userProfile?.state || "",
      dateOfBirth: user?.userProfile?.dob || "",
      gender: user?.userProfile?.gender || "male",
      avatar: user?.image || "",
    },
    validate: {
      firstName: (value: string) => (!value ? "First Name is required" : null),
      lastName: (value: string) => (!value ? "Last Name is required" : null),
      phone: (value: string) => (!value ? "Phone number is required" : null),
      country_id: (value: string) => (!value ? "Select your country" : null),
      region_id: (value: string) => (!value ? "Select your region" : null),
      city: (value: string) => (!value ? "Enter your city name" : null),
    },
  });
  return form;
};
