import { useContext, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import TimeseriesChart from "../components/TimeseriesChart";
import { usage } from "../utils/constants";
import { RiAdvertisementLine, RiEarthLine } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import { LuPanelRightInactive } from "react-icons/lu";
import OverviewItem from "../components/overviewItem";
import PieChart from "../components/pieChart";
import DonutChart from "../components/donutChart";
import { UserContext } from "../layouts/dashboardLayout";
import AdminOverviewPage from "./overviews/adminOverviewPage";
import AdvertiserOverviewPage from "./overviews/advertiserOverviewPage";
import PublisherOverviewPage from "./overviews/publisherOverviewPage";
import AgencyOverviewPage from "./overviews/agencyOverviewPage";

const OverviewPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useContext(UserContext);
  switch (user.role) {
    case "admin":
      return <AdminOverviewPage />;
      break;
    case "advertiser":
      return <AdvertiserOverviewPage />;
      break;
    case "publisher":
      return <PublisherOverviewPage />;
      break;
    case "agency user":
      return <AgencyOverviewPage />;
      break;
    default:
      break;
  }
};

export default OverviewPage;
