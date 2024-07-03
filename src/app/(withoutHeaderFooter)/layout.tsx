import { ReactNode } from "react";

const WithoutHeaderFooterLayout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default WithoutHeaderFooterLayout;
