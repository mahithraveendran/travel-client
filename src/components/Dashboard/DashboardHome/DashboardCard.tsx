interface IDashboardCard {
  icon: any;
  title: string;
  number: number;
}

const DashboardCard = ({ icon: Icon, title, number }: IDashboardCard) => {
  return (
    <div className="p-4 border-l-2 border-drd-yellow flex items-center justify-between gap-4 bg-white">
      <div className="w-full">
        <h3 className="text-2xl font-bold">{number}.1K</h3>
        <p>{title}</p>
      </div>
      <div className="w-full">
        <div className="">
          <Icon className="text-5xl text-drd-yellow bg-drd-light-green p-2 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
