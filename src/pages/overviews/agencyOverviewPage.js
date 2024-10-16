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
import { BsGraphUpArrow, BsInstagram } from "react-icons/bs";
import { MdOutlineAdsClick } from "react-icons/md";
import GroupedBarChart from "../../components/groupbarChart";
import { FiUsers } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";

const AgencyOverviewPage = () => {
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
            View Advertisers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <OverviewItem
          value={"30"}
          label={"Active Campaigns"}
          actionTitle={"View Campaigns"}
          action={() => {}}
          icon={<TbCashRegister />}
        />
        <OverviewItem
          value={"246"}
          label={"Campaigns"}
          actionTitle={"View Campaigns"}
          action={() => {}}
          icon={<BsGraphUpArrow />}
        />
        <OverviewItem
          value={"20"}
          label={"Users"}
          actionTitle={"View Users"}
          action={() => {}}
          icon={<HiOutlineUsers />}
        />
        <OverviewItem
          value={"20"}
          label={"Advertisers"}
          actionTitle={"View Advertisers"}
          action={() => {}}
          icon={<BsInstagram />}
        />
      </div>

      <div className="flex space-x-4 mt-4">
        <div className="w-8/12 bg-white dark:bg-darkLight py-8 rounded-xl  p-5">
          <div className="">
            <h1 className="font-bold text-2xl">Campaign Reports</h1>
            <p className="text-sm text-muted dark:text-mutedLight">
              Top 5 campaigns
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
        <div className="w-4/12 bg-white dark:bg-darkLight py-8 rounded-xl  p-5">
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

export default AgencyOverviewPage;
