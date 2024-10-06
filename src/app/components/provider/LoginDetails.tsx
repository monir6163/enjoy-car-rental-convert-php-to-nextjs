import { signUpWithCredentials } from "@/actions/auth";
import { primaryGradient } from "@/const";
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  LoadingOverlay,
  Notification,
  PasswordInput,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { IReqProviderProps } from "../../../../types";

interface Props {
  prev: () => void;
  companyDetails: Partial<IReqProviderProps>;
  setCompanyDetails: Dispatch<SetStateAction<Partial<IReqProviderProps>>>;
}

export default function LoginDetails({
  prev,
  companyDetails,
  setCompanyDetails,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();

  const updateDetails = (key: keyof IReqProviderProps, value: string) => {
    setCompanyDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateProvider = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsCreate(true);
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (
      companyDetails.email &&
      /^\S+@\S+\.\S+$/.test(companyDetails.email) &&
      password &&
      password === confirmPassword
    ) {
      setIsSubmitting(true);

      const res = await signUpWithCredentials(
        companyDetails.email,
        password,
        companyDetails
      );
      setIsSubmitting(false);
      if (res.error) {
        setPasswordError(res.error);
        setIsSubmitting(false);
      } else {
        toast.success(res.message);
        router.push("/login");
      }
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Flex gap="4rem">
        <LoadingOverlay
          visible={isSubmitting}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Box style={{ flexGrow: 1 }}>
          <Title mt="2rem">Login Details</Title>
          <Space mt="lg" />
          <form onSubmit={handleCreateProvider}>
            <Group grow>
              <Box>
                <Input.Label htmlFor="email">Email</Input.Label>
                <Input
                  id="email"
                  required
                  value={companyDetails.email}
                  onChange={(e) =>
                    updateDetails("email", e.currentTarget.value)
                  }
                  placeholder="Enter your email"
                />
                {isCreate && !companyDetails.email && (
                  <Input.Error>
                    Email is required to create a provider account
                  </Input.Error>
                )}
              </Box>
            </Group>
            <Space mt="lg" />
            <Group grow>
              <Box>
                <Input.Label htmlFor="password">Password</Input.Label>
                <PasswordInput
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Enter your password"
                  type="password"
                />
                {isCreate && !password && (
                  <Input.Error>
                    Password is required to create a provider account
                  </Input.Error>
                )}
              </Box>
              <Box>
                <Input.Label htmlFor="confirmPassword">
                  Confirm Password
                </Input.Label>
                <PasswordInput
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  placeholder="Confirm your password"
                  type="password"
                />
                {isCreate && !confirmPassword && (
                  <Input.Error>
                    Confirm Password is required to create a provider account
                  </Input.Error>
                )}
              </Box>
            </Group>
            {passwordError && (
              <Notification
                color="red"
                mt="sm"
                onClose={() => setPasswordError(undefined)}
              >
                {passwordError}
              </Notification>
            )}
            <Space mt="2rem" />
            <Flex justify="space-between">
              <Button
                variant="subtle"
                onClick={prev}
                radius="xl"
                size="md"
                my="sm"
              >
                <ArrowLeft size={15} />
                <Text ml="xs">Prev</Text>
              </Button>

              <Button
                type="submit"
                variant="gradient"
                gradient={primaryGradient}
                radius="xl"
                size="md"
                my="sm"
              >
                <Text ml="xs">Create Account</Text>
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </>
  );
}
