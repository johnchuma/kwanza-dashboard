import { useContext, useEffect, useState } from "react";
import SubmitButton from "../../components/submitButton";
import TextForm from "../../components/textForm";
import { showError } from "../../utils/showError";
import toast from "react-hot-toast";
import SelectForm from "../../components/selectForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Back from "../../components/back";
import { useGetParams } from "../../utils/getParams";
import { getWebsiteCategories } from "../../controllers/websiteCategoriesController";
import {
  editSSPCampaign,
  getSSPCampaign,
} from "../../controllers/sspCampaignController";
import moment from "moment";
import Loader from "../../components/loader";

const EditSSPCampaign = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [campaignTitle, setCampaignTitle] = useState(null);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [impression, setImpression] = useState(null);
  const [click, setClick] = useState(null);
  const [budget, setBudget] = useState(0);
  const [isPremium, setIsPremium] = useState(1);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    var estimatedImpressions = () => {
      return isPremium == 1
        ? Math.ceil((parseFloat(budget) * 1000) / 2)
        : Math.ceil((parseFloat(budget) * 1000) / 1.5);
    };
    setImpression(estimatedImpressions);
    var estimatedClicks = () => {
      return isPremium == 1
        ? Math.ceil(parseFloat(budget) / 0.75)
        : Math.ceil(parseFloat(budget) / 0.5);
    };
    setClick(estimatedClicks);
  }, [budget, isPremium]);
  useEffect(() => {
    findData();
  }, []);
  const findData = () => {
    setLoading(true);
    console.log(params.uuid);
    getSSPCampaign(params.uuid).then((res) => {
      console.log(res.data.body);
      const campaign = res.data.body;
      setCampaign(campaign);
      setClick(campaign.targetClick);
      setImpression(campaign.targetImpression);
      console.log(campaign.revenue.toFixed(1));
      campaign.revenue.toFixed(1) == 2 ? setIsPremium(1) : setIsPremium(0);
      getWebsiteCategories().then((response) => {
        setCategories(response.data.body);
        setLoading(false);
      });
    });
  };
  useEffect(() => {}, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">{campaign.name}</h1>
        <p className="text-base text-muted dark:text-white dark:text-opacity-50">
          Edit campaign details below
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const impression = e.target.targetImpression.value;
          const click = selectedRevenue == 1 ? e.target.targetClick.value : 0;
          const budget = e.target.revenue.value;
          const payload = {
            name: e.target.name.value,
            type: e.target.type.value,
            weight: e.target.weight.value,
            revenue: (budget * 1000) / impression,
            revenueType: e.target.revenueType.value,
            activateTime: e.target.activateTime.value,
            expireTime: e.target.expireTime.value,
            targetImpression: impression,
            targetClick: selectedRevenue == 1 ? click : 0,
            user_uuid: params.uuid,
          };
          console.log(payload);
          setUploading(true);
          editSSPCampaign(campaign.uuid, payload)
            .then((response) => {
              toast.success("added successfully");
              console.log(response.data.body);
              navigate(-1);
            })
            .catch((err) => {
              setUploading(false);
              showError(err);
            });
        }}
        className=" grid grid-cols-1 gap-2 w-6/12 "
      >
        {/* Basic informations */}
        <div className="bg-white dark:bg-darkLight py-6 rounded-xl mt-8  px-8">
          <div className="">
            <div className="space-y-1">
              <h1 className="text-lg font-bold">Basic Details</h1>
              <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                All fields are required
              </p>
            </div>
            <div className="space-y-4 my-6 mb-8">
              <TextForm
                placeholder={"Enter campaign name"}
                name={"name"}
                defaultValue={campaign.name}
                label={"Campaign name"}
              />
              <div className="space-y-2">
                <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                  What websites are you targeting ?
                </p>
                <select
                  name={""}
                  defaultValue={isPremium}
                  onChange={(e) => {
                    setIsPremium(parseInt(e.target.value));
                  }}
                  className="input-style"
                  label={"Campaign website type"}
                >
                  <option value={1}>Premium</option>
                  <option value={0}>Mass</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <h1 className="text-base text-muted dark:text-white dark:text-opacity-50">
                  Campaign Type
                </h1>
                <div className="space-y-2">
                  {[
                    {
                      type: 0,
                      name: "Remnant",
                      paragraph: `The default campaign type. Remnant campaigns have lots of
                different delivery options, and you should ideally always have
                at least one Remnant campaign linked to every zone, to ensure
                that there is always something to show. Use Remnant campaigns to
                display house banners, ad-network banners, or even direct
                advertising that has been sold, but where there is not a
                time-critical performance requirement for the campaign to adhere
                to.`,
                    },
                    {
                      type: 5,
                      name: "Contract",
                      paragraph: `The default campaign type. Remnant campaigns have lots of
                   Contract campaigns are for smoothly delivering the impressions
                    required to achieve a specified time-critical performance
                    requirement. That is, Contract campaigns are for when an
                    advertiser has paid specifically to have a given number of
                    impressions, clicks and/or conversions to be achieved either
                    between two dates, or per day.`,
                    },
                  ].map((item) => {
                    return (
                      <div>
                        <div className="flex space-x-2 group items-center">
                          <input
                            onChange={(e) => {
                              setSelectedType(e.target.value);
                            }}
                            type="radio"
                            value={item.type}
                            defaultChecked={item.type == campaign.type}
                            defaultValue={campaign.type}
                            className=" cursor-pointer border-primary checked:bg-primary checked:focus:bg-primary focus:ring-primary focus:border-primary"
                            name="type"
                          />
                          <h1>{item.name}</h1>
                        </div>
                        {selectedType == item.type && (
                          <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                            {item.paragraph}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Campaign date */}
        {
          <div className="bg-white dark:bg-darkLight py-6 rounded-xl mt-2 px-8">
            <div className="">
              <div className="space-y-1">
                <h1 className="text-lg font-bold">Campaign Duration</h1>
                <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                  Set start and end date
                </p>
              </div>
              <div className="space-y-4 my-6 mb-8">
                <TextForm
                  placeholder={""}
                  name={"activateTime"}
                  defaultValue={moment(campaign.activateTime).format(
                    "yyy-MM-DD"
                  )}
                  inputType={"date"}
                  label={"Start Date (Default: Immediately)"}
                />
                <TextForm
                  placeholder={""}
                  required={false}
                  defaultValue={moment(campaign.expireTime).format("yyy-MM-DD")}
                  name={"expireTime"}
                  inputType={"date"}
                  label={"End Date (Default: Infinitly)"}
                />
              </div>
            </div>
          </div>
        }
        {/* Pricing */}
        {
          <div className="bg-white dark:bg-darkLight py-6 rounded-xl mt-2 px-8">
            <div className="">
              <div className="space-y-1">
                <h1 className="text-lg font-bold">Pricing</h1>
                <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                  Set campaign pricing
                </p>
              </div>
              <div className="space-y-4 my-6 mb-8">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-base text-muted dark:text-white dark:text-opacity-50">
                    Campaign Type
                  </h1>
                  <div className="space-y-2">
                    {[
                      {
                        type: 0,
                        name: "CPM",
                      },
                      {
                        type: 1,
                        name: "CPC",
                      },
                    ].map((item) => {
                      return (
                        <div>
                          <div className="flex space-x-2 group items-center">
                            <input
                              onChange={(e) => {
                                setSelectedRevenue(e.target.value);
                              }}
                              type="radio"
                              value={item.type}
                              defaultChecked={item.type == campaign.revenueType}
                              className=" cursor-pointer border-primary checked:bg-primary checked:focus:bg-primary focus:ring-primary focus:border-primary"
                              name="revenueType"
                            />
                            <h1>{item.name}</h1>
                          </div>
                          {selectedType == item.type && (
                            <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                              {item.paragraph}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {
                  <div className="space-y-2">
                    <p className="text-muted dark:text-white dark:text-opacity-50">
                      Budget
                    </p>
                    <input
                      className="input-style"
                      placeholder={"Enter your budget"}
                      name={"revenue"}
                      defaultValue={
                        (campaign.revenue * campaign.targetImpression) / 1000
                      }
                      required
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                      inputType={"number"}
                      label={`Rate/Price (${
                        selectedRevenue == 0
                          ? "price per 1000 impression"
                          : "price per 1 click"
                      }) `}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        }
        {
          <div>
            <div className="bg-white dark:bg-darkLight py-6 rounded-xl mt-2 px-8">
              <div className="">
                <div className="space-y-1">
                  <h1 className="text-lg font-bold">Target Reach</h1>
                  <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                    Set campaign pricing
                  </p>
                </div>
                <div className="space-y-4 my-6 mb-8">
                  <TextForm
                    placeholder={"Weight"}
                    defaultValue={1}
                    name={"weight"}
                    label={
                      "Campaign weight over other campaigns (0 means campaign is not active)"
                    }
                  />
                  <TextForm
                    placeholder={"Enter target impression"}
                    name={"targetImpression"}
                    value={impression}
                    inputType={"number"}
                    disabled={true}
                    label={"Estimated Impression"}
                  />

                  <TextForm
                    placeholder={"Enter target click"}
                    name={"targetClick"}
                    value={click}
                    disabled={true}
                    inputType={"number"}
                    label={"Estimated Clicks"}
                  />
                </div>
              </div>
            </div>
            <SubmitButton loading={uploading} text={"Save Changes"} />
          </div>
        }
      </form>
    </div>
  );
};

export default EditSSPCampaign;
