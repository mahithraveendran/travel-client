"use client";

import { selectUser } from "@/lib/redux/Feature/auth/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DreamLogo from "./DreamLogo";

const UserProfile = dynamic(() => import("./UserProfile"), { ssr: false });

const menuItems = [
  {
    label: "Home",
    key: "home",
    link: "/",
  },
  {
    label: "Travels",
    key: "travels",
    link: "/travels",
  },
  {
    label: "About Us",
    key: "about",
    link: "/about-us",
  },
  {
    label: "Plan travel",
    key: "travel",
    link: "/plan-travel",
  },
];

const AppNavbar = ({ isVertical }: { isVertical?: boolean }) => {
  const pathname = usePathname();

  const user = useAppSelector(selectUser);

  const isActive = (link: string) => {
    return pathname === link;
  };

  return (
    <Flex
      gap="middle"
      justify="space-between"
      align="center"
      vertical={isVertical}
      className="h-[80px]"
    >
      <DreamLogo />
      <ul className="flex items-center justify-center gap-4">
        {menuItems.map((item) => (
          <Link href={item.link} key={item.key}>
            <li
              className={`${
                isActive(item.link)
                  ? "text-drdPrimary font-bold"
                  : "text-drd-green"
              } cursor-pointer hover:text-drdPrimary`}
            >
              {item.label}
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-4">
        {user ? (
          <div>
            <UserProfile />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/login">
              <Button type="primary" icon={<UserOutlined />}>
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button icon={<EditOutlined />}>Register</Button>
            </Link>
          </div>
        )}
      </div>
    </Flex>
  );
};

export default AppNavbar;
