import { useEffect, useState } from "react";
import SubmitButton from "../../components/submitButton";
import TextForm from "../../components/textForm";
import { showError } from "../../utils/showError";
import toast from "react-hot-toast";
import SelectForm from "../../components/selectForm";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../controllers/userController";
import Back from "../../components/back";
import { countries, iabCategories } from "../../utils/constants";
import { BsPlus } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import ModalRight from "../../components/modalRight";
import {
  addAudience,
  getPretargetedAudiences,
} from "../../controllers/audenciesController";
import Loader from "../../components/loader";
import { useGetParams } from "../../utils/getParams";

const AddAudiencePage = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setloading] = useState(true);

  const [categoryInterests, setCategoryInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showInterest, setShowInterest] = useState(false);
  const [pretargetedSelected, setPretargetedSelected] = useState(null);
  const params = useGetParams();
  const navigate = useNavigate();
  const [pretargets, setpretargets] = useState([]);
  useEffect(() => {
    getPretargetedAudiences().then((response) => {
      setpretargets(response.data.body.pretargetingConfigs);
      setloading(false);
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">New Audience</h1>
        <p className="text-base text-muted dark:text-mutedLight">
          Enter Audience details below
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            name: e.target.name.value,
            country: e.target.country.value,
            pretarget: e.target.pretarget.value,
            user_uuid: params.uuid,
            interests: selectedInterests.map((item) => item.value),
          };
          setUploading(true);
          addAudience(payload)
            .then((data) => {
              toast.success("added successfully");
              navigate(-1);
              setUploading(false);
            })
            .catch((err) => {
              setUploading(false);
              showError(err);
            });
        }}
      >
        <div className="bg-white dark:bg-darkLight py-6 rounded-xl mt-8 w-6/12 px-8">
          <div className="space-y-1">
            <h1 className="text-lg font-bold">Register new audience here</h1>
            <p className="text-base text-muted dark:text-mutedLight">
              All fields are required
            </p>
          </div>
          <div className="space-y-4 my-6 mb-8">
            <TextForm
              placeholder={"Enter audience name"}
              name={"name"}
              label={"Audience name"}
            />
            <SelectForm
              name="country"
              defaultValue={"TZS"}
              values={countries.map((item) => item.iso3)}
              options={countries.map((item) => item.label)}
              label={"Country"}
            />

            {/* pretarget group */}
            <div className="space-y-1">
              <p className="text-base text-muted dark:text-mutedLight">
                Pre-targeted audience
              </p>
              <select
                name="pretarget"
                onChange={(e) => {
                  setPretargetedSelected(e.target.value);
                  // setCategoryInterests(iabCategories[e.target.value].categories);
                  // console.log(iabCategories[e.target.value].categories);
                }}
                className="input-style"
                label={"Campaign website type"}
              >
                <option>Select pretargeted audience</option>
                {pretargets.map((item, index) => {
                  return <option value={item.name}>{item.displayName}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        {pretargetedSelected && (
          <div className="bg-white dark:bg-darkLight py-6 rounded-xl mt-4 w-6/12 px-8">
            <div className="space-y-1">
              <h1 className="text-lg font-bold">Select audience interest</h1>
              <p className="text-base text-muted dark:text-mutedLight">
                Select category
              </p>
              <select
                name={""}
                onChange={(e) => {
                  // alert("hello");
                  // setIsPremium(parseInt(e.target.value));
                  setCategoryInterests(
                    iabCategories[e.target.value].categories
                  );
                  console.log(iabCategories[e.target.value].categories);
                }}
                className="input-style"
                label={"Campaign website type"}
              >
                {iabCategories.map((item, index) => {
                  return (
                    <option key={item.category} value={index}>
                      {item.category}
                    </option>
                  );
                })}
              </select>

              {categoryInterests.length > 0 && (
                <div
                  onClick={() => {
                    setShowInterest(true);
                  }}
                  className="flex space-x-2 items-center pt-1 pb-4 cursor-pointer"
                >
                  <BsPlus className="text-2xl text-primary" />
                  <h1 className="font-bold text-primary">Select interests</h1>
                </div>
              )}
              <ModalRight
                showModal={showInterest}
                setShowModal={() => {
                  setShowInterest(false);
                }}
                content={
                  <div>
                    <div className="flex justify-between items-start mt-2">
                      <div>
                        <h1 className="text-2xl font-semibold text-dark">
                          Interests
                        </h1>
                        <p className="text-muted ">Click to select interest</p>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={(e) => {
                          setShowInterest(false);
                        }}
                      >
                        <AiOutlineClose className="text-xl text-muted cursor-pointer" />
                      </div>
                    </div>
                    <div className=" flex flex-wrap mt-8">
                      {categoryInterests.map((item) => {
                        return (
                          <div
                            onClick={() => {
                              var selected =
                                selectedInterests.filter((e) => e == item)
                                  .length > 0;
                              console.log(selected);
                              if (selected) {
                                var newList = selectedInterests.filter(
                                  (e) => e != item
                                );
                                setSelectedInterests(newList);
                              } else {
                                setSelectedInterests([
                                  ...selectedInterests,
                                  item,
                                ]);
                              }
                            }}
                            key={item.value}
                            className={`py-1 text-sm px-4 ${
                              selectedInterests.filter((e) => e == item)
                                .length > 0
                                ? "bg-primary text-white"
                                : "bg-background bg-opacity-65"
                            } cursor-pointer rounded-full  mr-3 mb-3`}
                          >
                            {item.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                }
              />

              {selectedInterests.length > 0 && (
                <div className=" bg-background bg-opacity-50 py-4 px-4 rounded-xl mt-3">
                  <h1 className="text-lg font-bold">Selected interests</h1>
                  <p className="text-muted">Click to remove</p>
                  <div className="flex flex-wrap mt-4">
                    {selectedInterests.map((item) => {
                      return (
                        <div
                          onClick={() => {
                            setSelectedInterests(
                              selectedInterests.filter((e) => e != item)
                            );
                          }}
                          key={item.value}
                          className={`py-1 text-sm px-4 bg-primary text-white font-medium cursor-pointer rounded-full mr-3 mb-3`}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {selectedInterests.length > 0 && (
          <SubmitButton text={"Add Audiance"} loading={uploading} />
        )}
      </form>
    </div>
  );
};

export default AddAudiencePage;
