"use client";

import DrdDashboardTitle from "@/components/Dashboard/shared/DrdDashboardTitle";
import DrdForm from "@/components/Form/DrDForm";
import DrdImageUpload from "@/components/Form/DrdImageUpload";
import DrdInput from "@/components/Form/DrdInput";
import DrdTextArea from "@/components/Form/DrdTextArea";
import DrdLoader from "@/components/shared/DrdLoader";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/lib/redux/Feature/auth/authApi";
import { selectUser } from "@/lib/redux/Feature/auth/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { uploadAndGetImageUrl } from "@/utils/uploadImage";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const EditProfilePage = () => {
  const [image, setImage] = useState<any>([]);

  // router
  const router = useRouter();

  // current user
  const userInfo = useAppSelector(selectUser);

  // user profile data
  const {
    data: userProfileData,
    error,
    isLoading,
  } = useGetProfileQuery(null, { skip: !userInfo?.id });

  const user = userProfileData?.data;

  // prepare default value as for current user
  const defaultValues = {
    ...user,
  };

  // update user profile
  const [updateProfile, updateProfileStatus] = useUpdateProfileMutation();

  const handleProfileUpdate = async (values: any) => {
    // set previous image if no new image
    values.userProfile.image = user?.userProfile?.image || "";

    if (image?.length > 0) {
      try {
        const imgUrl = await uploadAndGetImageUrl(image[0]);
        values.userProfile.image = imgUrl || user?.userProfile?.image || "";
      } catch (error: any) {
        console.log({ error });
        toast.error(
          `Image Upload Error: ${error?.response?.data?.error?.message}` ||
            "Image upload failed"
        );
      }
    }

    // convert age to number
    values.userProfile.age = Number(values.userProfile.age);

    // set empty string if bio is empty
    values.userProfile.bio = values.userProfile.bio || "";

    try {
      const updateRes = await updateProfile(values).unwrap();

      if (updateRes?.success) {
        toast.success("Profile Update successfully");
        router.push("/dashboard/profile");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Profile Update failed");
      console.log({ error });
    }
  };

  if (isLoading) return <DrdLoader className="h-[calc(100vh-200px)]" />;

  return (
    <div>
      <DrdDashboardTitle name="Edit Profile" />
      <div className="max-w-[600px] w-full border p-8 bg-drd-light-green mx-auto rounded-md">
        <h1 className="text-2xl text-center mb-5 font-bold ">
          Profile Update Form
        </h1>
        <DrdForm onSubmit={handleProfileUpdate} defaultValues={defaultValues}>
          <div className="mb-5 flex items-center justify-center gap-10">
            <DrdImageUpload setImages={setImage} />
            <Image
              width={100}
              height={100}
              className="border-dashed rounded-md"
              src={""}
              alt="Profile image"
            />
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <DrdInput label="Name" name="name" type="text" />
            <DrdInput label="User Name" name="userName" type="text" />
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <DrdInput label="Email" name="email" type="email" />

            <DrdInput label="Age" name="userProfile.age" type="number" />
          </div>

          <DrdTextArea label="Bio" name="userProfile.bio" />
          <div>
            <Button
              type="primary"
              block
              htmlType="submit"
              size="large"
              disabled={updateProfileStatus.isLoading}
              loading={updateProfileStatus.isLoading}
            >
              Update
            </Button>
          </div>
        </DrdForm>
      </div>
    </div>
  );
};

export default EditProfilePage;
