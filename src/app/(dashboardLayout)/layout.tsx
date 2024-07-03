"use client";

import UserProfile from "@/components/Home/Navbar/UserProfile";
import { logout, selectUser } from "@/lib/redux/Feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { generateMenuItems } from "@/utils/generateSidebarMenu";
import { removeTokenFromCookie } from "@/utils/helper";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

import dreamLogo from "@/asset/images/home/Dream travel-bg- green.png";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  // ant theme
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // next
  const router = useRouter();
  const pathname = usePathname();

  // redux
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  // console.log({ user, pathname });

  const role = user?.role?.toLowerCase();

  /// Handle Logout
  const handleLogout = () => {
    removeTokenFromCookie("authToken");
    dispatch(logout());
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          height: "100vh",
          position: "fixed",
          zIndex: 9999,
        }}
      >
        <div className="flex justify-between items-center flex-col h-screen bg-drd-green">
          <div className="w-full ">
            <div className="demo-logo-vertical">
              <div className="text-drd-light-yellow text-center py-8 flex items-center justify-center ">
                <Link href="/">
                  <Image
                    src={dreamLogo.src}
                    width={50}
                    height={50}
                    alt="Dream Destination"
                  />
                </Link>
              </div>
            </div>
            <Menu
              // theme="dark"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
              mode="inline"
              defaultSelectedKeys={[pathname.split("/")[1]]}
              items={generateMenuItems(role)}
              onSelect={({ item, key }) => {
                if (
                  key === "/profile" ||
                  key === "/change-password" ||
                  key === "/"
                ) {
                  router.push(`/dashboard/${key}`);
                } else {
                  router.push(`/dashboard/${role}/${key}`);
                }
              }}
              onClick={({ key }) => {
                if (
                  key === "/profile" ||
                  key === "/change-password" ||
                  key === "/"
                ) {
                  router.push(`/dashboard/${key}`);
                } else {
                  router.push(`/dashboard/${role}/${key}`);
                }
              }}
            />
          </div>
          <div className="w-full mb-5 px-4">
            <Button
              onClick={handleLogout}
              size="large"
              block
              icon={<LogoutOutlined />}
              iconPosition="end"
            >
              Logout
            </Button>
          </div>
        </div>
      </Sider>
      <Layout className="lg:ml-[200px]">
        <div className=" bg-drd-green h-[80px] flex items-center justify-between px-8">
          <h1 className="text-white text-2xl font-bold">Travel trek</h1>
          <div>
            <Link href="/">
              <Image
                src={dreamLogo.src}
                width={50}
                height={50}
                alt="Dream Destination"
              />
            </Link>
          </div>
          <UserProfile className="text-white" />
        </div>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 155px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Dream Destinations ©{new Date().getFullYear()} Created by Dream Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
