"use client";

import DrdDashboardTitle from "@/components/Dashboard/shared/DrdDashboardTitle";
import DrdLoader from "@/components/shared/DrdLoader";
import { useGetProfileQuery } from "@/lib/redux/Feature/auth/authApi";
import { selectUser } from "@/lib/redux/Feature/auth/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { Avatar, Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import Link from "next/link";

const Profile = () => {
  const userInfo = useAppSelector(selectUser);

  // user profile data
  const {
    data: userProfileData,
    error,
    isLoading,
  } = useGetProfileQuery(null, { skip: !userInfo?.id });

  if (isLoading) return <DrdLoader className="h-[calc(100vh-200px)]" />;

  const user = userProfileData?.data;

  return (
    <div>
      <DrdDashboardTitle name="My Profile" />
      <div>
        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <Avatar size={64} src={user?.userProfile?.image || ""} />
              </div>
              <div>
                <Title level={4}>{user?.name}</Title>
                <Text type="secondary">{user?.userName}</Text>
              </div>
            </div>
            <div>
              <Link href="/dashboard/profile/edit">
                <Button type="primary">Edit Profile</Button>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <Title level={5}>Bio</Title>
            <Paragraph>
              {user?.userProfile?.bio || "No bio available"}
            </Paragraph>
          </div>
        </div>
        <div className="border p-8 mt-8 flex items-center justify-between gap-8 flex-wrap bg-drd-light-green rounded-md">
          <div>
            <Title level={5}>Email</Title>
            <Text type="secondary">{user?.email}</Text>
          </div>
          <div>
            <Title level={5}>Role</Title>
            <Text type="secondary">{user?.role}</Text>
          </div>
          <div>
            <Title level={5}>Age</Title>
            <Text type="secondary">
              {user?.userProfile?.age || "Not set yet"}
            </Text>
          </div>
          <div>
            <Title level={5}>Joined</Title>
            <Text type="secondary">
              {new Date(user?.createdAt).toDateString()}
            </Text>
          </div>
          <div>
            <Title level={5}>Last Updated</Title>
            <Text type="secondary">
              {new Date(user?.updatedAt).toDateString()}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
