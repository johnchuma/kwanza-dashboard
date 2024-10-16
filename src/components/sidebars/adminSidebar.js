import { AiOutlineDashboard } from "react-icons/ai";
import SidebarItem from "../sidebarItem";
import { SiGoogleadsense } from "react-icons/si";
import { LiaBuysellads, LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbCashRegister, TbLogs, TbReport } from "react-icons/tb";
import { BsBox2, BsInstagram, BsSignpost2 } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";
import { MdPublic } from "react-icons/md";
import { RiAdvertisementLine, RiEarthLine } from "react-icons/ri";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { IoMdOptions } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";

const AdminSidebar = () => {
  return (
    <div className="px-4 justify-between flex flex-col h-screen">
      <div>
        <h1 className="mt-8 font-bold text-3xl 2xl:text-3xl px-4">Kwanza</h1>
        {/* <img src="/logo.svg" className="h-10 mt-8" /> */}
        <div className="pt-8">
          <SidebarItem
            icon={<LuLayoutDashboard />}
            title={"Overview"}
            path="/"
          />
        </div>
        <div className="pt-5">
          <h1 className="font-bold text-xs text-muted dark:text-mutedLight dark:text-white dark:text-opacity-80 mb-2">
            ACCOUNTS
          </h1>
          <SidebarItem icon={<LuUsers />} title={"Users"} path="/users" />
          <SidebarItem
            icon={<BsInstagram />}
            title={"Influencers"}
            path="/influencers"
          />
          <SidebarItem
            icon={<RiEarthLine />}
            title={"Publishers"}
            path="/publishers"
          />

          <SidebarItem icon={<BsBox2 />} title={"Agencies"} path="/agencies" />
        </div>

        <div className="pt-5">
          <h1 className="font-bold text-xs text-muted dark:text-mutedLight dark:text-white dark:text-opacity-80 mb-2">
            REPORTS
          </h1>

          <SidebarItem
            icon={<LiaFileInvoiceDollarSolid />}
            title={"Publisher's Invoices"}
            path="/invoices"
          />
        </div>
        <div className="pt-5">
          <h1 className="font-bold text-xs text-muted dark:text-mutedLight dark:text-white dark:text-opacity-80 mb-2">
            MANAGEMENT
          </h1>

          <SidebarItem icon={<TbLogs />} title={"Logs"} path="/logs" />

          <SidebarItem
            icon={<IoMdOptions />}
            title={"Website Categories"}
            path="/website-categories"
          />
          <SidebarItem
            icon={<SlSettings />}
            title={"Settings"}
            path="/settings"
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

export default AdminSidebar;
