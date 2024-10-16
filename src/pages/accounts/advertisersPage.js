import { useEffect, useRef, useState } from "react";
import { getAdvertisers, getUsers } from "../../controllers/userController";
import Spinner from "../../components/spinner";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../../components/sidebarItem";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { HiDotsVertical } from "react-icons/hi";
import { BsPerson, BsSignpost2 } from "react-icons/bs";
import { LiaBuysellads } from "react-icons/lia";
import { useGetParams } from "../../utils/getParams";
import Back from "../../components/back";

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
  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowOptions(false);
    });
  }, [dropdownRef]);

  useEffect(() => {
    let path = `agency/${params.uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    getAdvertisers(path).then((response) => {
      console.log(response.data.body);
      const rows = response.data.body.rows;
      const count = response.data.body.count;
      setData(rows);
      setCount(count);
      setLoading(false);
    });
  }, [page, keyword]);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <Back />
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl 2xl:text-3xl font-bold">Advertisers</h1>
          <p className="text-base text-muted dark:text-mutedLight">
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
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-darkLight rounded-t-2xl bg-opacity-40 px-6 items-center py-4 flex justify-between">
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
                <th className="text-start text-muted dark:text-mutedLight">
                  Name
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Email
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Phone
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  SSP Campaigns
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  DSP Campaigns
                </th>
                <th className="text-start text-muted dark:text-mutedLight"></th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item) => {
                return (
                  <tr key={item.uuid}>
                    <td className="text-start py-4">{item.name}</td>
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
                            <div
                              ref={dropdownRef}
                              className="bg-white absolute rounded-xl top-4 shadow-lg z-30 right-0 w-52 px-2 py-4"
                            >
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
