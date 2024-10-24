import { AiOutlineDashboard } from "react-icons/ai";
import SidebarItem from "../sidebarItem";
import { SiGoogleadsense } from "react-icons/si";
import { LiaBuysellads } from "react-icons/lia";
import { TbCashRegister, TbLogs, TbReport } from "react-icons/tb";
import { BsBox2, BsInstagram, BsSignpost2 } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";
import { MdOutlinePrivacyTip, MdPublic } from "react-icons/md";
import {
  RiAdvertisementLine,
  RiBarChartHorizontalFill,
  RiEarthLine,
} from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { IoMdOptions } from "react-icons/io";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { useContext } from "react";
import { UserContext } from "../../layouts/dashboardLayout";
import SidebarLegalSection from "../legal documentation/sidebarLegalSection";

const AgencySidebar = () => {
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
          <h1 className="font-bold text-xs text-muted dark:text-white dark:text-opacity-50 dark:text-white dark:text-opacity-80 mb-2">
            ACCOUNTS
          </h1>
          <SidebarItem
            icon={<LuUsers />}
            title={"Agency Users"}
            path={`/agency/${user.AgencyUser.Agency.uuid}/users`}
          />
          <SidebarItem
            icon={<BsInstagram />}
            title={`Advertisers`}
            path={`/advertisers/?uuid=${user.AgencyUser.Agency.uuid}`}
          />
        </div>

        <div className="pt-5">
          <h1 className="font-bold text-xs text-muted dark:text-white dark:text-opacity-50 dark:text-white dark:text-opacity-80 mb-2">
            REPORTS
          </h1>
          <SidebarItem
            icon={<RiBarChartHorizontalFill />}
            title={"Advertisers Reports"}
            path="/agency-advertisers-report"
          />
          {/* <SidebarItem
            icon={<HiOutlineChartBarSquare />}
            title={"Campaigns Reports"}
            path="/admin-revenue-report"
          /> */}
        </div>
        <SidebarLegalSection />
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

export default AgencySidebar;
