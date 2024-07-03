import { ITrip } from "@/types";
import { CalendarOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import moment from "moment";

const SingleTravelTextDetails = ({ travel }: { travel: ITrip }) => {
  return (
    <div className="border h-full">
      <div className="bg-drd-light-yellow p-8 text-drd-green">
        <div className="grid grid-cols-2">
          <div>
            <p className="flex items-center gap-4 text-xl font-bold ">
              <CalendarOutlined />
              Start One
            </p>
            <p className="flex items-center gap-4 text-xl font-bold ">
              <CalendarOutlined />
              End One
            </p>
          </div>
          <div className="text-xl">
            <p>{moment(travel.startDate).format("ll")}</p>
            <p>{moment(travel.endDate).format("ll")}</p>
          </div>
        </div>
      </div>
      <div className="p-8 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="flex items-center gap-4 text-xl font-bold ">
          <CalendarOutlined />
          Destination
        </p>
        <p className="text-xl">{travel.destination}</p>
      </div>

      <Divider />
      <div className="p-8 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="flex items-center gap-4 text-xl font-bold ">
          <CalendarOutlined />
          Description
        </p>
        <p className="text-xl text-wrap">
          {travel?.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default SingleTravelTextDetails;
