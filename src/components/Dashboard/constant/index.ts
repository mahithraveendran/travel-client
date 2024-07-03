import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { BsFillSignpostSplitFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdOutlineModeOfTravel, MdTravelExplore } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

export const adminMenuItems = [
  {
    key: "/user-management",
    icon: React.createElement(FaUsers),
    label: "User Management",
    href: "/user-management",
  },
  {
    key: "/trip-management",
    icon: React.createElement(MdTravelExplore),
    label: "Trip Management",
    href: "/trip-management",
  },
];

export const userMenuItems = [
  {
    key: "/travel-request-history",
    icon: React.createElement(MdOutlineModeOfTravel),
    label: "Request History",
    href: "/travel-request-history",
  },
  {
    key: "/travel-posts",
    icon: React.createElement(BsFillSignpostSplitFill),
    label: "Post Travel",
    href: "/travel-posts",
  },
  {
    key: "/my-posted-travel",
    icon: React.createElement(MdTravelExplore),
    label: "My Trips",
    href: "/my-posted-travel",
  },
];

export const commonMenuItems = [
  {
    key: "/",
    icon: React.createElement(UserOutlined),
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    key: "/profile",
    icon: React.createElement(UserOutlined),
    label: "Profile",
    href: "/profile",
  },
  {
    key: "/change-password",
    icon: React.createElement(TbPasswordUser),
    label: "Change Password",
    href: "/change-password",
  },
];
