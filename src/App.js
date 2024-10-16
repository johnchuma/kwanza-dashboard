import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/dashboardLayout";
import LoginPage from "./pages/auth/loginPage";
import RegisterPage from "./pages/auth/registerPage";
import ConfirmPage from "./pages/auth/confirmPage";
import { Toaster } from "react-hot-toast";
import MyAccountInfo from "./pages/auth/myAccountInfo";
import UsersPage from "./pages/accounts/usersPage";
import AddUser from "./pages/accounts/addUser";
import PublishersPage from "./pages/accounts/publishersPage";
import InfluencersPage from "./pages/accounts/influencersPage";
import AdvertisersPage from "./pages/accounts/advertisersPage";
import AgenciesPage from "./pages/accounts/agenciesPage";
import AddAgency from "./pages/accounts/addAgency";
import AgencyUsersPage from "./pages/accounts/agencyUsersPage";
import AddAgencyUser from "./pages/accounts/addAgencyUser";
import ZonesPage from "./pages/sspCampaigns/zonesPage";
import WebsitePage from "./pages/sspCampaigns/websitesPage";
import WebsiteCategoriesPage from "./pages/management/websiteCategoriesPage";
import AddWebsiteCategory from "./pages/management/addWebsiteCategory";
import AddWebsite from "./pages/sspCampaigns/addWebsite";
import AddZone from "./pages/sspCampaigns/addZone";
import SSPCampaignsPage from "./pages/sspCampaigns/sspCampaignsPage";
import AddSSPCampaignPage from "./pages/sspCampaigns/addSSPCampaignPage";
import AddSSPCampaign from "./pages/sspCampaigns/addSSPCampaignPage";
import SSPCampaignBanners from "./pages/sspCampaigns/sspCampaignBanners";
import AddSSPCampaignBanner from "./pages/sspCampaigns/addSSPCampaignBanner";
import LinkBannerWithZones from "./pages/sspCampaigns/linkBannerWithZones";
import LogsPage from "./pages/management/logsPage";
import AdminRevenueReport from "./pages/reports/adminRevenueReport";
import AdminCampaignReport from "./pages/reports/adminCampaignReport";
import OverviewPage from "./pages/overviewPage";
import AudiencePage from "./pages/dspCampaigns/audiencesPage";
import AddAudiencePage from "./pages/dspCampaigns/addAudiencesPage";
import AdminInvoices from "./pages/reports/adminInvoices";
import AddInvoice from "./pages/reports/addInvoice";
import SettingsPage from "./pages/management/settingsPage";
import DSPCampaignsPage from "./pages/dspCampaigns/dspCampaignsPage";
import AddDSPCampaign from "./pages/dspCampaigns/addDSPCampaignPage";
import DSPCampaignBanners from "./pages/dspCampaigns/dspCampaignBanners";
import AddDSPCampaignBanner from "./pages/dspCampaigns/addDSPCampaignBanner";
import DSPCampaignReport from "./pages/dspCampaigns/dspCampaignReports";
import SSPCampaignReport from "./pages/sspCampaigns/sspCampaignReports";
import ZoneBannersPage from "./pages/sspCampaigns/zoneBannersPage";

function App() {
  return (
    <div className="font-google-fonts">
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/confirm/:identifier" element={<ConfirmPage />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/my-account" element={<MyAccountInfo />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/publishers" element={<PublishersPage />} />
            <Route path="/influencers" element={<InfluencersPage />} />
            <Route path="/audiences" element={<AudiencePage />} />
            <Route path="/add-audience" element={<AddAudiencePage />} />
            <Route path="/advertisers" element={<AdvertisersPage />} />
            <Route path="/agencies" element={<AgenciesPage />} />
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/zone-banners" element={<ZoneBannersPage />} />
            <Route path="/websites" element={<WebsitePage />} />
            <Route path="/add-website" element={<AddWebsite />} />
            <Route path="/add-zone" element={<AddZone />} />
            <Route
              path="/website-categories"
              element={<WebsiteCategoriesPage />}
            />
            <Route
              path="/add-website-category"
              element={<AddWebsiteCategory />}
            />
            <Route path="/ssp-campaigns" element={<SSPCampaignsPage />} />
            <Route path="/dsp-campaigns" element={<DSPCampaignsPage />} />
            <Route path="/invoices" element={<AdminInvoices />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/add-invoice" element={<AddInvoice />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/add-ssp-campaign" element={<AddSSPCampaign />} />
            <Route path="/add-dsp-campaign" element={<AddDSPCampaign />} />
            <Route path="/add-agency" element={<AddAgency />} />
            <Route path="/agency/" element={<AddAgency />} />
            <Route path="/logs/" element={<LogsPage />} />
            <Route
              path="/admin-revenue-report/"
              element={<AdminRevenueReport />}
            />
            <Route
              path="/admin-campaign-report/"
              element={<AdminCampaignReport />}
            />
            <Route
              path="/link-banner-with-zones"
              element={<LinkBannerWithZones />}
            />
            <Route
              path="/ssp-campaign-banners"
              element={<SSPCampaignBanners />}
            />
            <Route
              path="/dsp-campaign-banners"
              element={<DSPCampaignBanners />}
            />
            <Route
              path="/dsp-campaign-report"
              element={<DSPCampaignReport />}
            />
            <Route
              path="/ssp-campaign-report"
              element={<SSPCampaignReport />}
            />
            <Route
              path="/add-ssp-campaign-banner"
              element={<AddSSPCampaignBanner />}
            />
            <Route
              path="/add-dsp-campaign-banner"
              element={<AddDSPCampaignBanner />}
            />
            <Route path="/add-agency-user/:uuid" element={<AddAgencyUser />} />
            <Route path="/add-agency-user/:uuid" element={<AddAgencyUser />} />
            <Route path="/agency/:uuid/users" element={<AgencyUsersPage />} />
            <Route path="/agency/advertisers" element={<AdvertisersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
