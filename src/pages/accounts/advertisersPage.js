import { useContext, useEffect, useRef, useState } from "react";
import {
  deleteUser,
  getAdvertisers,
  getUsers,
} from "../../controllers/userController";
import Spinner from "../../components/spinner";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../../components/sidebarItem";
import {
  AiOutlineDashboard,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUser,
} from "react-icons/ai";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { HiDotsVertical } from "react-icons/hi";
import { BsPerson, BsSignpost2 } from "react-icons/bs";
import { LiaBuysellads } from "react-icons/lia";
import { useGetParams } from "../../utils/getParams";
import Back from "../../components/back";
import toast from "react-hot-toast";
import { UserContext } from "../../layouts/dashboardLayout";

const AdvertisersPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  const params = useGetParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
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
    let uuid = params.uuid || user.AgencyUser.Agency.uuid;
    console.log("UUID", uuid);
    let path = `agency/${uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    getAdvertisers(path).then((response) => {
      console.log(response.data.body);
      const rows = response.data.body.rows;
      const count = response.data.body.count;
      setData(rows);
      setCount(count);
      setLoading(false);
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      {params.uuid && (
        <div>
          {user.role != "agency user" && <Back />}

          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-4xl 2xl:text-3xl font-bold">Advertisers</h1>
              <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
                Manage Advertisers Below
              </p>
            </div>
            <button
              onClick={() => {
                navigate(`/add-user/?role=advertiser&uuid=${params.uuid}`);
              }}
              className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
            >
              Add Advertiser
            </button>
          </div>
        </div>
      )}
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-black rounded-t-2xl bg-opacity-40 dark:bg-opacity-10 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-lg">Advertisers ({count})</h1>
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
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Name
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Email
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Phone
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  SSP Campaigns
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  DSP Campaigns
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50"></th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item) => {
                return (
                  <tr key={item.uuid}>
                    <td className="text-start py-4 hover:text-primary transition-all duration-200">
                      <button
                        onClick={() => {
                          navigate(`/advertiser-overview/?uuid=${item.uuid}`);
                        }}
                      >
                        {item.name}
                      </button>
                    </td>
                    <td className="text-start py-4">{item.email}</td>
                    <td className="text-start py-4">{item.phone}</td>
                    <td className="text-start py-4">{item.sspCampaigns}</td>
                    <td className="text-start py-4">{item.dspCampaigns}</td>
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
                            <div ref={dropdownRef} className="popup-style">
                              <SidebarItem
                                icon={<AiOutlineDashboard />}
                                path={`/advertiser-overview/?uuid=${item.uuid}`}
                                title={"Overview"}
                              />
                              <SidebarItem
                                icon={<BsPerson />}
                                path={`/audiences/?uuid=${item.uuid}`}
                                title={"Audiences"}
                              />
                              <SidebarItem
                                icon={<BsSignpost2 />}
                                path={`/ssp-campaigns/?uuid=${item.uuid}`}
                                title={`SSP Campaigns`}
                              />
                              <SidebarItem
                                icon={<LiaBuysellads />}
                                path={`/dsp-campaigns?uuid=${item.uuid}`}
                                title={"DSP Campaigns"}
                              />
                              <SidebarItem
                                icon={<AiOutlineDelete />}
                                onClick={() => {
                                  deleteUser(item.uuid).then((res) => {
                                    getData();
                                    toast.success("Deleted successfully");
                                  });
                                }}
                                title={"Delete"}
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
    </div>
  );
};

export default AdvertisersPage;
