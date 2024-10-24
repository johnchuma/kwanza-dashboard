import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiAdvertisementLine, RiEarthLine } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import { LuPanelRightInactive } from "react-icons/lu";
import TimeseriesChart from "../../components/charts/TimeseriesChart";
import { usage } from "../../utils/constants";
import PieChart from "../../components/charts/pieChart";
import OverviewItem from "../../components/overviewItem";
import {
  getPublisherRevenueStats,
  getPublisherStats,
} from "../../controllers/statsController";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../layouts/dashboardLayout";
import Loader from "../../components/loader";
import { GrMoney } from "react-icons/gr";

const PublisherRevenueReport = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    getPublisherRevenueStats(user.uuid).then((response) => {
      console.log("data", response.data.body);
      setLoading(false);
      setStats(response.data.body);
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Revenue Report</h1>
        <p className="text-base text-muted dark:text-white dark:text-opacity-50">
          Daily usage and engagement data
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <OverviewItem
          value={stats.thisWeekRevenue + " TZS"}
          label={"This Week Revenue"}
          actionTitle={"View Stats"}
          action={() => {}}
          icon={<GrMoney />}
        />
        <OverviewItem
          value={stats.thisMonthRevenue + " TZS"}
          label={"This Month Revenue"}
          actionTitle={"View Zones"}
          action={() => {}}
          icon={<GrMoney />}
        />
        <OverviewItem
          value={stats.thisYearRevenue + " TZS"}
          label={"This Year Revenue"}
          actionTitle={"View Zones"}
          action={() => {}}
          icon={<GrMoney />}
        />
        <OverviewItem
          value={stats.totalRevenue + " TZS"}
          label={"Total Revenue"}
          actionTitle={"View Distributions"}
          action={() => {}}
          icon={<GrMoney />}
        />
      </div>
      <div className="flex space-x-4 mt-4">
        <div className="w-8/12 h-full">
          <div className="bg-white py-6 rounded-xl  p-5">
            <h1 className="font-bold text-2xl">Revenue Trend</h1>
            <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
              Revenue earnings trends
            </p>
            <TimeseriesChart
              chartType={"bar"}
              xaxis={stats.revenueTrend.map((item) => item.createdAt)}
              yaxis={stats.revenueTrend.map((item) => item.revenue)}
            />
          </div>
        </div>

        <div className="bg-white py-6    w-4/12 rounded-xl p-5">
          <h1 className="font-bold text-2xl">Zones Distribution</h1>
          <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
            Zones revenue distribution
          </p>

          <PieChart
            data={stats.zonesStats.map((item) => item.revenue)}
            labels={stats.zonesStats.map((item) => item.zone)}
          />
        </div>
      </div>
    </div>
  );
};

export default PublisherRevenueReport;
