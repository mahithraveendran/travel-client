"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Action } from "@reduxjs/toolkit";
import { Button, Pagination } from "antd";

const itemRender = (_: any, type: string, originalElement: any) => {
  if (type === "prev") {
    return (
      <Button icon={<LeftOutlined />} iconPosition="start">
        Previous
      </Button>
    );
  }
  if (type === "next") {
    return (
      <Button icon={<RightOutlined />} iconPosition="end">
        Next
      </Button>
    );
  }
  return originalElement;
};

interface IProps {
  metaData: {
    total: number;
    limit: number;
    page: number;
  };
  setPage: (page: number) => Action;
  paginationPerPage: number;
}

const DrdPagination = ({ metaData, setPage, paginationPerPage }: IProps) => {
  const dispatch = useAppDispatch();

  const handlePagination = (page: number) => {
    console.log(page);
    dispatch(setPage(page));
  };

  return (
    <Pagination
      defaultCurrent={1}
      total={metaData?.total}
      pageSize={paginationPerPage}
      onChange={handlePagination}
      itemRender={itemRender}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      hideOnSinglePage
    />
  );
};

export default DrdPagination;
