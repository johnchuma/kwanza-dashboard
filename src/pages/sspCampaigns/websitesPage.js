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
import {
  deleteWebsite,
  getWebsite,
  getWebsites,
} from "../../controllers/websitesController";
import moment from "moment";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { UserContext } from "../../layouts/dashboardLayout";

const WebsitesPage = () => {
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
    getWebsites(path).then((response) => {
      console.log();
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
      {user.role != "publisher" && <Back />}

      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl 2xl:text-3xl font-bold">Websites</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Manage advertiser websites Below
          </p>
        </div>
        <button
          onClick={() => {
            navigate(`/add-website/?uuid=${params.uuid}`);
          }}
          className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
        >
          Add Website
        </button>
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-darkLight rounded-t-2xl bg-opacity-40 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-lg">Websites ({count})</h1>
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
                  Website
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Type
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Zones
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
                    <td className="text-start py-4">{item.name}</td>
                    <td className="text-start py-4">{item.type}</td>
                    <td className="text-start py-4">{item.zones}</td>
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
                                icon={<GrStatusPlaceholder />}
                                path={`/zones/?uuid=${item.uuid}`}
                                title={"Website Zones"}
                              />
                              <SidebarItem
                                icon={<AiOutlineEdit />}
                                path={`/websites`}
                                title={"Edit Website"}
                              />
                              <SidebarItem
                                icon={<AiOutlineDelete />}
                                onClick={() => {
                                  deleteWebsite(item.uuid).then((res) => {
                                    getData();
                                  });
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
    </div>
  );
};

export default WebsitesPage;
