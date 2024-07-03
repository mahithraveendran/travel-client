"use client";

import DrdDashboardTitle from "@/components/Dashboard/shared/DrdDashboardTitle";
import DrdPagination from "@/components/Home/Travel/DrdPagination";
import TripUpdateModal from "@/components/Modal/TripUpdateModal";
import { adminPaginationPerPage } from "@/constant/paginationControl";
import {
  useDeleteTripMutation,
  useGetAllTripQuery,
} from "@/lib/redux/Feature/admin/trips/adminTipApi";
import {
  selectTripManagementPagination,
  setPage,
} from "@/lib/redux/Feature/admin/trips/adminTripManagementSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { ITrip } from "@/types";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Button, Modal, Table } from "antd";
// import confirm from "antd/es/modal/confirm";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
const { confirm } = Modal;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const TripManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // set selected trip id
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  // redux
  const adminPagination = useAppSelector(selectTripManagementPagination);
  const [deleteTrip, deleteTripStatus] = useDeleteTripMutation();

  const {
    data: tripsData,
    isLoading,
    isError,
  } = useGetAllTripQuery({ ...adminPagination });

  console.log({ travels: tripsData, isLoading, isError });

  // generate data from api
  const data =
    tripsData?.data?.length > 0 &&
    tripsData?.data?.map((trip: ITrip, index: number) => {
      return {
        key: index + 1,
        budget: trip?.budget,
        startDate: trip?.startDate,
        endDate: trip?.endDate,
        destination: trip?.destination,
        type: trip?.type,
        createdAt: trip?.createdAt,
        updatedAt: trip?.updatedAt,
        id: trip?.id,
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

  // handle modal open
  const handleModalOpen = (tripId: string) => {
    setSelectedTripId(tripId);
    setIsModalOpen(true);
  };

  // table columns
  const columns: TableProps<ITrip>["columns"] = [
    {
      title: "Sl. No.",
      dataIndex: "key",
      key: "Sl. No.",
      fixed: "left",
      width: 40,
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
      dataIndex: "key",
      fixed: "right",
      width: 100,
      render: (value, record) => {
        // console.log({ value, record });
        return (
          <div className="flex items-center justify-center gap-4">
            <Link href={`/dashboard/admin/edit-trip?tripId=${record.id}`}>
              <Button type="primary" size="small">
                Edit
              </Button>
            </Link>
            <Button
              size="small"
              type="dashed"
              danger
              onClick={() => showDeleteConfirm(record.id)}
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
        <DrdDashboardTitle name="Trip Management" />
        {/* <PageStarter name="Trip Management" className="min-h-[200px]" /> */}
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 1500, y: 500 }}
        />
        <div className="py-8 flex items-center justify-center">
          <DrdPagination
            metaData={tripsData?.meta}
            setPage={setPage}
            paginationPerPage={adminPaginationPerPage}
          />
        </div>
      </div>
      <TripUpdateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        tripId={selectedTripId}
      />
    </>
  );
};

export default TripManagement;
