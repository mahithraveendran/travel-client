import { cn } from "@/components/shared/cn";
import { ReactNode } from "react";

interface DrdSectionProps {
  children?: ReactNode;
  name: string;
  description?: string;
  className?: string;
}

const DrdDashboardTitle = ({
  children,
  name,
  description,
  className,
}: DrdSectionProps) => {
  return (
    <div className="pt-8 pb-4">
      <h1
        className={cn(
          "text-2xl  bg-drd-light-yellow p-5 w-full font-bold mb-4",
          className
        )}
      >
        {name}
      </h1>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default DrdDashboardTitle;
