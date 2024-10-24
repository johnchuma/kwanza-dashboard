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
  AiOutlineGlobal,
} from "react-icons/ai";
import { getZoneBanners, getZones } from "../../controllers/zonesController";
import { IoCodeSlash } from "react-icons/io5";
import ModalRight from "../../components/modalRight";

const ZoneBannersPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(2);
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
    let path = `banners/${params.uuid}?limit=${limit}&page=${page}&keyword=${keyword}`;
    getZoneBanners(path).then((response) => {
      const rows = response.data.body.rows;
      console.log(rows);
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
          <h1 className="text-4xl 2xl:text-3xl font-bold">Linked Banners</h1>
          <p className="text-base text-muted dark:text-white dark:text-opacity-50">
            Banners that used this zone
          </p>
        </div>
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-black rounded-t-2xl bg-opacity-40 dark:bg-opacity-10 px-6 items-center py-4 flex justify-between">
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
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Linked At
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Banner
                </th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item) => {
                return (
                  <tr>
                    <td className="text-start py-4">
                      {moment(item.createdAt).fromNow()}
                    </td>
                    <td className="text-start py-4">
                      <div>
                        {item.SSPCampaignBanner.storageType == "web" ? (
                          <img
                            src={item.SSPCampaignBanner.url}
                            className="h-24"
                          />
                        ) : (
                          <iframe
                            src={item.SSPCampaignBanner.url}
                            className="h-24"
                          />
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

export default ZoneBannersPage;
