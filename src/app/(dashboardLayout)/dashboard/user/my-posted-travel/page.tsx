"use client";

import DrdDashboardTitle from "@/components/Dashboard/shared/DrdDashboardTitle";
import { useDeleteTripMutation } from "@/lib/redux/Feature/admin/trips/adminTipApi";
import { useGetMyPostedTripsQuery } from "@/lib/redux/Feature/trip/tripApi";
import { ITrip } from "@/types";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Button, Modal, Table } from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
const { confirm } = Modal;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const MyPostedTravelPage = () => {
  const [deleteTrip, deleteTripStatus] = useDeleteTripMutation();

  const {
    data: travels,
    isLoading,
    isError,
  } = useGetMyPostedTripsQuery(undefined);

  console.log({ travels, isLoading, isError });

  // generate data from api
  const data =
    travels?.data?.length > 0 &&
    travels?.data?.map((travel: ITrip, index: number) => {
      return {
        key: index + 1,
        budget: travel?.budget,
        startDate: travel?.startDate,
        endDate: travel?.endDate,
        destination: travel?.destination,
        type: travel?.type,
        id: travel?.id,
        image: travel?.image,
      };
    });

  // handle delete a trip
  const handleDeleteTrip = async (id: string) => {
    try {
      const deleteRes = await deleteTrip(id).unwrap();
      console.log({ deleteRes });
      if (deleteRes?.success) {
        // show success message
        toast.success("Trip deleted successfully");
      }
    } catch (error: any) {
      // show error message
      toast.error(
        error?.data?.errorDetails?.meta?.field_name || "Failed to delete trip"
      );

      console.log({ error });
    }
  };

  // show delete confirmation modal
  const showDeleteConfirm = async (tripId: string) => {
    confirm({
      title: "Are you sure delete this TRIP?",
      icon: <ExclamationCircleFilled />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          await handleDeleteTrip(tripId);
        } catch {
          console.log("Oops, error when deleting the trip!");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "No.",
      dataIndex: "key",
      key: "Sl. No.",
      fixed: "left",
      width: 40,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "Image",
      render: (image: string) => {
        return (
          <Image
            src={image}
            alt="travel"
            className="w-16 h-16 object-cover rounded-md"
            width={50}
            height={50}
          />
        );
      },
      width: 100,
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "Budget",
      render: (budget: number) => {
        return <span>${budget}</span>;
      },
      width: 150,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "Start Date",
      render: (startDate: string) => {
        return <span>{moment(startDate).format("ll")}</span>;
      },
      width: 150,
    },
    {
      title: "End Date",
      key: "End Date",
      dataIndex: "endDate",
      render: (endDate: string) => {
        return <span>{moment(endDate).format("ll")}</span>;
      },
      width: 150,
    },
    {
      title: "Destination",
      key: "Destination",
      dataIndex: "destination",
      width: 150,
    },
    {
      title: "Type",
      key: "Type",
      dataIndex: "type",
      width: 150,
    },
    {
      title: "Action",
      key: "Action",
      fixed: "right",
      width: 150,
      render: (value) => {
        console.log({ value });
        return (
          <div className="flex items-center justify-center gap-2">
            <Link href={`/travels/${value?.id}`}>
              <Button type="primary" size="small">
                View Details
              </Button>
            </Link>
            <Link
              href={`/dashboard/user/edit-travel?tripId=${value?.id}&editBy=user`}
            >
              <Button type="primary" size="small">
                Edit
              </Button>
            </Link>
            <Button
              danger
              size="small"
              type="dashed"
              onClick={() => showDeleteConfirm(value.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div>
        <DrdDashboardTitle name="My Posted Travels" />
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 1500, y: 500 }}
        />
      </div>
    </>
  );
};

export default MyPostedTravelPage;
