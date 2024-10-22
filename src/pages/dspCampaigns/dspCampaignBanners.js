import { useEffect, useRef, useState } from "react";
import SubmitButton from "../../components/submitButton";
import TextForm from "../../components/textForm";
import { showError } from "../../utils/showError";
import toast from "react-hot-toast";
import SelectForm from "../../components/selectForm";
import { useNavigate } from "react-router-dom";
import Back from "../../components/back";
import { useGetParams } from "../../utils/getParams";
import { getWebsiteCategories } from "../../controllers/websiteCategoriesController";

import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineQuestion,
} from "react-icons/ai";
import NoData from "../../components/noData";
import SidebarItem from "../../components/sidebarItem";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { HiDotsVertical } from "react-icons/hi";
import { BiRectangle } from "react-icons/bi";
import Loader from "../../components/loader";
import {
  deleteDSPCampaignBanner,
  getDSPCampaignBanners,
} from "../../controllers/dspBannersController";
import {
  editDSPCampaign,
  getDSPCampaign,
} from "../../controllers/dspCampaignController";
import moment from "moment";

const DSPCampaignBanners = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const params = useGetParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);
  const [campaign, setCampaign] = useState(null);

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
    getDSPCampaignBanners(path).then((response) => {
      const rows = response.data.body.rows;
      console.log(rows);
      const count = response.data.body.count;

      setData(rows);
      setCount(count);
      getDSPCampaign(params.uuid).then((res) => {
        setCampaign(res.data.body);
        console.log(res.data.body);
        setLoading(false);
      });
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      <Back />

      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl 2xl:text-3xl font-bold">{campaign.name}</h1>
          <p className=" text-muted text-sm dark:text-mutedLight">
            View campaign preview and linked banners
          </p>
        </div>
      </div>
      <div className="bg-white p-8  rounded-lg mt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className=" text-xl ">Campaign details</h1>
          <div
            onClick={() => {
              navigate(`/edit-dsp-campaign/${campaign.uuid}`);
            }}
            className="flex space-x-2 text-muted hover:text-primary cursor-pointer transition-all  items-center"
          >
            <AiOutlineEdit />
            <p>Edit</p>
          </div>
        </div>
        {[
          { title: "Created", value: moment(campaign.createdAt).fromNow() },

          { title: "Campaign name", value: campaign.name },
          { title: "Budget", value: `$${campaign.budget}` },
          { title: "Destination", value: campaign.destination },
          { title: "Audience", value: campaign.Audience.name },

          {
            title: "Activate Time",
            value: moment(campaign.activateDate).format("yyy, MMM DD"),
          },
          {
            title: "Expire Time",
            value: moment(campaign.expireDate).format("yyy, MMM DD"),
          },
        ].map((item) => {
          return (
            <div className="flex border-b border-slate-200 py-2">
              <div className="w-4/12 text-sm text-muted">{item.title}:</div>
              <div className="w-4/12">{item.value}</div>
            </div>
          );
        })}
        <div className="flex border-b border-slate-200 py-2">
          <div className="w-4/12 text-sm text-muted">status:</div>
          <div className="w-4/12">
            {campaign.status == "draft" ? (
              <button className="bg-background capitalize px-6 py-1 text-sm rounded-full font-bold text-muted">
                {campaign.status}
              </button>
            ) : campaign.status == "runnable" ? (
              <button className="bg-primary bg-opacity-15  capitalize px-6 py-1 text-sm rounded-full font-bold text-primary">
                {campaign.status}
              </button>
            ) : (
              <button className="bg-orange-400 bg-opacity-15  capitalize px-6 py-1 text-sm rounded-full font-bold text-orange-600">
                {campaign.status}
              </button>
            )}
          </div>
        </div>
        {campaign.status == "draft" && (
          <div>
            <p className="text-red-400 text-sm mt-8">
              Your campaign is not active yet, press button below to activate*
            </p>
            <button
              onClick={() => {
                if (data.length > 0) {
                  editDSPCampaign(campaign.uuid, { status: "runnable" }).then(
                    (res) => {
                      toast.success("Activated successfully");
                      fetchData();
                    }
                  );
                } else {
                  toast.error(
                    "Please upload at least one banner before  activating"
                  );
                }
              }}
              className="bg-primary text-white px-6 py-2 text-sm rounded-lg   mt-2 font-bold "
            >
              Activate Campaign
            </button>
          </div>
        )}
        {campaign.status == "runnable" ? (
          <button
            onClick={() => {
              if (data.length > 0) {
                editDSPCampaign(campaign.uuid, { status: "paused" }).then(
                  (res) => {
                    fetchData();
                    toast.success("Paused successfully");
                  }
                );
              } else {
                toast.error(
                  "Please upload at least one banner before  activating"
                );
              }
            }}
            className="bg-orange-400 bg-opacity-20 text-orange-500 px-6 py-2 text-sm rounded-lg   mt-2 font-bold "
          >
            Pause Campaign
          </button>
        ) : (
          campaign.status == "paused" && (
            <button
              onClick={() => {
                if (data.length > 0) {
                  editDSPCampaign(campaign.uuid, { status: "runnable" }).then(
                    (res) => {
                      fetchData();
                      toast.success("Activated successfully");
                    }
                  );
                } else {
                  toast.error(
                    "Please upload at least one banner before activating"
                  );
                }
              }}
              className="bg-primary text-white px-6 py-2 text-sm rounded-lg   mt-2 font-bold "
            >
              Activate Campaign
            </button>
          )
        )}
      </div>
      <div>
        {data.length == 0 ? (
          <NoData
            action={
              <button
                onClick={() => {
                  navigate(`/add-dsp-campaign-banner/?uuid=${params.uuid}`);
                }}
                className="py-2 px-6 font-semibold rounded-lg bg-primary  text-sm text-white"
              >
                Add New Banner
              </button>
            }
            title={"No Linked banners"}
            description={"Your banners will appear here when availbale"}
          />
        ) : (
          <div className=" py-6 rounded-xl mt-8 ">
            <div className="flex justify-between items-center mb-4">
              <h1 className=" text-xl font-semibold ">Campaign banners</h1>
              {campaign.status == "draft" && (
                <button
                  onClick={() => {
                    navigate(`/add-dsp-campaign-banner/?uuid=${params.uuid}`);
                  }}
                  className="py-2 px-6 font-semibold rounded-lg bg-primary  text-sm text-white"
                >
                  Add New Banner
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 bg-white p-6 rounded-xl">
              {data.map((item) => {
                return (
                  <div className="  space-x-12 items-center flex   mt-2">
                    <div className="w-1/12">
                      {item.storageType == "web" ? (
                        <img className="rounded-xl" src={item.url} />
                      ) : (
                        <iframe
                          className="w-full rounded-xl"
                          src={item.url}
                        ></iframe>
                      )}
                    </div>
                    <div className="w-10/12 space-y-1">
                      <h1 className="text-lg 2xl:text-base">
                        Dimensions: {item.width}x{item.height}
                      </h1>
                      <h1 className="flex space-x-1  text-base 2xl:text-sm text-muted dark:text-mutedLight">
                        <div className="">Destination URL:</div>{" "}
                        <span>{item.destinationURL}</span>{" "}
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
                    <div className="w-1/12  flex justify-end">
                      {" "}
                      {campaign.status == "draft" && (
                        <div className="relative">
                          <AiOutlineDelete
                            className=" cursor-pointer text-2xl hover:text-red-500 transition-all duration-300"
                            onClick={() => {
                              deleteDSPCampaignBanner(item.uuid).then(
                                (response) => {
                                  setShowOptions(false);
                                  setSelectedItem(null);
                                  toast.success("Deleted Succesfully");
                                  fetchData();
                                }
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSPCampaignBanners;
