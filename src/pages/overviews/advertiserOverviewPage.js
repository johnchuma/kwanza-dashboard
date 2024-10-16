import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import TimeseriesChart from "../../components/TimeseriesChart";
import { usage } from "../../utils/constants";
import { RiAdvertisementLine, RiEarthLine } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import { LuPanelRightInactive } from "react-icons/lu";
import OverviewItem from "../../components/overviewItem";
import PieChart from "../../components/pieChart";
import DonutChart from "../../components/donutChart";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineAdsClick } from "react-icons/md";
import GroupedBarChart from "../../components/groupbarChart";

const AdvertiserOverviewPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Overview</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Campaigns data overview
          </p>
        </div>

        <div>
          <button className="py-2 rounded-lg bg-primary text-white  px-4 font-bold">
            Add Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <OverviewItem
          value={"5"}
          label={"Campaigns"}
          actionTitle={"View Campaigns"}
          action={() => {}}
          icon={<LuPanelRightInactive />}
        />
        <OverviewItem
          value={"130,000"}
          label={"Impressions"}
          actionTitle={"View Distribution"}
          action={() => {}}
          icon={<BsGraphUpArrow />}
        />
        <OverviewItem
          value={"248"}
          label={"Clicks"}
          actionTitle={"View Distribution"}
          action={() => {}}
          icon={<MdOutlineAdsClick />}
        />
        <OverviewItem
          value={"$3000"}
          label={"Spent"}
          actionTitle={"View Report"}
          action={() => {}}
          icon={<TbCashRegister />}
        />
      </div>

      <div className="flex space-x-4 mt-4">
        <div className="w-8/12 bg-white py-8 rounded-xl  p-5">
          <div className="">
            <h1 className="font-bold text-2xl">Campaign Reports</h1>
            <p className="text-sm text-muted dark:text-mutedLight">
              Comparison of campaigns impresions
            </p>
            <GroupedBarChart
              data1={[120, 70, 80, 40]}
              data2={[60, 40, 50, 30]}
              label1={"Impressions"}
              label2={"Clicks"}
              categories={[
                "Airtel campaign",
                "Vodacom Campaign",
                "Stanbic Campaign",
                "SAG Customer Service",
              ]}
              title={""}
            />
          </div>
        </div>
        <div className="w-4/12 bg-white py-8 rounded-xl  p-5">
          <h1 className="font-bold text-2xl">Devices Impression</h1>
          <p className="text-sm text-muted dark:text-mutedLight">
            Campaign devices distribution
          </p>
          <div className="mt-6">
            <DonutChart
              data={[30, 12, 50, 40]}
              labels={[
                "Andoid (30)",
                "IOS (12)",
                "Windows (50)",
                "Macontosh (50)",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserOverviewPage;
