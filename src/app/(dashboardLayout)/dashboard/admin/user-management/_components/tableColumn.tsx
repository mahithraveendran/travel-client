"use client";

import { IUser } from "@/types";
import type { TableProps } from "antd";
import { Button, Popover } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import {
  MdOutlineAirplanemodeActive,
  MdOutlineAirplanemodeInactive,
} from "react-icons/md";
import { RiAdminFill, RiUser2Fill } from "react-icons/ri";

// generate columns for user following above example
export const userColumns: TableProps<IUser>["columns"] = [
  {
    title: "Sl. No.",
    dataIndex: "key",
    key: "Sl. No.",
    responsive: ["sm"],
    fixed: "left",
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "Name",
    responsive: ["sm"],
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "Email",
    responsive: ["sm"],
    width: 150,
    render: (email: string) => {
      return (
        <Paragraph
          copyable={{
            text: async () =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve("Request text");
                }, 500);
              }),
          }}
        >
          {email}
        </Paragraph>
      );
    },
  },
  {
    title: "Role",
    key: "Role",
    dataIndex: "role",
    responsive: ["sm"],
    width: 150,
  },
  {
    title: "Status",
    key: "Status",
    dataIndex: "status",
    responsive: ["sm"],
    width: 150,
    render: (status: string) => {
      return (
        <span
          className={`${
            status === "ACTIVE" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    title: "Deleted",
    key: "Deleted",
    dataIndex: "isDeleted",
    responsive: ["sm"],
    width: 150,
    render: (isDeleted: boolean) => {
      return (
        <span className={`${isDeleted ? "text-red-500" : "text-green-500"}`}>
          {isDeleted ? "Yes" : "No"}
        </span>
      );
    },
  },
  {
    title: "Action",
    key: "Action",
    dataIndex: "key",
    responsive: ["sm"],
    fixed: "right",
    width: 100,
    render: (value, record) => {
      // console.log({ value, record });
      return (
        <div className="flex items-center justify-center gap-4">
          <Popover
            content={
              <div className="space-y-4">
                <Button
                  size="small"
                  icon={<RiAdminFill />}
                  className="w-full"
                  disabled={record.status === "ACTIVE"}
                  // onClick={() => handleStatusChange(record.status, "ACTIVE")}
                >
                  Active
                </Button>
                <Button
                  size="small"
                  icon={<RiUser2Fill />}
                  className="w-full"
                  disabled={record.status === "DEACTIVATE"}
                >
                  Deactivate
                </Button>
              </div>
            }
            title="Change User Status"
            trigger="click"
          >
            <Button
              size="small"
              icon={
                record.status === "ACTIVE" ? (
                  <MdOutlineAirplanemodeActive />
                ) : (
                  <MdOutlineAirplanemodeInactive />
                )
              }
            >
              Status
            </Button>
          </Popover>

          <Popover
            content={
              <div className="space-y-4">
                <Button
                  size="small"
                  icon={<RiAdminFill />}
                  className="w-full"
                  disabled={record.role === "ADMIN"}
                >
                  Admin
                </Button>
                <Button
                  size="small"
                  icon={<RiUser2Fill />}
                  className="w-full"
                  disabled={record.role === "USER"}
                >
                  User
                </Button>
              </div>
            }
            title="Change User Role"
            trigger="click"
          >
            <Button
              size="small"
              icon={record.role === "ADMIN" ? <RiAdminFill /> : <RiUser2Fill />}
            >
              Role
            </Button>
          </Popover>
        </div>
      );
    },
  },
];
