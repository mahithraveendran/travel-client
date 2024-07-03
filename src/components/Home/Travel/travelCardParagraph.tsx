"use client";

import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";

const TravelCardParagraph = ({ paragraph }: { paragraph: string }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Paragraph
      ellipsis={{
        rows: 2,
        expandable: "collapsible",
        expanded,
        onExpand: (_, info) => setExpanded(info.expanded),
      }}
    >
      {paragraph}
    </Paragraph>
  );
};

export default TravelCardParagraph;
