"use client";

import { ConfigProvider } from "antd";
import { ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./Store-Provider";

import AOS from "aos";
import "aos/dist/aos.css";

const AllProviders = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <StoreProvider>
        <ConfigProvider
          theme={{
            // algorithm: [theme.darkAlgorithm],
            token: {
              // Seed Token
              // colorPrimary: "#C80000", // red
              colorPrimary: "#3A643B", // green
              // colorPrimary: "#FDE723", // yellow

              // colorTextSecondary: "#FFFFFF",
              // colorFillSecondary: "#FFFFFF",
              // colorText: "#FFFFFF",
              // colorFill: "#FFFFFF",
              // colorPrimaryText: "#15151F",
              // colorPrimaryBg: "#FFFFFF",
              // borderRadius: 2,
              // colorTextBase: "Black",

              // colorPrimaryHover: "#FDE723",

              // Alias Token
              // colorBgContainer: "#E6F4E0",
            },
            components: {
              // Timeline: {
              //   dotBorderWidth: 4,
              //   tailWidth: 10,
              //   itemPaddingBottom: 100,
              // },
              Card: {
                actionsLiMargin: "0 0 0 8px",
              },
            },
          }}
        >
          {children}
          <ToastContainer />
        </ConfigProvider>
      </StoreProvider>
    </>
  );
};

export default AllProviders;
