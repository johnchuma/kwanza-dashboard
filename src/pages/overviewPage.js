import { useContext, useState } from "react";

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
