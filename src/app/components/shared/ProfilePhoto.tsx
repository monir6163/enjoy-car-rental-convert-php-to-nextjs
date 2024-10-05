import { Avatar, Flex } from "@mantine/core";
import { User } from "lucide-react";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { toast, ToastContainer } from "react-toastify";
import Uploader from "./Uploader";
interface Props {
  updateProfile: (url: string) => Promise<void>;
  profileUrl?: string;
}

export default function ProfilePhoto({ updateProfile, profileUrl }: Props) {
  const handleUpload = async (
    result: CloudinaryUploadWidgetResults,
    widget: any
  ) => {
    const info: any = result.info;
    await updateProfile(info.secure_url);
    widget.close();
    toast.success("Profile photo updated successfully");
  };
  return (
    <Flex direction="column" gap="sm" justify="flex-start" align="center">
      <ToastContainer position="bottom-right" theme="colored" />
      <Avatar
        src={profileUrl}
        size="140px"
        style={{ borderRadius: "100px", overflow: "hidden" }}
        radius="xl"
      >
        <User size={100} />
      </Avatar>
      <Uploader
        onUpload={handleUpload}
        options={{
          cropping: true,
          showSkipCropButton: false,
          croppingAspectRatio: 1,
          maxFileSize: 2000000, //2MB
        }}
      />
    </Flex>
  );
}
