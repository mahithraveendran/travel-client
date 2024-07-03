import { ITrip } from "@/types";
import { CalendarOutlined } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import Ribbon from "antd/es/badge/Ribbon";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import TravelCardParagraph from "./travelCardParagraph";

const SingleTravelCard = ({ travel }: { travel: ITrip }) => {
  const { destination, startDate, endDate, image, type } = travel;

  const style = {
    width: "100%",
    padding: "16px",

    "@media (minWidth: 500px)": {
      padding: "180px",
    },
  };

  return (
    <div data-aos="zoom-in-down">
      <Ribbon text={type} className=" z-50" />
      <Card
        style={style}
        bordered={false}
        hoverable
        cover={
          <Image
            className="border bg-drd-light-green"
            alt="example"
            src={
              image ||
              "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            }
            width={200}
            height={200}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "200px",
            }}
          />
        }
        actions={[
          <Link key={1} href={`/travels/${travel.id}`} className="w-full">
            <Button
              key={1}
              // icon={<ArrowRightOutlined />}
              block
              type="primary"
              className="mt-4"
              size="large"
            >
              Travel Details
            </Button>
          </Link>,
          <Link
            key={2}
            href={`/travel-request?travelId=${travel.id}`}
            className="w-full"
          >
            <Button
              key={1}
              // icon={<ArrowRightOutlined />}
              block
              className="mt-4"
              size="large"
            >
              Travel Request
            </Button>
          </Link>,
        ]}
      >
        <div className="">
          <div className="text-start text-base text-drd-green">
            <p className="font-semibold text-xl pt-6">{destination}</p>
            <div className="flex items-center gap-4 py-[18px]">
              <Avatar size="small" src={travel?.user?.userProfile?.image} />
              <p>@{travel?.user?.name}</p>
            </div>
          </div>
          <TravelCardParagraph
            paragraph={
              travel.description ||
              `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            fugiat ab accusantium alias omnis perspiciatis illum sed oditasdfasdfffffffffffffffffffffffffffffffff`
            }
          />
          <div className="space-y-2">
            <div className="flex items-center  gap-2">
              <CalendarOutlined />
              <span>Start Date:</span>{" "}
              <span className="font-bold">
                {moment(startDate).format("ll")}
              </span>
            </div>
            <div className="flex items-center  gap-2">
              <CalendarOutlined />
              <span>End Date:</span>{" "}
              <span className="font-bold">{moment(endDate).format("ll")}</span>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-between gap-4 w-full">
          <Link href={`/travels/${travel.id}`} className="w-full">
            <Button
              key={1}
              // icon={<ArrowRightOutlined />}
              block
              type="primary"
              className="mt-4"
              size="large"
            >
              Travel Details
            </Button>
          </Link>
          <Link
            href={`/travel-request?travelId=${travel.id}`}
            className="w-full"
          >
            <Button
              key={1}
              // icon={<ArrowRightOutlined />}
              block
              className="mt-4"
              size="large"
            >
              Travel Request
            </Button>
          </Link>
        </div> */}
      </Card>
    </div>
  );
};

export default SingleTravelCard;
