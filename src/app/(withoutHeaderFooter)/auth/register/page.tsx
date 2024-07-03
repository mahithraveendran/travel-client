"use client";

import loginBg from "@/asset/images/auth/login-img.jpg";
import DrdForm from "@/components/Form/DrDForm";
import DrdInput from "@/components/Form/DrdInput";
import DrdPassInput from "@/components/Form/DrdPassInput";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/lib/redux/Feature/auth/authApi";
import { setUser } from "@/lib/redux/Feature/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setTokenInCookie } from "@/utils/helper";
import { registerValidationSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [userRegistration, registrationStatus] = useRegisterMutation();
  const [userLogin, loginStatus] = useLoginMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRegister = async (data: FieldValues) => {
    console.log({ data });

    const sendableData = {
      name: data.userName,
      email: data.email,
      password: data.password,
    };

    try {
      const registerResponse = await userRegistration(sendableData).unwrap();

      if (registerResponse?.success) {
        const toastId = toast.success(
          "Registration Successful and Login in progress...",
          {
            autoClose: 5000,
          }
        );

        // auto Login after registration
        const loginResponse = await userLogin({
          email: data.email,
          password: data.password,
        }).unwrap();

        if (loginResponse?.success) {
          dispatch(
            setUser({
              user: loginResponse.data,
              token: loginResponse.data.token,
            })
          );

          // set token in cookie
          setTokenInCookie(loginResponse.data.token, "/dashboard/profile");
          toast.dismiss(toastId);

          toast.success("Login Successful");
          // router.push("/dashboard");
        } else {
          toast.error("Login Failed");
          router.push("/auth/login");
        }
      }
    } catch (error: any) {
      console.log({ error });
      toast.error(error?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen">
      <div className="hidden sm:block">
        <Image
          src={loginBg}
          alt="login"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="flex items-center justify-center bg-drd-dark-green p-8">
        <div className="border rounded-lg p-8 lg:p-16 bg-drd-light-green">
          <div className="pb-8">
            <h1 className=" text-xl md:text-2xl lg:text-4xl font-bold text-center text-drdPrimary pb-4">
              Welcome to Dream Destination
            </h1>
            <p className="text-center">Register to catch your Dream</p>
          </div>
          <DrdForm
            onSubmit={handleRegister}
            resolver={zodResolver(registerValidationSchema)}
          >
            <div className="flex items-center  md:gap-4 flex-col md:flex-row ">
              <DrdInput
                label="User Name"
                type="text"
                name="userName"
                placeholder="Enter your user name"
              />
              <DrdInput
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex items-center flex-col md:flex-row   md:gap-4">
              <DrdPassInput
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              <DrdPassInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Enter your confirm password"
              />
            </div>
            <Button
              htmlType="submit"
              type="primary"
              block
              size="large"
              loading={registrationStatus?.isLoading}
              disabled={registrationStatus?.isLoading}
            >
              Register
            </Button>
            <div>
              <p className="text-center pt-4">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-drdPrimary">
                  Login
                </Link>
              </p>
            </div>
          </DrdForm>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
