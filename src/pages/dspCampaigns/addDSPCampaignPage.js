import { useContext, useEffect, useState } from "react";
import SubmitButton from "../../components/submitButton";
import TextForm from "../../components/textForm";
import { showError } from "../../utils/showError";
import toast from "react-hot-toast";
import SelectForm from "../../components/selectForm";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { addDSPCampaign } from "../../controllers/dspCampaignController";
import ModalRight from "../../components/modalRight";
import AddAudiencePage from "./addAudiencesPage";

const AddDSPCampaign = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useGetParams();
  const [destination, setDestination] = useState(null);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [audiences, setAudiences] = useState([]);
  const [budget, setBudget] = useState(0);
  const [showRightModal, setShowRightModal] = useState(false);
  const [showInterest, setShowInterest] = useState(false);
  useEffect(() => {
    findData();
  }, []);
  const findData = () => {
    let path = `user/${params.uuid}/?limit=${100}&page=${1}&keyword=${""}`;
    getAudiences(path).then((response) => {
      const rows = response.data.body.rows;
      setAudiences(rows);
      setLoading(false);
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
        <h1 className="text-4xl 2xl:text-3xl font-bold">New campaign</h1>
        <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
          Enter campaign details below
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
          addDSPCampaign(payload)
            .then((response) => {
              toast.success("added successfully");
              console.log(response.data.body);
              navigate(-1);
              setTimeout(() => {
                navigate(
                  `/dsp-campaign-banners/?uuid=${response.data.body.uuid}`
                );
              }, 50);
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
              <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                All fields are required
              </p>
            </div>
            <div className="space-y-4 my-6 mb-8">
              <TextForm
                placeholder={"Enter campaign name"}
                name={"name"}
                label={"Campaign name"}
              />

              <div className="space-y-2">
                <p className="text-muted dark:text-white dark:text-opacity-50">
                  Campaign Destination
                </p>
                <input
                  className="input-style"
                  placeholder={"Enter campaign destination"}
                  name={"destination"}
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Campaign date */}
        {destination && (
          <div className="bg-white w-6/12 dark:bg-darkLight py-6 rounded-xl mt-2 px-8">
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
                  name={"activateDate"}
                  defaultValue={moment(Date.now()).format("yyy-MM-DD")}
                  inputType={"date"}
                  label={"Activate Date (Default: Immediately)"}
                />
                <TextForm
                  placeholder={""}
                  required={false}
                  name={"expireDate"}
                  inputType={"date"}
                  label={"Expire Date (Default: Infinitly)"}
                />
              </div>
            </div>
          </div>
        )}
        {/* Pricing */}
        {destination && (
          <div className="bg-white w-6/12 dark:bg-darkLight py-6 rounded-xl mt-2 px-8">
            <div className="">
              <div className="space-y-1">
                <h1 className="text-lg font-bold">Budget</h1>
                <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                  Set campaign budget
                </p>
              </div>
              <div className="space-y-4 my-6 mb-8">
                {
                  <div className="space-y-2">
                    <p className="text-muted dark:text-white dark:text-opacity-50">
                      Budget
                    </p>
                    <input
                      className="input-style"
                      placeholder={"Enter your budget"}
                      name={"budget"}
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
        )}
        {budget > 0 && budget.length > 3 && (
          <div>
            <div className="bg-white w-6/12 dark:bg-darkLight py-6 rounded-xl mt-2 px-8">
              <div className="">
                <div className="space-y-1">
                  <h1 className="text-lg font-bold">Audience</h1>
                  <p className="text-base text-muted dark:text-white dark:text-opacity-50">
                    Set campaign audience
                  </p>
                </div>
                <div className="space-y-4 my-6 mb-8">
                  <SelectForm
                    name={"audience"}
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
            <SubmitButton loading={uploading} text={"Create campaign"} />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddDSPCampaign;
