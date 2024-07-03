"use client";

import DrdDashboardTitle from "@/components/Dashboard/shared/DrdDashboardTitle";
import DrdPagination from "@/components/Home/Travel/DrdPagination";
import {
  useChangeUserRoleMutation,
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/lib/redux/Feature/admin/users/usersApi";
import {
  selectUserManagementPagination,
  setPage,
} from "@/lib/redux/Feature/admin/users/usersManagementSlice";
import { selectUser } from "@/lib/redux/Feature/auth/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { IUser, UserRole, UserStatus } from "@/types";
import type { TableProps } from "antd";
import { Button, Popover, Table } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import {
  MdOutlineAirplanemodeActive,
  MdOutlineAirplanemodeInactive,
} from "react-icons/md";
import { RiAdminFill, RiUser2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const UserManagementPage = () => {
  // redux
  const pagination = useAppSelector(selectUserManagementPagination);
  const user = useAppSelector(selectUser);

  const {
    data: users,
    isLoading,
    isError,
  } = useGetAllUsersQuery(
    { ...pagination },
    { skip: !user?.id || !pagination.page }
  );

  // status change
  const [changeStatus, changeStatusState] = useUpdateUserStatusMutation();

  // handle status change
  const handleStatusChange = async (userId: string, status: UserStatus) => {
    try {
      const response = await changeStatus({ id: userId, status }).unwrap();

      if (response?.success) {
        // show success message
        toast.success("User status updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update user status");
      console.log({ error });
    }
  };

  // role change
  const [changeRole, changeRoleState] = useChangeUserRoleMutation();

  // handle role change
  const handleRoleChange = async (userId: string, role: UserRole) => {
    try {
      const response = await changeRole({ id: userId, role }).unwrap();

      if (response?.success) {
        // show success message
        toast.success("User role updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update user role");
      console.log({ error });
    }
  };

  // generate data from api
  const data =
    users?.data?.length > 0 &&
    users?.data?.map((user: IUser, index: number) => {
      return {
        key: index + 1,
        name: user.name,
        role: user.role,
        email: user.email,
        status: user.status,
        isDeleted: user.isDeleted,
        id: user.id,
      };
    });

  console.log({ data });

  // generate columns for user following above example
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "No.",
      dataIndex: "key",
      key: "Sl. No.",
      fixed: "left",
      width: 40,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "Name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "Email",
      width: 150,
      render: (email: string) => {
        return (
          <Paragraph
            copyable={{
              text: async () =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(email);
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
      width: 150,
      render: (role: string) => {
        return (
          <div>
            {role === "ADMIN" ? <RiAdminFill /> : <RiUser2Fill />}
            <span>{role}</span>
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "Status",
      dataIndex: "status",
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
                    disabled={record.status === UserStatus.ACTIVE}
                    onClick={() =>
                      handleStatusChange(record.id, UserStatus.ACTIVE)
                    }
                    loading={
                      record.status !== UserStatus.ACTIVE &&
                      changeStatusState.isLoading
                    }
                  >
                    Active
                  </Button>
                  <Button
                    size="small"
                    icon={<RiUser2Fill />}
                    className="w-full"
                    disabled={record.status === UserStatus.DEACTIVATE}
                    onClick={() =>
                      handleStatusChange(record.id, UserStatus.DEACTIVATE)
                    }
                    loading={
                      record.status !== UserStatus.DEACTIVATE &&
                      changeStatusState.isLoading
                    }
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
                    disabled={record.role === UserRole.ADMIN}
                    onClick={() => handleRoleChange(record.id, UserRole.ADMIN)}
                    loading={
                      record.role !== UserRole.ADMIN &&
                      changeRoleState.isLoading
                    }
                  >
                    Admin
                  </Button>
                  <Button
                    size="small"
                    icon={<RiUser2Fill />}
                    className="w-full"
                    disabled={record.role === UserRole.USER}
                    onClick={() => handleRoleChange(record.id, UserRole.USER)}
                    loading={
                      record.role !== UserRole.USER && changeRoleState.isLoading
                    }
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
                icon={
                  record.role === "ADMIN" ? <RiAdminFill /> : <RiUser2Fill />
                }
              >
                Role
              </Button>
            </Popover>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <DrdDashboardTitle name="User Management" />
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 1500, y: 500 }}
        />
        <div className="py-8 flex items-center justify-center">
          <DrdPagination
            metaData={users?.meta}
            setPage={setPage}
            paginationPerPage={5}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagementPage;
