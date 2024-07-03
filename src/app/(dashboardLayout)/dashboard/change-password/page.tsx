"use client";

import DrdDashboardTitle from "@/components/Dashboard/shared/DrdDashboardTitle";
import DrdForm from "@/components/Form/DrDForm";
import DrdPassInput from "@/components/Form/DrdPassInput";
import { useChangePasswordMutation } from "@/lib/redux/Feature/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";

// zod validation schema
const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: "Old password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(8, {
        message: "Password must be at least 8 characters",
      }),
    confirmNewPassword: z
      .string({ required_error: "Confirm new password is required" })
      .min(8, {
        message: "Password must be at least 8 characters",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

const ChangePasswordPage = () => {
  // router
  const router = useRouter();

  // password change redux hook
  const [changePassword, changePasswordStatus] = useChangePasswordMutation();

  // handle password change
  const handlePasswordChange = async (values: any) => {
    console.log(values);

    // remove confirm password from data
    const { confirmNewPassword, ...updateDoc } = values;

    try {
      const changeRes = await changePassword(updateDoc).unwrap();

      console.log({ changeRes });
      if (changeRes?.success) {
        // show success message
        toast.success("Password changed successfully");
        router.push("/dashboard/profile");
      }
    } catch (error: any) {
      console.log({ error });
      toast.error(error?.data?.message || "Password change failed");
    }
  };
  return (
    <div>
      <DrdDashboardTitle name="Change Password" />
      <div className="max-w-[600px] w-full border p-8 bg-drd-light-green mx-auto rounded-md">
        <h1 className="text-2xl text-center mb-5 font-bold ">
          Change Password Form
        </h1>
        <DrdForm
          onSubmit={handlePasswordChange}
          resolver={zodResolver(changePasswordSchema)}
        >
          <DrdPassInput
            label="Old Password"
            type="password"
            placeholder="Enter old password"
            name="oldPassword"
          />
          <DrdPassInput
            label="New Password"
            type="password"
            placeholder="Enter new password"
            name="newPassword"
          />

          <DrdPassInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            name="confirmNewPassword"
          />
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              block
              size="large"
              loading={changePasswordStatus.isLoading}
              disabled={changePasswordStatus.isLoading}
            >
              Change Password
            </Button>
          </div>
        </DrdForm>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
