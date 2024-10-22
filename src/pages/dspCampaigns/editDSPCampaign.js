import { useContext, useEffect, useState } from "react";
import SubmitButton from "../../components/submitButton";
import TextForm from "../../components/textForm";
import { showError } from "../../utils/showError";
import toast from "react-hot-toast";
import SelectForm from "../../components/selectForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { registerUser } from "../../controllers/userController";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Back from "../../components/back";
import { useGetParams } from "../../utils/getParams";
import { getWebsiteCategories } from "../../controllers/websiteCategoriesController";
import { addSSPCampaign } from "../../controllers/sspCampaignController";
import moment from "moment";
import { BsPlus } from "react-icons/bs";
import { getAudiences } from "../../controllers/audenciesController";
import Loader from "../../components/loader";
import {
  editDSPCampaign,
  getDSPCampaign,
} from "../../controllers/dspCampaignController";
import ModalRight from "../../components/modalRight";
import AddAudiencePage from "./addAudiencesPage";

const EditDSPCampaign = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const [destination, setDestination] = useState(null);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [audiences, setAudiences] = useState([]);
  const [budget, setBudget] = useState(0);
  const [showRightModal, setShowRightModal] = useState(false);
  const [showInterest, setShowInterest] = useState(false);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    findData();
  }, []);
  const findData = () => {
    getDSPCampaign(params.uuid).then((res) => {
      setCampaign(res.data.body);
      console.log(res.data.body);
      let path = `user/${
        res.data.body.User.uuid
      }/?limit=${100}&page=${1}&keyword=${""}`;
      getAudiences(path).then((response) => {
        const rows = response.data.body.rows;
        setAudiences(rows);
        setLoading(false);
      });
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Back />
      <ModalRight
        showModal={showRightModal}
        expanded={showInterest}
        content={
          <AddAudiencePage
            close={() => {
              setShowRightModal(false);
              findData();
            }}
            expand={showInterest}
            setExpand={() => {
              setShowInterest(!showInterest);
            }}
            uuid={params.uuid}
          />
        }
        setShowModal={() => {
          setShowRightModal(false);
        }}
      />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">{campaign.name}</h1>
        <p className="text-base text-muted dark:text-mutedLight">
          Modify campaign details below
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            name: e.target.name.value,
            destination: e.target.destination.value,
            activateDate: e.target.activateDate.value,
            expireDate: e.target.expireDate.value,
            budget: e.target.budget.value,
            user_uuid: params.uuid,
            audience_uuid: e.target.audience.value,
          };
          console.log(payload);
          setUploading(true);
          editDSPCampaign(campaign.uuid, payload)
            .then((response) => {
              toast.success("Changed successfully");
              console.log(response.data.body);
              navigate(-1);
            })
            .catch((err) => {
              setUploading(false);
              showError(err);
            });
        }}
        className=" grid grid-cols-1 gap-2 "
      >
        {/* Basic informations */}
        <div className="bg-white w-6/12 dark:bg-darkLight py-6 rounded-xl mt-8  px-8">
          <div className="">
            <div className="space-y-1">
              <h1 className="text-lg font-bold">Basic Details</h1>
              <p className="text-base text-muted dark:text-mutedLight">
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
                <p className="text-muted dark:text-mutedLight">
                  Campaign Destination
                </p>
                <input
                  className="input-style"
                  placeholder={"Enter campaign destination"}
                  name={"destination"}
                  defaultValue={campaign.destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Campaign date */}
        {
          <div className="bg-white w-6/12 dark:bg-darkLight py-6 rounded-xl mt-2 px-8">
            <div className="">
              <div className="space-y-1">
                <h1 className="text-lg font-bold">Campaign Duration</h1>
                <p className="text-base text-muted dark:text-mutedLight">
                  Set start and end date
                </p>
              </div>
              <div className="space-y-4 my-6 mb-8">
                <TextForm
                  placeholder={""}
                  name={"activateDate"}
                  defaultValue={moment(campaign.activateDate).format(
                    "yyy-MM-DD"
                  )}
                  inputType={"date"}
                  label={"Activate Date (Default: Immediately)"}
                />
                <TextForm
                  placeholder={""}
                  required={false}
                  defaultValue={moment(campaign.expireDate).format("yyy-MM-DD")}
                  name={"expireDate"}
                  inputType={"date"}
                  label={"Expire Date (Default: Infinitly)"}
                />
              </div>
            </div>
          </div>
        }
        {/* Pricing */}
        {
          <div className="bg-white w-6/12 dark:bg-darkLight py-6 rounded-xl mt-2 px-8">
            <div className="">
              <div className="space-y-1">
                <h1 className="text-lg font-bold">Budget</h1>
                <p className="text-base text-muted dark:text-mutedLight">
                  Set campaign budget
                </p>
              </div>
              <div className="space-y-4 my-6 mb-8">
                {
                  <div className="space-y-2">
                    <p className="text-muted dark:text-mutedLight">Budget</p>
                    <input
                      className="input-style"
                      placeholder={"Enter your budget"}
                      name={"budget"}
                      defaultValue={campaign.budget}
                      required={true}
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                      type={"number"}
                    />
                    {budget && budget.length < 4 ? (
                      <p className="text-red-400 text-bg text-sm">
                        Budget must be greater that $1000
                      </p>
                    ) : (
                      <div></div>
                    )}
                  </div>
                }
              </div>
            </div>
          </div>
        }
        {
          <div>
            <div className="bg-white w-6/12 dark:bg-darkLight py-6 rounded-xl mt-2 px-8">
              <div className="">
                <div className="space-y-1">
                  <h1 className="text-lg font-bold">Audience</h1>
                  <p className="text-base text-muted dark:text-mutedLight">
                    Set campaign audience
                  </p>
                </div>
                <div className="space-y-4 my-6 mb-8">
                  <SelectForm
                    name={"audience"}
                    defaultValue={campaign.Audience.uuid}
                    values={audiences.map((item) => item.uuid)}
                    options={audiences.map((item) => item.name)}
                    label={"Select audience"}
                  />
                  <div
                    onClick={() => {
                      // navigate(`/add-audience/?uuid=${params.uuid}`);
                      setShowRightModal(true);
                    }}
                    className="flex space-x-1 font-medium cursor-pointer text-primary items-center"
                  >
                    <div>
                      <BsPlus className="text-2xl" />
                    </div>
                    <div>Add new audience</div>
                  </div>
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

export default EditDSPCampaign;
