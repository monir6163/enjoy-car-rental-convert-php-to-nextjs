"use client";

import { updateUserProfile } from "@/actions/auth";
import { useProfileForm } from "@/hooks/useProfileForm";
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  LoadingOverlay,
  SegmentedControl,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { IReqUserProps, IResUserProps } from "../../../../../types";
import SelectCountry from "../../home/filterFrom/SelectCountry";
import SelectRegion from "../../home/filterFrom/SelectRegion";
import ProfilePhoto from "../../shared/ProfilePhoto";

interface Props {
  userSession: any;
  userDetails: IResUserProps | null;
}

export default function ProfileComponent({ userSession, userDetails }: Props) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const form = useProfileForm(userDetails);
  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    const updateDetails: IReqUserProps = {
      id: userDetails?.id || "",
      email: userDetails?.email || "",
      ...form.values,
      country_id: form.values.countryId,
      region_id: form.values.regionId,
    };
    const res = await updateUserProfile(updateDetails);
    setIsUpdating(false);
    if (res?.status === "success") {
      await update({
        user: {
          ...session?.user,
          name: `${form.values.firstName} ${form.values.lastName}`,
          image: form.values.avatar,
        },
      });
      toast.success(res.message);
      router.refresh();
      setIsUpdating(false);
    } else {
      toast.error(res.message);
      setIsUpdating(false);
    }
  };
  const updateAvatar = async (avatarUrl: string) => {
    form.setFieldValue("avatar", avatarUrl);
  };
  return (
    <>
      <Flex gap="4rem">
        <Space mt="4rem" />
        <ProfilePhoto
          profileUrl={form.values.avatar}
          updateProfile={updateAvatar}
        />
        <Box style={{ flexGrow: 1 }}>
          <Title c="gray.6" mb="4rem" size="1rem">
            Profile Details ({userDetails?.email})
          </Title>
          <form onSubmit={form.onSubmit(() => handleUpdateProfile())}>
            <Box my="sm">
              <Input.Label>Email Address</Input.Label>
              <Input
                type="text"
                defaultValue={userDetails?.email}
                placeholder="eric.mensah@gmail.com"
                disabled
              />
            </Box>
            <Group grow>
              <TextInput
                label="First Name"
                placeholder="Your firstname"
                value={form.values.firstName}
                onChange={(event) =>
                  form.setFieldValue("firstName", event.currentTarget.value)
                }
                error={form.errors.firstName && form.errors.firstName}
              />

              <TextInput
                label="Last Name"
                placeholder="Your lastname"
                value={form.values.lastName}
                onChange={(event) =>
                  form.setFieldValue("lastName", event.currentTarget.value)
                }
                error={form.errors.lastName && form.errors.lastName}
              />
            </Group>
            <Group grow>
              <Box my="sm">
                <DateInput
                  dateParser={(input) => {
                    if (input === "WW2") {
                      return new Date(1939, 8, 1);
                    }
                    return new Date(input);
                  }}
                  valueFormat="DD/MM/YYYY"
                  label="Date of Birth"
                  placeholder="DD/MM/YYYY"
                  value={
                    form.values.dob ? new Date(form.values.dob) : undefined
                  }
                  onChange={(date: Date | null) =>
                    form.setFieldValue("dateOfBirth", date?.toString() || "")
                  }
                />
              </Box>
              <Box my="sm">
                <Input.Label>Phone Number</Input.Label>
                <Input
                  type="text"
                  placeholder="Your phone number"
                  value={form.values.phone}
                  onChange={(event) =>
                    form.setFieldValue("phone", event.currentTarget.value)
                  }
                  error={form.errors.phone && form.errors.phone}
                />
              </Box>
            </Group>
            <Box my="sm">
              <Input.Label mr={16}>Gender</Input.Label>
              <SegmentedControl
                data={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                value={form.values.gender}
                onChange={(value) => form.setFieldValue("gender", value)}
              />
            </Box>
            <Box my="lg">
              <Title order={4} className="text-muted">
                Address
              </Title>

              <Group grow>
                <Box>
                  <SelectCountry
                    value={form.values.countryId}
                    onChange={(value) =>
                      form.setFieldValue("country_id", value)
                    }
                  />
                  {form.errors.country_id && (
                    <Input.Error>{form.errors.country_id}</Input.Error>
                  )}
                </Box>

                <Box>
                  <SelectRegion
                    value={form.values.regionId}
                    onChange={(value) => form.setFieldValue("region_id", value)}
                    countryId={form.values.countryId}
                  />
                  {form.errors.region_id && (
                    <Input.Error>{form.errors.region_id}</Input.Error>
                  )}
                </Box>
              </Group>

              <Group grow>
                <TextInput
                  label="City"
                  placeholder="Achimota"
                  value={form.values.city}
                  onChange={(event) =>
                    form.setFieldValue("city", event.currentTarget.value)
                  }
                  error={form.errors.city && form.errors.city}
                />

                <TextInput
                  label="Street Address"
                  placeholder="Elegant Quarters, No.1 Street"
                  value={form.values.state}
                  onChange={(event) =>
                    form.setFieldValue("street", event.currentTarget.value)
                  }
                />
              </Group>
            </Box>
            <LoadingOverlay
              visible={isUpdating}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            <Button type="submit" radius="sm" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}
