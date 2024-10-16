import { useContext, useEffect, useRef, useState } from "react";
import { getPublishers, getUsers } from "../../controllers/userController";
import Spinner from "../../components/spinner";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../../components/sidebarItem";
import { BsSignpost2 } from "react-icons/bs";
import { LiaBuysellads } from "react-icons/lia";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { HiDotsVertical } from "react-icons/hi";
import { ImEarth } from "react-icons/im";
import { GrStatusPlaceholder } from "react-icons/gr";
import Back from "../../components/back";
import { getParams, useGetParams } from "../../utils/getParams";
import { getWebsite, getWebsites } from "../../controllers/websitesController";
import moment from "moment";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineImport,
} from "react-icons/ai";
import { getZones } from "../../controllers/zonesController";
import { getSSPCampaigns } from "../../controllers/sspCampaignController";
import { UserContext } from "../../layouts/dashboardLayout";
import {
  deleteDSPCampaign,
  getDSPCampaigns,
} from "../../controllers/dspCampaignController";
import {
  getDSPCampaignStats,
  getSSPCampaignStats,
} from "../../controllers/statsController";
import DoubleTimeseriesChart from "../../components/doubleTimeseriesChart";
import { RiAdvertisementLine } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import { LuPanelRightInactive } from "react-icons/lu";
import OverviewItem from "../../components/overviewItem";
import TimeseriesChart from "../../components/TimeseriesChart";

const SSPCampaignReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const params = useGetParams();

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    let path = `${params.uuid}`;
    getSSPCampaignStats(path).then((response) => {
      console.log(response.data.body);
      const data = response.data.body;
      setData(data);
      setLoading(false);
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      <Back />
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl 2xl:text-3xl font-bold">Campaign Report</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            DSP campaign report
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4 mb-4">
        <OverviewItem
          value={Math.ceil(data.impressions)}
          label={"Impressions"}
          actionTitle={"View Report"}
          action={() => {}}
          icon={<LuPanelRightInactive />}
        />
        <OverviewItem
          value={Math.ceil(data.clicks)}
          label={"Clicks"}
          actionTitle={"View Report"}
          action={() => {}}
          icon={<LuPanelRightInactive />}
        />
        <OverviewItem
          value={data.totalCTR.toFixed(2)} // Round to 2 decimal places
          label={"CTR"}
          actionTitle={"View users"}
          action={() => {}}
          icon={<TbCashRegister />}
        />
        <OverviewItem
          value={`0`}
          label={"Spent"}
          actionTitle={"View Report"}
          action={() => {}}
          icon={<RiAdvertisementLine />}
        />
      </div>
      <div className="grid gap-4 grid-cols-2"></div>
      <div className="bg-white p-6 rounded-xl mb-4">
        <h1 className="font-bold text-2xl">Impressions and CTR</h1>
        <p className="text-sm text-muted dark:text-mutedLight pb-6">
          Impresions and CTR data overtime
        </p>
        <DoubleTimeseriesChart
          ylabel1={"Impressions"}
          chartType={"line"}
          ylabel2={"CTR"}
          yaxis1={data.report.map((item) => item.impressions)}
          xaxis={data.report.map((item) => item.createdAt)}
          yaxis2={data.report.map((item) => item.CTR)}
        />
      </div>
      <div className="bg-white p-6 rounded-xl mb-4">
        <h1 className="font-bold text-2xl">Clicks</h1>
        <p className="text-sm text-muted dark:text-mutedLight pb-6">
          Clicks overtime
        </p>
        <TimeseriesChart
          ylabel={"Clicks"}
          chartType={"line"}
          yaxis={data.report.map((item) => item.clicks)}
          xaxis={data.report.map((item) => item.createdAt)}
        />
      </div>
    </div>
  );
};

export default SSPCampaignReport;
