"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "antd";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const NotFoundPage = () => {
  return (
    <div className="bg-drd-light-green min-h-screen">
      <div className="container mx-auto flex flex-col lg:flex-row px-3 py-10 text-center lg:text-left items-center justify-center">
        <div className="lg:w-1/2">
          <h1 className="text-2xl lg:text-5xl font-bold  text-stone-300 space-y-4">
            Oops... Some things is wrong <br />
            <p className="text-stone-700">Status Code: {"404"}</p>
            <span className="text-2xl lg:text-3xl font-black text-black">
              {"Resource not found"}
            </span>
          </h1>
          <p className="py-6 lg:text-xl">{"Not Found"}</p>
          <Link href="/">
            <Button icon={<BsArrowLeft />} type="primary" size="large">
              Back To Home Page
            </Button>
          </Link>
        </div>
        <div className="lg:w-3/4">
          <Player
            autoplay
            loop
            src={"https://assets3.lottiefiles.com/packages/lf20_2ibpmsby.json"}
          ></Player>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
