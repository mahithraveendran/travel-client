"use client";

import DrdDashboardTitle from "@/components/Dashboard/shared/DrdDashboardTitle";
import { useGetMyTravelBuddiesQuery } from "@/lib/redux/Feature/trip/tripApi";
import { ITravelRequestHistory } from "@/types";
import type { TableProps } from "antd";
import { Table } from "antd";
import moment from "moment";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Sl. No.",
    dataIndex: "key",
    key: "Sl. No.",
    fixed: "left",
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
    title: "Status",
    key: "Status",
    dataIndex: "status",
    render: (status: string) => {
      return (
        <span
          className={
            status === "APPROVED"
              ? "text-green-500"
              : status === "REJECTED"
              ? "text-red-500"
              : "text-yellow-500"
          }
        >
          {status}
        </span>
      );
    },
    fixed: "right",
    width: 100,
  },
];

const TravelRequestHistory = () => {
  const {
    data: travels,
    isLoading,
    isError,
  } = useGetMyTravelBuddiesQuery(undefined);

  // console.log({ travels, isLoading, isError });

  // generate data from api
  const data =
    travels?.data?.length > 0 &&
    travels?.data?.map((travel: ITravelRequestHistory, index: number) => {
      const trip = travel.trip;
      return {
        key: index + 1,
        budget: trip?.budget,
        startDate: trip?.startDate,
        endDate: trip?.endDate,
        destination: trip?.destination,
        type: trip?.type,
        status: travel?.status,
      };
    });

  return (
    <>
      <div>
        <DrdDashboardTitle name="Travel Request History" />
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

export default TravelRequestHistory;
