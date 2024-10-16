import { AiOutlineDashboard } from "react-icons/ai";
import SidebarItem from "../sidebarItem";
import { SiGoogleadsense } from "react-icons/si";
import { LiaBuysellads } from "react-icons/lia";
import { TbCashRegister, TbLogs, TbReport } from "react-icons/tb";
import { BsBox2, BsGlobe, BsInstagram, BsSignpost2 } from "react-icons/bs";
import { TiChartLineOutline, TiSocialInstagram } from "react-icons/ti";
import { MdOutlinePrivacyTip, MdPublic } from "react-icons/md";
import {
  Ri24HoursLine,
  RiAdvertisementLine,
  RiEarthLine,
  RiFolderChartLine,
} from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { IoMdOptions } from "react-icons/io";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { PiChartDonutDuotone, PiInvoice } from "react-icons/pi";
import { UserContext } from "../../layouts/dashboardLayout";
import { useContext } from "react";

const PublisherSidebar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="px-4 justify-between flex flex-col h-screen">
      <div>
        <h1 className="mt-8 font-bold text-3xl 2xl:text-3xl px-4">Kwanza</h1>
        {/* <img src="/logo.svg" className="h-10 mt-8" /> */}
        <div className="pt-8">
          <SidebarItem
            icon={<AiOutlineDashboard />}
            title={"Overview"}
            path="/"
          />
        </div>
        <div className="pt-5">
          <h1 className="font-bold text-xs text-muted dark:text-mutedLight dark:text-opacity-80 mb-2">
            MAIN
          </h1>
          <SidebarItem
            icon={<BsGlobe />}
            title={"Websites"}
            path={`/websites/?uuid=${user.uuid}`}
          />

          <SidebarItem
            icon={<PiInvoice />}
            title={"Invoices"}
            path="/invoices"
          />
        </div>

        <div className="pt-5">
          <h1 className="font-bold text-xs text-muted dark:text-mutedLight dark:text-white dark:text-opacity-80 mb-2">
            REPORTS
          </h1>
          <SidebarItem
            icon={<TiChartLineOutline />}
            title={"Website Reports"}
            path="/admin-campaign-report"
          />
          <SidebarItem
            icon={<RiFolderChartLine />}
            title={"Zones Reports"}
            path="/admin-revenue-report"
          />
          <SidebarItem
            icon={<PiChartDonutDuotone />}
            title={"Revenue Reports"}
            path="/admin-revenue-report"
          />
        </div>
        <div className="pt-5">
          <h1 className="font-bold text-xs text-muted dark:text-mutedLight dark:text-white dark:text-opacity-80 mb-2">
            LEGAL DOCUMENTS
          </h1>
          <SidebarItem
            icon={<MdOutlinePrivacyTip />}
            title={"Privacy Policy"}
            path="/privacy-policy"
          />
          <SidebarItem
            icon={<IoDocumentAttachOutline />}
            title={"Terms of use"}
            path="/terms-of-use"
          />
        </div>
      </div>
      {/* <button className="bg-[#3B3C65]  text-base font-semibold text-white rounded-xl py-[12px] flex justify-center items-center space-x-3  mb-8">
        <div className="text-xl">
          <FiBookOpen />
        </div>
        <div>Terms of use</div>
      </button> */}
    </div>
  );
};

export default PublisherSidebar;
