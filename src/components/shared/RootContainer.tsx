import { ReactNode } from "react";
import { cn } from "./cn";

const RootContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("container mx-auto px-4 md:px-8", className)}>
      {children}
    </div>
  );
};

export default RootContainer;
