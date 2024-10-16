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
import HorizontalBarChart from "../../components/horizontalBarChart";
import { useNavigate } from "react-router-dom";

const PublisherOverviewPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Overview</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Daily usage and engagement data
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              navigate("/add-invoice");
            }}
            className="py-2 rounded-lg bg-primary text-white  px-4 font-bold"
          >
            GENERATE INVOICE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <OverviewItem
          value={"20"}
          label={"Zones"}
          actionTitle={"View Campaigns"}
          action={() => {}}
          icon={<LuPanelRightInactive />}
        />
        <OverviewItem
          value={"$600"}
          label={"Revenue"}
          actionTitle={"View Distribution"}
          action={() => {}}
          icon={<BsGraphUpArrow />}
        />
        <OverviewItem
          value={"500"}
          label={"Withdawn"}
          actionTitle={"View Distribution"}
          action={() => {}}
          icon={<MdOutlineAdsClick />}
        />
        <OverviewItem
          value={"$100"}
          label={"Balance"}
          actionTitle={"View Distribution"}
          action={() => {}}
          icon={<MdOutlineAdsClick />}
        />
      </div>

      <div className="flex space-x-4 mt-4">
        <div className="w-8/12 bg-white py-8 rounded-xl  p-5">
          <div className="">
            <h1 className="font-bold text-2xl">Zones earnings comparison</h1>
            <p className="text-sm text-muted dark:text-mutedLight">
              Comparison of zones comparison
            </p>
            <HorizontalBarChart
              data1={[120, 70, 40, 120, 70, 120, 70, 80, 40]}
              label1={"Earnings"}
              label2={" "}
              categories={[
                "Zone 1 - (Mwananchi)",
                "Zone 2 - (Mwananchi)",
                "Zone 4 - (Mwananchi)",
                "Zone 1 - (Mwanaclick)",
                "Zone 2 - (Mwanaclick)",
                "Zone 2 - (Mwanasport)",
              ]}
              title={""}
            />
          </div>
        </div>
        <div className="w-4/12 bg-white py-8 rounded-xl  p-5">
          <h1 className="font-bold text-2xl">Zones distribution</h1>
          <p className="text-sm text-muted dark:text-mutedLight">
            Campaign devices distribution
          </p>
          <div className="mt-6">
            <DonutChart
              data={[4, 6, 10]}
              labels={["Mwananchi(4)", "Mwanaclick (6)", "Mwanasport (10)"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherOverviewPage;
