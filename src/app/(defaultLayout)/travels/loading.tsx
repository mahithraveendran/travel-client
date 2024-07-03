import SearchBox from "@/components/Home/Hero/SearchBox";
import DrdLoader from "@/components/shared/DrdLoader";
import DrdSection from "@/components/shared/DrdSection";
import PageStarter from "@/components/shared/PageStarter";
import RootContainer from "@/components/shared/RootContainer";
import { Divider } from "antd";

const TravelsLoadingPage = () => {
  return (
    <div className="z-20">
      <PageStarter name="All Travels">
        <SearchBox />
      </PageStarter>
      <div className="pt-20 pb-10 bg-drd-light-green">
        <RootContainer>
          <DrdSection name="View Our Travel" />
          <DrdLoader className="h-[300px]" />
        </RootContainer>
      </div>
      <Divider />
    </div>
  );
};

export default TravelsLoadingPage;
