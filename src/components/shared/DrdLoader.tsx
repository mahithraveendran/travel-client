"use client";

import airPlay from "@/asset/animation/ariplay.json";
import carAnimation from "@/asset/animation/car.json";
import Lottie from "lottie-react";
import { cn } from "./cn";

interface IDrdLoaderProps {
  className?: string;
  loader?: "car" | "plane";
}

const DrdLoader = ({ className, loader = "plane" }: IDrdLoaderProps) => {
  return (
    // <Player
    //   autoplay
    //   loop
    //   src={carAnimation}
    //   className={`bg-drd-light-green w-full h-screen`}
    // ></Player>

    <Lottie
      animationData={loader === "car" ? carAnimation : airPlay}
      loop
      className={cn(`bg-drd-light-green w-full h-screen`, className)}
    />
  );
};

export default DrdLoader;
