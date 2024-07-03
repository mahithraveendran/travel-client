"use client";

import loginBg from "@/asset/images/auth/login-img.jpg";
import DrdForm from "@/components/Form/DrDForm";
import DrdInput from "@/components/Form/DrdInput";
import DrdPassInput from "@/components/Form/DrdPassInput";
import { useLoginMutation } from "@/lib/redux/Feature/auth/authApi";
import { setUser } from "@/lib/redux/Feature/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setTokenInCookie } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(255),
});

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [userLogin, loginStatus] = useLoginMutation();

  const router = useRouter();

  const handleLogin = async (data) => {
    try {
      const loginResponse = await userLogin(data).unwrap();
      // console.log({ loginResponse });

      if (loginResponse?.success) {
        dispatch(
          setUser({ user: loginResponse.data, token: loginResponse.data.token })
        );

        // set token in cookie
        setTokenInCookie(loginResponse.data.token, "/dashboard/profile");

        // redirect to dashboard
        // router.push("/dashboard");

        toast.success("Login Successful");
      }
    } catch (error) {
      if (!error?.success) {
        toast.error(error?.data?.message || "Something went wrong");
      }
      console.log({ error });
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
            <h1 className=" text-2xl md:text-3xl lg:text-6xl font-bold text-center text-drdPrimary pb-4">
              Welcome Back
            </h1>
            <p className="text-center">Login to your account</p>
          </div>
          <DrdForm
            onSubmit={handleLogin}
            resolver={zodResolver(loginValidationSchema)}
          >
            <DrdInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            <DrdPassInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <Button
              htmlType="submit"
              type="primary"
              block
              size="large"
              loading={loginStatus?.isLoading}
              disabled={loginStatus?.isLoading}
            >
              Login
            </Button>
            <div>
              <p className="text-center pt-4">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="text-drdPrimary">
                  Register
                </Link>
              </p>
            </div>
          </DrdForm>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
