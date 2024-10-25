import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import TimeseriesChart from "../../components/charts/TimeseriesChart";
import { usage } from "../../utils/constants";
import { RiAdvertisementLine, RiEarthLine } from "react-icons/ri";
import { TbCashRegister, TbChevronDown } from "react-icons/tb";
import { LuPanelRightInactive } from "react-icons/lu";
import OverviewItem from "../../components/overviewItem";
import PieChart from "../../components/charts/pieChart";
import DonutChart from "../../components/charts/donutChart";
import { getLogsStats } from "../../controllers/logsController";
import { getAdminStats } from "../../controllers/statsController";
import Loader from "../../components/loader";

const AdminOverviewPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findStats();
  }, []);
  const findStats = () => {
    getAdminStats().then((response) => {
      console.log(response.data.body);
      setLoading(false);
      setStats(response.data.body);
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Overview</h1>
          <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
            Daily usage and engagement data
          </p>
        </div>
        {/* <div className="w-2/12">
          <select className=" border-0 input-style">
            <option>All time</option>
            <option>This week</option>
            <option>This month</option>
            <option>This year</option>
          </select>
        </div> */}
        <div>
          {/* <button className="py-2 rounded-lg items-center bg-primary text-white  px-4 font-bold flex space-x-2">
            <h1>All Time</h1>
            <TbChevronDown className="text-lg" />
          </button> */}
        </div>
      </div>
      {/* <div className="flex space-x-6 mt-6">
        {["Overview", "Campaigns", "Revenue", "Users"].map((item, index) => {
          return (
            <div
              onClick={() => {
                setActiveTab(index);
              }}
              className={`${
                activeTab == index
                  ? "font-bold text-primary border-primary "
                  : "border-transparent text-muted dark:text-white dark:text-opacity-50"
              } border-b-2 pb-2 cursor-pointer `}
            >
              {item}
            </div>
          );
        })}
      </div> */}
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <OverviewItem
          value={stats.activeSSPCampaigns}
          label={"Active SSP Campaigns"}
          actionTitle={"View Report"}
          action={() => {}}
          icon={<LuPanelRightInactive />}
        />
        <OverviewItem
          value={stats.activeDSPCampaigns}
          label={"Active DSP Campaigns"}
          actionTitle={"View Report"}
          action={() => {}}
          icon={<LuPanelRightInactive />}
        />
        <OverviewItem
          value={stats.users}
          label={"System Users"}
          actionTitle={"View users"}
          action={() => {}}
          icon={<TbCashRegister />}
        />
        <OverviewItem
          value={stats.agencies}
          label={"Agencies"}
          actionTitle={"View Report"}
          action={() => {}}
          icon={<RiAdvertisementLine />}
        />
      </div>

      <div className="flex flex-col md:flex-row space-x-0 space-y-4 md:space-y-0 md:space-x-4 mt-4">
        <div className="w-full md:w-8/12 bg-white py-8 rounded-xl  p-5">
          <div className="">
            <h1 className="font-bold text-2xl">Usage Trend</h1>
            <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
              Daily users sessions overtime
            </p>
            <TimeseriesChart
              chartType={"bar"}
              xaxis={stats.logsStats.map((item) => item.loggedAt)}
              yaxis={stats.logsStats.map((item) => item.count)}
            />
          </div>
        </div>
        <div className=" w-full md:w-4/12 bg-white py-8 rounded-xl  p-5">
          <h1 className="font-bold text-2xl">Users Distribution</h1>
          <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
            System users distribution
          </p>
          <div className="mt-2">
            <DonutChart
              data={[
                stats.publishers,
                stats.advertisers,
                stats.influencers,
                stats.agencyUsers,
                stats.administrators,
              ]}
              labels={[
                "Publishers",
                "Advertisers",
                "Influencers",
                "Agency Users",
                "Administrators",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
