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
  AiOutlineBarChart,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineImport,
  AiOutlineLineChart,
} from "react-icons/ai";
import { getZones } from "../../controllers/zonesController";
import {
  deleteSSPCampaign,
  getSSPCampaigns,
} from "../../controllers/sspCampaignController";
import { UserContext } from "../../layouts/dashboardLayout";
import {
  deleteDSPCampaign,
  getDSPCampaigns,
} from "../../controllers/dspCampaignController";
import NoData from "../../components/noData";

const SSPCampaignsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  const params = useGetParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowOptions(false);
    });
  }, [dropdownRef]);

  useEffect(() => {
    getData();
  }, [page, keyword]);
  const getData = () => {
    let path = `${params.uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    getSSPCampaigns(path).then((response) => {
      const rows = response.data.body.rows;
      const count = response.data.body.count;
      console.log(rows);
      setData(rows);
      setCount(count);
      setLoading(false);
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      {user.role != "advertiser" && <Back />}

      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl 2xl:text-3xl font-bold">SSP Campaigns</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Create SSP campaigns Below
          </p>
        </div>
        <button
          onClick={() => {
            navigate(`/add-ssp-campaign/?uuid=${params.uuid}`);
          }}
          className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
        >
          Add Campaign
        </button>
      </div>
      {data.length > 0 ? (
        <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
          <div className="bg-background dark:bg-darkLight rounded-t-2xl bg-opacity-40 px-6 items-center py-4 flex justify-between">
            <h1 className="font-bold text-lg">SSP campaigns ({count})</h1>
            <input
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className="search-style"
              placeholder="Search here"
            />
          </div>
          <div className="px-6 py-5">
            <table className="w-full text-base  ">
              <thead>
                <tr>
                  <th className="text-start text-muted dark:text-mutedLight">
                    Created At
                  </th>
                  <th className="text-start text-muted dark:text-mutedLight">
                    Type
                  </th>
                  <th className="text-start text-muted dark:text-mutedLight">
                    Name
                  </th>
                  <th className="text-start text-muted dark:text-mutedLight">
                    Impressions
                  </th>
                  <th className="text-start text-muted dark:text-mutedLight">
                    Clicks
                  </th>
                  <th className="text-start text-muted dark:text-mutedLight">
                    CTR
                  </th>
                  <th className="text-start text-muted dark:text-mutedLight">
                    Activate Time
                  </th>
                  <th className="text-start text-muted dark:text-mutedLight">
                    Expire Time
                  </th>
                  <th className="text-start text-muted dark:text-mutedLight"></th>
                </tr>
              </thead>
              <tbody className="mt-2">
                {data.map((item) => {
                  return (
                    <tr>
                      <td className="text-start py-4">
                        {moment(item.createdAt).format("yyy, MMM DD")}
                      </td>
                      <td className="text-start py-4">
                        {item.type == 0 ? "Remnant" : "Contract"}
                      </td>

                      <td className="text-start py-4">{item.name}</td>
                      <td className="text-start py-4">
                        {Math.ceil(item.totalImpressions)}
                      </td>
                      <td className="text-start py-4">
                        {Math.ceil(item.totalClicks)}
                      </td>
                      <td className="text-start py-4">
                        {(item.totalCTR || 0).toFixed(2)}
                      </td>
                      <td className="text-start py-4">
                        {moment(item.activateTime).format("yyy, MMM DD") ||
                          "infinity"}
                      </td>
                      <td className="text-start py-4">
                        {item.expireTime
                          ? moment(item.expireTime).format("yyy, MMM DD")
                          : "Infinity"}
                      </td>
                      <td className="text-start py-4">
                        <div className="relative">
                          <HiDotsVertical
                            className=" cursor-pointer"
                            onClick={() => {
                              if (showOptions == false) {
                                setSelectedItem(item);
                                setShowOptions(!showOptions);
                              }
                            }}
                          />
                          {showOptions == true &&
                            selectedItem.uuid == item.uuid && (
                              <div
                                ref={dropdownRef}
                                className="bg-white absolute rounded-xl top-4 shadow-lg z-30 right-0 w-56 px-2 py-4"
                              >
                                <SidebarItem
                                  icon={<AiOutlineLineChart />}
                                  path={`/ssp-campaign-report/?uuid=${item.uuid}`}
                                  title={"Reports"}
                                />
                                <SidebarItem
                                  icon={<AiOutlineImport />}
                                  path={`/ssp-campaign-banners/?uuid=${item.uuid}`}
                                  title={"Campaign Banners"}
                                />
                                <SidebarItem
                                  icon={<AiOutlineEdit />}
                                  path={`/edit-ssp-campaign/?uuid=${item.uuid}`}
                                  title={"Edit Campaign"}
                                />
                                <SidebarItem
                                  icon={<AiOutlineDelete />}
                                  onClick={() => {
                                    deleteSSPCampaign(item.uuid).then(
                                      (data) => {
                                        getData();
                                      }
                                    );
                                  }}
                                  title={"Delete Website"}
                                />
                              </div>
                            )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              limit={limit}
              count={count}
              setPage={setPage}
              page={page}
            />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default SSPCampaignsPage;
