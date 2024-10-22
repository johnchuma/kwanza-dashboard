import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import TimeseriesChart from "../../components/charts/TimeseriesChart";
import { usage } from "../../utils/constants";
import { RiAdvertisementLine, RiEarthLine } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import { LuChevronDown, LuPanelRightInactive } from "react-icons/lu";
import OverviewItem from "../../components/overviewItem";
import PieChart from "../../components/charts/pieChart";
import DonutChart from "../../components/charts/donutChart";
import { BsGraphUpArrow, BsSignpost2 } from "react-icons/bs";
import { MdAdsClick, MdOutlineAdsClick } from "react-icons/md";
import GroupedBarChart from "../../components/charts/groupbarChart";
import { getAdvertiserStats } from "../../controllers/statsController";
import { UserContext } from "../../layouts/dashboardLayout";
import Loader from "../../components/loader";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { useParams } from "react-router-dom";
import { useGetParams } from "../../utils/getParams";
import Back from "../../components/back";

const AdvertiserOverviewPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCampaignsOption, setShowCampaignsOption] = useState(false);
  const [stats, setStats] = useState(null);
  const { user } = useContext(UserContext);
  const [type, setType] = useState("DSP");
  const params = useGetParams();
  useEffect(() => {
    let path = `${params.uuid || user.uuid}/?type=${type}`;
    getAdvertiserStats(path).then((response) => {
      setLoading(false);
      console.log(response.data.body);
      setStats(response.data.body);
    });
  }, [type]);

  const dropdownRef = useRef(null);
  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowCampaignsOption(false);
    });
  }, [dropdownRef]);
  return loading ? (
    <Loader />
  ) : (
    <div>
      {params.uuid && <Back />}
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Overview</h1>
          <p className="text-sm text-muted dark:text-mutedLight">
            Campaigns data overview
          </p>
        </div>
        <div>
          <div className="relative z-0">
            <button
              onClick={() => {
                setShowCampaignsOption(true);
              }}
              className="py-2  flex items-center space-x-2 z-10 rounded-lg  bg-primary text-white  px-4 font-bold"
            >
              <h1>{type} Campaigns</h1>
              <p className="text-2xl">
                <LuChevronDown />
              </p>
            </button>
            {showCampaignsOption && (
              <div
                ref={dropdownRef}
                className="absolute px-4 font-semibold z-0 right-0 top-12 py-4 shadow-lg text-muted rounded-lg bg-white"
              >
                <div className="space-y-3">
                  {[
                    { title: "DSP", icon: <MdAdsClick /> },
                    { title: "SSP", icon: <BsSignpost2 /> },
                  ].map((item) => {
                    return (
                      <button
                        onClick={() => {
                          setType(item.title);
                          setShowCampaignsOption(false);
                        }}
                        className="hover:bg-lightBackground z-0 flex items-center space-x-2 hover:text-primary transition-all duration-300"
                      >
                        {item.icon}
                        <div>{item.title} campaign</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <OverviewItem
          value={stats.campaigns}
          label={"Campaigns"}
          actionTitle={"View Campaigns"}
          action={() => {}}
          icon={<LuPanelRightInactive />}
        />
        <OverviewItem
          value={stats.impressions}
          label={"Impressions"}
          actionTitle={"View Distribution"}
          action={() => {}}
          icon={<BsGraphUpArrow />}
        />
        <OverviewItem
          value={stats.clicks}
          label={"Clicks"}
          actionTitle={"View Distribution"}
          action={() => {}}
          icon={<MdOutlineAdsClick />}
        />
        <OverviewItem
          value={"$" + stats.spent}
          label={"Spent"}
          actionTitle={"View Report"}
          action={() => {}}
          icon={<TbCashRegister />}
        />
      </div>

      <div className="flex space-x-4 mt-4">
        <div className="w-8/12 bg-white dark:bg-darkLight py-8 rounded-xl  p-5">
          <div className="">
            <h1 className="font-bold text-2xl">Campaign Reports</h1>
            <p className="text-sm text-muted dark:text-mutedLight">
              Comparison of campaigns impressions
            </p>
            <GroupedBarChart
              data1={stats.campaignsStats.map((item) => item.impressions)}
              data2={stats.campaignsStats.map((item) => item.clicks)}
              label1={"Impressions"}
              label2={"Clicks"}
              categories={stats.campaignsStats.map((item) => item.name)}
              title={""}
            />
          </div>
        </div>
        <div className="w-4/12 bg-white dark:bg-darkLight py-8 rounded-xl  p-5">
          <h1 className="font-bold text-2xl">Campaigns Spents</h1>
          <p className="text-sm text-muted dark:text-mutedLight">
            Campaign Spents comparison
          </p>
          <div className="mt-6">
            <DonutChart
              data={stats.campaignsStats.map((item) => item.spent)}
              labels={stats.campaignsStats.map((item) => item.name)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserOverviewPage;
