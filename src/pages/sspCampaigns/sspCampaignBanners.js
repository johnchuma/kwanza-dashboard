import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Back from "../../components/back";
import { useGetParams } from "../../utils/getParams";
import {
  deleteSSPCampaignBanner,
  getSspCampaignBanners,
} from "../../controllers/sspBannersController";
import { AiOutlineDelete } from "react-icons/ai";
import NoData from "../../components/noData";
import SidebarItem from "../../components/sidebarItem";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { HiDotsVertical } from "react-icons/hi";
import { BiRectangle } from "react-icons/bi";
import Loader from "../../components/loader";

const SSPCampaignBanners = () => {
  const navigate = useNavigate();
  const params = useGetParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowOptions(false);
    });
  }, [dropdownRef]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    let path = `${params.uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    getSspCampaignBanners(path).then((response) => {
      const rows = response.data.body.rows;
      console.log(rows);
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
      <Back />

      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl 2xl:text-3xl font-bold">Campaign Banners</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Campaign Banners
          </p>
        </div>
        <button
          onClick={() => {
            navigate(`/add-ssp-campaign-banner/?uuid=${params.uuid}`);
          }}
          className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
        >
          Add New Banner
        </button>
      </div>
      <div>
        {data.length == 0 && (
          <NoData
            title={"No Linked banners"}
            description={"Your banners will appear here when availbale"}
          />
        )}
        <div className="grid grid-cols-1">
          {data.map((item) => {
            return (
              <div className="bg-white rounded-xl space-x-12 items-center flex px-8 py-6 mt-4">
                <div className="w-2/12">
                  {item.storageType == "web" ? (
                    <img className="rounded-2xl" src={item.url} />
                  ) : (
                    <iframe
                      className="w-full rounded-2xl"
                      src={item.url}
                    ></iframe>
                  )}
                </div>
                <div className="w-6/12">
                  <h1 className="text-lg 2xl:text-base">
                    Dimensions: {item.width}x{item.height}
                  </h1>
                  <h1 className="flex space-x-1 text-base 2xl:text-sm text-muted dark:text-mutedLight">
                    <div className="">Destination URL:</div>{" "}
                    <span>{item.destinationURL}</span>{" "}
                  </h1>
                  <h1 className="flex space-x-1 text-base 2xl:text-sm text-muted dark:text-mutedLight">
                    <div className="">Linked Zones:</div>{" "}
                    <span>{item.linkedZonesCount}</span>{" "}
                  </h1>

                  {/* <button
                    onClick={() => {
                      navigate(`/link-banner-with-zones/?uuid=${item.uuid}`);
                    }}
                    className="bg-primary 2xl:text-sm bg-opacity-10 text-primary  font-bold py-2 px-6 rounded-lg mt-4 "
                  >
                    Link Zone
                  </button> */}
                </div>
                <div className="w-4/12 flex justify-end">
                  {" "}
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
                    {showOptions == true && selectedItem.uuid == item.uuid && (
                      <div
                        ref={dropdownRef}
                        className="bg-white absolute rounded-xl  top-4 shadow-lg z-30 right-0 w-52 px-2 py-4"
                      >
                        <SidebarItem
                          icon={<BiRectangle />}
                          path={`/link-banner-with-zones/?uuid=${item.uuid}`}
                          title={"Zones"}
                        />
                        <SidebarItem
                          icon={<AiOutlineDelete />}
                          onClick={() => {
                            deleteSSPCampaignBanner(item.uuid).then(
                              (response) => {
                                setShowOptions(false);
                                setSelectedItem(null);
                                toast.success("Deleted Succesfully");
                                fetchData();
                              }
                            );
                          }}
                          path={`/websites`}
                          title={"Delete Banner"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SSPCampaignBanners;
