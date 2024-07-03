"use client";

import errorLoader from "@/asset/animation/error.json";
import RootContainer from "@/components/shared/RootContainer";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "antd";
import { useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-drd-light-green flex items-center justify-center h-screen">
      <div className="space-y-4 flex items-center justify-between gap-4">
        <RootContainer className="space-y-4">
          <h2>Something went wrong!</h2>
          <h2>{error.message || "Something went wrong!"}</h2>
          <Button
            icon={<IoMdRefresh />}
            iconPosition="end"
            onClick={() => reset()}
            type="primary"
            size="large"
          >
            Try again
          </Button>
        </RootContainer>
        <div>
          <Player autoplay loop src={errorLoader}></Player>
        </div>
      </div>
    </div>
  );
}
