import { useContext, useEffect, useState } from "react";
import { TbCashRegister } from "react-icons/tb";
import OverviewItem from "../../components/overviewItem";
import { BsGraphUpArrow, BsInstagram } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import AdvertisersPage from "../accounts/advertisersPage";
import { getAgencyOverviewStats } from "../../controllers/statsController";
import { UserContext } from "../../layouts/dashboardLayout";
import Loader from "../../components/loader";

const AgencyOverviewPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    getAgencyOverviewStats(user.AgencyUser.Agency.uuid).then((res) => {
      console.log(res.data);
      setLoading(false);
      setData(res.data.body);
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl 2xl:text-3xl font-bold">
            {user.AgencyUser.Agency.name}
          </h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Overview stats for {user.AgencyUser.Agency.name}
          </p>
        </div>

        <div>
          <button className="py-2 rounded-lg bg-primary text-white  px-4 font-bold">
            View Advertisers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <OverviewItem
          value={data.activeCampaigns}
          label={"Active Campaigns"}
          actionTitle={"View Campaigns"}
          action={() => {}}
          icon={<TbCashRegister />}
        />
        <OverviewItem
          value={data.campaigns}
          label={"Campaigns"}
          actionTitle={"View Campaigns"}
          action={() => {}}
          icon={<BsGraphUpArrow />}
        />
        <OverviewItem
          value={data.agencyUsers}
          label={"Users"}
          actionTitle={"View Users"}
          action={() => {}}
          icon={<HiOutlineUsers />}
        />
        <OverviewItem
          value={data.agencyAdvertisers}
          label={"Advertisers"}
          actionTitle={"View Advertisers"}
          action={() => {}}
          icon={<BsInstagram />}
        />
      </div>

      <AdvertisersPage />
    </div>
  );
};

export default AgencyOverviewPage;
