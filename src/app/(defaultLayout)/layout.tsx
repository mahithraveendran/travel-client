import Footer from "@/components/Home/Footer/Footer";
import Navbar from "@/components/Home/Navbar/Navbar";
import { ReactNode } from "react";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
