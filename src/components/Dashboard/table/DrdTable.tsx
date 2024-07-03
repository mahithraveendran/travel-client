"use client";

import React from "react";
import { AxisOptions, Chart } from "react-charts";
import ResizableBox from "./resizableBox";

// Simplified data generation function
function generateData(seriesCount: number, dataType: string, datums: number) {
  return Array.from({ length: seriesCount }, (_, seriesIndex) => ({
    label: `Request ${seriesIndex + 1}`,
    data: Array.from({ length: datums }, (_, datumIndex) => {
      let primary;
      if (dataType === "ordinal") {
        primary = `Travel ${datumIndex + 1}`;
      } else if (dataType === "time") {
        primary = new Date(Date.now() + datumIndex * 86400000); // Daily data points
      } else {
        primary = datumIndex + 1;
      }

      return {
        primary,
        secondary: Math.floor(Math.random() * 100),
      };
    }),
  }));
}

export default function DrdBar() {
  // Generate sample data
  const data = generateData(3, "ordinal", 10);

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <ResizableBox>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </ResizableBox>
  );
}
