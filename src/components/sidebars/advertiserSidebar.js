import { AiOutlineDashboard } from "react-icons/ai";
import SidebarItem from "../sidebarItem";
import { SiGoogleadsense } from "react-icons/si";
import { LiaBuysellads } from "react-icons/lia";
import { TbCashRegister, TbLogs, TbReport } from "react-icons/tb";
import { BsBox2, BsInstagram, BsSignpost2 } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";
import {
  MdAdsClick,
  MdOutlinePrivacyTip,
  MdPeople,
  MdPublic,
} from "react-icons/md";
import {
  RiAdvertisementLine,
  RiEarthLine,
  RiSecurePaymentLine,
} from "react-icons/ri";
import { LuUsers, LuUsers2 } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { IoMdOptions } from "react-icons/io";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { useContext } from "react";
import { UserContext } from "../../layouts/dashboardLayout";
import { GrBarChart, GrPlan } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import SidebarLegalSection from "../legal documentation/sidebarLegalSection";

const AdvertiserSidebar = () => {
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
          <h1 className="font-bold text-xs text-muted dark:text-mutedLight dark:text-white dark:text-opacity-80 mb-2">
            CAMPAIGNS
          </h1>
          <SidebarItem
            icon={<BsSignpost2 />}
            title={"SSP Campaigns"}
            path={`/ssp-campaigns/?uuid=${user.uuid}`}
          />
          <SidebarItem
            icon={<MdAdsClick />}
            title={"DSP Campaigns"}
            path={`/dsp-campaigns/?uuid=${user.uuid}`}
          />
          <SidebarItem
            icon={<LuUsers2 />}
            title={"Audiences"}
            path={`/audiences/?uuid=${user.uuid}`}
          />
        </div>

        <div className="pt-5">
          <h1 className="font-bold text-xs text-muted dark:text-mutedLight dark:text-white dark:text-opacity-80 mb-2">
            OTHERS
          </h1>
          <SidebarItem
            icon={<RiSecurePaymentLine />}
            title={"Payments Report"}
            path="/advertiser-payments-report"
          />
          <SidebarItem
            icon={<SlCalender />}
            title={"Planning"}
            path="/planning"
          />
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

export default AdvertiserSidebar;
