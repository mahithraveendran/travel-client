import { ReactNode } from "react";
import RootContainer from "./RootContainer";
import { cn } from "./cn";

interface DrdSectionProps {
  children?: ReactNode;
  name: string;
  description?: string;
  className?: string;
}

const DrdSection = ({
  children,
  name,
  description,
  className,
}: DrdSectionProps) => {
  return (
    <RootContainer>
      <div className="pt-20 pb-16 text-center max-w-lg w-full mx-auto capitalize">
        <h1 className={cn("text-4xl font-bold mb-4", className)}>{name}</h1>
        <p>{description}</p>
        {children}
      </div>
    </RootContainer>
  );
};

export default DrdSection;
