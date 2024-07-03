import { cn } from "./cn";

const DrdCssLoader = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        " w-full h-screen bg-drd-light-green flex items-center justify-center",
        className
      )}
    >
      <div className="loader"></div>
    </div>
  );
};

export default DrdCssLoader;
