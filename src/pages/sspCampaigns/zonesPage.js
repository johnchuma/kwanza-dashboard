import { useEffect, useRef, useState } from "react";
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
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileImage,
  AiOutlineGlobal,
} from "react-icons/ai";
import { getZones } from "../../controllers/zonesController";
import { IoCodeSlash } from "react-icons/io5";
import ModalRight from "../../components/modalRight";

const WebsitesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  const params = useGetParams();

  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowOptions(false);
    });
  }, [dropdownRef]);
  useEffect(() => {
    let path = `${params.uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    getZones(path).then((response) => {
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
          <h1 className="text-4xl 2xl:text-3xl font-bold">Zones</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Manage advertiser zones Below
          </p>
        </div>
        <button
          onClick={() => {
            navigate(`/add-zone/?uuid=${params.uuid}`);
          }}
          className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
        >
          Add Zone
        </button>
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-darkLight rounded-t-2xl bg-opacity-40 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-lg">Zones ({count})</h1>
          <input
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className="search-style"
            placeholder="Search here"
          />
        </div>
        <ModalRight
          showModal={showModal}
          content={
            <div>
              <h1></h1>
            </div>
          }
          setShowModal={() => {
            setShowModal(!showModal);
          }}
        />
        <div className="px-6 py-5">
          <table className="w-full text-base  ">
            <thead>
              <tr>
                <th className="text-start text-muted dark:text-mutedLight">
                  Created At
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Zone
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Width
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Height
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Zone
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Type
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
                    <td className="text-start py-4">{item.width}px</td>
                    <td className="text-start py-4">{item.height}px</td>
                    <td className="text-start py-4">{item.type}</td>
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
                                icon={<IoCodeSlash />}
                                path={"/"}
                                onClick={() => {
                                  setShowModal(true);
                                  setShowOptions(false);
                                  setSelectedItem(item);
                                }}
                                title={"Invocation Code"}
                              />
                              <SidebarItem
                                icon={<AiOutlineGlobal />}
                                path={"/"}
                                onClick={() => {
                                  window.open(item.pageUrl, "_blank");
                                }}
                                title={"Visit zone's page"}
                              />
                              <SidebarItem
                                icon={<AiOutlineFileImage />}
                                path={`/zone-banners/?uuid=${item.uuid}`}
                                title={"Linked Banners"}
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
