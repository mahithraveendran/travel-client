"use client";

import DrdSection from "@/components/shared/DrdSection";
import { ITrip } from "@/types";
import { Steps } from "antd";
import { useState } from "react";

const TravelSteps = ({ travel }: { travel: ITrip }) => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    setCurrent(value);
  };
  const description = "Details about the travel steps";

  const items = travel?.activities?.map((travel, index) => ({
    title: `Step ${index + 1}`,
    description: travel,
  }));

  return (
    <div className="">
      <DrdSection name="Travel steps" />
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x-2 border p-8">
        <Steps
          current={current}
          onChange={onChange}
          direction="vertical"
          items={items}
        />
        <div className="pl-8">
          <p className="text-xl">
            <h1 className="font-bold">Steps: {current + 1}</h1>
            <p className="mt-5">
              <span>Description: </span>
              {travel?.activities[current] || "No activities available"}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelSteps;
