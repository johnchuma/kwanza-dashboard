import { AiOutlineUsb } from "react-icons/ai";
import OverviewItem from "../../components/overviewItem";
import HorizontalBarChart from "../../components/charts/horizontalBarChart";
import GroupedBarChart from "../../components/charts/groupbarChart";
import PieChart from "../../components/charts/pieChart";
import RadialBarChart from "../../components/charts/radialBar";
import { FaRegCheckSquare } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiEmptyLight } from "react-icons/pi";
import { RiCloudOffLine } from "react-icons/ri";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import {
  getAgencyAdvertisersOverviewStats,
  getAgencyOverviewStats,
} from "../../controllers/statsController";
import { UserContext } from "../../layouts/dashboardLayout";
import Loader from "../../components/loader";
import DonutChart from "../../components/charts/donutChart";

const AgencyAdvertisersReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    getAgencyAdvertisersOverviewStats(user.AgencyUser.Agency.uuid).then(
      (res) => {
        console.log(res.data);
        setLoading(false);
        setData(res.data.body);
      }
    );
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl 2xl:text-3xl font-bold">
              Advertisers reports
            </h1>
            <p className="text-base text-muted dark:text-mutedLight">
              view all Advertisers reports below
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <OverviewItem
            icon={<HiOutlineStatusOnline />}
            label={"Active Advertisers"}
            value={data.activeAdvertisers}
            actionTitle={"View Advertisers"}
          />
          <OverviewItem
            icon={<RiCloudOffLine />}
            label={"Inactive Advertisers"}
            value={data.inactiveAdvertisers}
            actionTitle={"View Advertisers"}
          />
          <OverviewItem
            icon={<IoMdCheckmarkCircleOutline />}
            label={"With campaigns"}
            value={data.withCampaigns}
            actionTitle={"View Advertisers"}
          />
          <OverviewItem
            icon={<PiEmptyLight />}
            label={"No Campaigns"}
            value={data.noCampaigns}
            actionTitle={"View Advertisers"}
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <div className="w-8/12 bg-white rounded-xl p-6">
            <h1 className="font-bold text-2xl ">Advetisers campaigns spent</h1>
            <p className="text-sm text-muted dark:text-mutedLight">
              Amount that each advertiser has spent on their campaigns
            </p>
            <GroupedBarChart
              data2={data.advertiserCampaignsStats.map(
                (item) => item.SSPCampaignsSpent
              )}
              data1={data.advertiserCampaignsStats.map(
                (item) => item.DSPCampaignsSpent
              )}
              label2={"SSP campaigns"}
              label1={"DSP campaigns"}
              categories={data.advertiserCampaignsStats.map(
                (item) => item.advertiser
              )}
            />
          </div>
          <div className="w-4/12 bg-white rounded-xl p-4">
            <h1 className="font-bold text-2xl">Advertisers campaigns</h1>
            <p className="text-sm text-muted dark:text-mutedLight">
              Advertisers campaigns comparisons
            </p>
            <DonutChart
              data={data.advertiserCampaignsStats.map((item) => item.campaigns)}
              labels={data.advertiserCampaignsStats.map(
                (item) => item.advertiser
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyAdvertisersReport;
