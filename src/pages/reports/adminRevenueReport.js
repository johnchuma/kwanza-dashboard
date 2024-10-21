import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiAdvertisementLine, RiEarthLine } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import { LuPanelRightInactive } from "react-icons/lu";
import TimeseriesChart from "../../components/charts/TimeseriesChart";
import { usage } from "../../utils/constants";

const AdminRevenueReport = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Revenue Report</h1>
        <p className="text-base text-muted dark:text-mutedLight">
          Daily usage and engagement data
        </p>
      </div>
      <div className="flex space-x-6 mt-6">
        {[
          "From SSP Campaigns",
          "From DSP Campaigns",
          "From Traditional Campaigns",
        ].map((item, index) => {
          return (
            <div
              onClick={() => {
                setActiveTab(index);
              }}
              className={`${
                activeTab == index
                  ? "font-bold text-primary border-primary "
                  : "border-transparent text-muted dark:text-mutedLight"
              } border-b-2 pb-2 cursor-pointer `}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="bg-white w-full  rounded-xl ">
          <div className="flex space-x-3 px-5 py-3 items-center">
            <div className="w-4/12">
              <div className="size-16 rounded-full bg-primary bg-opacity-10 flex justify-center items-center text-2xl text-primary">
                <LuPanelRightInactive />
              </div>
            </div>
            <div>
              <h1 className="text-3xl">5</h1>
              <p className="text-muted dark:text-mutedLight">
                Active campaigns
              </p>
            </div>
          </div>
          <div className="border-t border-muted py-3 px-5 ">
            <div className="flex items-center space-x-3 cursor-pointer text-muted dark:text-mutedLight hover:text-primary">
              <h1 className="">View reports </h1>
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
        <div className="bg-white w-full  rounded-xl ">
          <div className="flex space-x-3 px-5 py-3 items-center">
            <div className="w-4/12">
              <div className="size-16 rounded-full bg-primary bg-opacity-10 flex justify-center items-center text-2xl text-primary">
                <TbCashRegister />
              </div>
            </div>
            <div>
              <h1 className="text-3xl">$20000</h1>
              <p className="text-muted dark:text-mutedLight">Revenue</p>
            </div>
          </div>
          <div className="border-t border-muted py-3 px-5 ">
            <div className="flex items-center space-x-3 cursor-pointer text-muted dark:text-mutedLight hover:text-primary">
              <h1 className="">View analytics </h1>
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
        <div className="bg-white w-full  rounded-xl ">
          <div className="flex space-x-3 px-5 py-3 items-center">
            <div className="w-4/12">
              <div className="size-16 rounded-full bg-primary bg-opacity-10 flex justify-center items-center text-2xl text-primary">
                <RiAdvertisementLine />
              </div>
            </div>
            <div>
              <h1 className="text-3xl">130</h1>
              <p className="text-muted dark:text-mutedLight">Advertisers</p>
            </div>
          </div>
          <div className="border-t border-muted py-3 px-5 ">
            <div className="flex items-center space-x-3 cursor-pointer text-muted dark:text-mutedLight hover:text-primary">
              <h1 className="">View analytics </h1>
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
        <div className="bg-white w-full  rounded-xl ">
          <div className="flex space-x-3 px-5 py-3 items-center">
            <div className="w-4/12">
              <div className="size-16 rounded-full bg-primary bg-opacity-10 flex justify-center items-center text-2xl text-primary">
                <RiEarthLine />
              </div>
            </div>
            <div>
              <h1 className="text-3xl">24</h1>
              <p className="text-muted dark:text-mutedLight">Publishers</p>
            </div>
          </div>
          <div className="border-t border-muted py-3 px-5 ">
            <div className="flex items-center space-x-3 cursor-pointer text-muted dark:text-mutedLight hover:text-primary">
              <h1 className="">View sites and zones report </h1>
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-12 rounded-xl mt-8 p-5">
        <h1 className="font-bold text-2xl">Usage Trend</h1>
        <p className="text-sm text-muted dark:text-mutedLight">
          Daily users sessions overtime
        </p>
        <TimeseriesChart
          xaxis={usage.map((item) => item.date)}
          yaxis={usage.map((item) => item.users)}
        />
      </div>
    </div>
  );
};

export default AdminRevenueReport;
