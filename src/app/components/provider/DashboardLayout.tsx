"use client";
import {
  AppShell,
  Avatar,
  Burger,
  Flex,
  rem,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCar,
  IconDashboard,
  IconMessage,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { MainLink } from "./MainLink";

interface DashboardProps {
  children: ReactNode;
  providerDetails: {
    name: string;
    image: string;
  };
  user: {
    id: string;
  };
}

const data = [
  {
    icon: <IconDashboard size="1rem" />,
    color: "blue",
    label: "Dashboard",
    endpoint: "/dashboard",
  },
  {
    icon: <IconCar size="1rem" />,
    color: "violet",
    label: "My cars",
    endpoint: "/dashboard/cars",
  },
  {
    icon: <IconPlus size="1rem" />,
    color: "cyan",
    label: "Add Car",
    endpoint: "/add-car",
  },
  {
    icon: <IconMessage size="1rem" />,
    color: "orange",
    label: "My Reviews",
    endpoint: "/reviews",
  },
];
export default function DashboardLayout({
  children,
  providerDetails,
  user,
}: DashboardProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "md",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Flex justify="space-between" align="center" px="md" h="100%">
            <Flex align="center">
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
                hiddenFrom="md"
              />
              <Flex gap={8} align="center">
                <Avatar src={providerDetails?.image} size="sm" radius="xl" />
                <Text fw="600" style={{ overflow: "hidden" }}>
                  {providerDetails?.name}
                </Text>
              </Flex>
            </Flex>

            {/* <ThemeSwitcher /> */}
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar px="sm">
          <AppShell.Section style={{ flex: 1 }}>
            <Stack mt="xs">
              {data?.map((item, i) => (
                <MainLink
                  key={i}
                  label={item.label}
                  color={item.color}
                  icon={item.icon}
                  link={`/provider${item.endpoint}`}
                />
              ))}
            </Stack>
          </AppShell.Section>

          <AppShell.Section>
            <MainLink
              label="Account Settings"
              color="gray"
              icon={<IconUser size="1rem" />}
              link={`/provider/my-account`}
            />
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
