import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import TimeseriesChart from "../../components/charts/TimeseriesChart";
import { usage } from "../../utils/constants";
import { RiAdvertisementLine, RiEarthLine } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import { LuPanelRightInactive } from "react-icons/lu";
import OverviewItem from "../../components/overviewItem";
import PieChart from "../../components/charts/pieChart";
import DonutChart from "../../components/charts/donutChart";
import { BsGraphUpArrow } from "react-icons/bs";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAdsClick,
} from "react-icons/md";
import GroupedBarChart from "../../components/charts/groupbarChart";
import HorizontalBarChart from "../../components/charts/horizontalBarChart";
import { useNavigate } from "react-router-dom";
import { getPublisherStats } from "../../controllers/statsController";
import { PublisherContext, UserContext } from "../../layouts/dashboardLayout";
import Loader from "../../components/loader";
import { GrMoney } from "react-icons/gr";
import { PiHandWithdraw } from "react-icons/pi";

const PublisherOverviewPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);
  const { revenue, setRevenue } = useContext(PublisherContext);
  useEffect(() => {
    getPublisherStats(user.uuid).then((response) => {
      console.log("data", response.data.body);
      setLoading(false);
      setStats(response.data.body);
      setRevenue(response.data.body.balance);
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Overview</h1>
          <p className="text-base text-muted dark:text-white dark:text-opacity-50">
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
            Generate Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <OverviewItem
          value={stats.zones}
          label={"Zones"}
          actionTitle={"View Zones"}
          action={() => {}}
          icon={<LuPanelRightInactive />}
        />
        <OverviewItem
          value={`${stats.revenue}`}
          label={"Revenue (TZS)"}
          actionTitle={"View Stats"}
          action={() => {}}
          icon={<GrMoney />}
        />
        <OverviewItem
          value={stats.paid}
          label={"Withdawn (TZS)"}
          actionTitle={"View Report"}
          action={() => {}}
          icon={<PiHandWithdraw />}
        />
        <OverviewItem
          value={stats.balance}
          label={"Balance (TZS)"}
          actionTitle={"View Stats"}
          action={() => {}}
          icon={<MdOutlineAccountBalanceWallet />}
        />
      </div>

      <div className="flex space-x-4 mt-4">
        <div className="w-8/12 bg-white py-8 rounded-xl  p-5">
          <div className="">
            <h1 className="font-bold text-2xl">Zones earnings comparison</h1>
            <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
              Comparison of zones earnings
            </p>
            <HorizontalBarChart
              data1={stats.zonesStats.map((item) => item.revenue)}
              label1={"Earnings"}
              label2={" "}
              categories={stats.zonesStats.map((item) => item.zone)}
              title={""}
            />
          </div>
        </div>
        <div className="w-4/12 bg-white py-8 rounded-xl  p-5">
          <h1 className="font-bold text-2xl">Zones distribution</h1>
          <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
            Website and number of zones they have
          </p>
          <div className="mt-6">
            <DonutChart
              data={stats.websiteZones.map((item) => item.zones)}
              labels={stats.websiteZones.map((item) => item.website)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherOverviewPage;
