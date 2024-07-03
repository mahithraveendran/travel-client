"use client";

import { cn } from "@/components/shared/cn";
import { useGetProfileQuery } from "@/lib/redux/Feature/auth/authApi";
import { logout, selectUser } from "@/lib/redux/Feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { IUser } from "@/types";
import { removeTokenFromCookie } from "@/utils/helper";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import Link from "next/link";

const url =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

const UserProfile = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const user: IUser | null | undefined = useAppSelector(selectUser);

  // get user profile
  const { data: userProf, isLoading: isUserProfLoading } = useGetProfileQuery(
    null,
    { skip: !user?.id }
  );

  console.log(userProf);

  const handleLogout = () => {
    dispatch(logout());
    removeTokenFromCookie("authToken");
  };

  const profileContent = (
    <div className="flex items-center justify-center gap-4 flex-col">
      <Link href="/dashboard/profile">
        <Button type="primary" icon={<UserOutlined />}>
          Profile
        </Button>
      </Link>
      <Button onClick={handleLogout} type="primary" icon={<LogoutOutlined />}>
        Logout
      </Button>
    </div>
  );

  // if (isUserProfLoading) return <>UserProfile Loading...</>;

  return (
    <div className="flex items-center gap-4 text-end">
      <div>
        {user && (
          <div>
            <h4 className={cn("font-bold", className)}>{user?.name}</h4>
            <p className={cn("text-xs", className)}>@{user?.role}</p>
          </div>
        )}
      </div>
      {!isUserProfLoading && (
        <Popover content={profileContent} trigger="click">
          <Avatar
            src={userProf?.data?.userProfile?.image}
            style={{
              cursor: "pointer",
              border: "1px solid #fff",
              padding: "4px",
              backgroundColor: "#fff",
            }}
            size={40}
          />
        </Popover>
      )}
    </div>
  );
};

export default UserProfile;
