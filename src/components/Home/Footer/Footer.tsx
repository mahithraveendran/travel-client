import footerBg from "@/asset/images/pages/footer-bg.png";
import RootContainer from "@/components/shared/RootContainer";
import {
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import DreamLogo from "../Navbar/DreamLogo";

const Footer = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url('${footerBg.src}')`,
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="py-20 pt-36 bg-drd-light-green text-drd-green"
      >
        <RootContainer>
          <div className="flex justify-between gap-8 flex-wrap lg:flex-nowrap">
            <div className="w-full">
              <div className="flex items-center gap-4 pb-5">
                <DreamLogo />
              </div>
              <p>
                Travel Trek is a travel agency that specializes in
                creating custom travel experiences for our clients.
              </p>
            </div>
            <div className="w-full">
              <h1 className="font-bold text-lg">Contact Information</h1>
              <div className="space-y-3 pt-5 ">
                <p className="flex items-center gap-2">
                  <FaLocationDot color="black" />
                  <span>34,5d,Travel Trek</span>
                </p>
                <p className="flex items-center gap-2">
                  <MdEmail color="black" />
                  <span>info@traveltrek19@gmail.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone color="black" />
                  <span>+91 9544189533</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <h1 className="font-bold text-lg">Quick Link</h1>
              <ul className="space-y-3 pt-5 ">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/">About</Link>
                </li>
                <li>
                  <Link href="/">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="w-full">
              <h1 className="font-bold text-lg">Follow Us</h1>
              <ul className="flex items-center gap-4 pt-5">
                <li>
                  <Tooltip title="Facebook">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<FaFacebookF />}
                    />
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Instagram">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<InstagramOutlined />}
                    />
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Youtube">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<YoutubeOutlined />}
                    />
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Linkedin">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<LinkedinOutlined />}
                    />
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </RootContainer>
      </div>
      <div className="bg-[#00294D]">
        <RootContainer>
          <div className="flex justify-center gap-4 items-center  py-8 text-center text-drd-light-yellow flex-wrap lg:flex-nowrap">
            <p>
              © 2024 - {new Date().getFullYear()} Travel Trek. All Rights
              Reserved
            </p>
            <Link href="https://www.termsfeed.com/live/c7b41ae6-b284-4fde-afe6-bc4a97c1ad0a">
              Privacy Policy
            </Link>
            <Link href="https://www.termsfeed.com/live/b31d1126-0ea6-4978-9859-5bb1458c328e">
              Terms & Condition
            </Link>
          </div>
        </RootContainer>
      </div>
    </>
  );
};

export default Footer;
