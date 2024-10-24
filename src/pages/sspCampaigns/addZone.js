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
import { addZone } from "../../controllers/zonesController";
import ModalRight from "../../components/modalRight";
import { AnimatePresence, motion } from "framer-motion";

const AddZone = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const params = useGetParams();
  const [categories, setCategories] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [openZoneDimensions, setOpenZoneDimensions] = useState(false);
  const [zoneIndex, setZoneIndex] = useState(0);
  const zoneDimensions = [
    { width: 300, height: 100, image: "/300x100.png" },
    { width: 900, height: 250, image: "/900x250.png" },
    { width: 728, height: 90, image: "/728x80.png" },
    { width: 300, height: 250, image: "/300x250.png" },
    { width: 300, height: 600, image: "/300x600.png" },
  ];
  useEffect(() => {
    getWebsiteCategories().then((response) => {
      setCategories(response.data.body);
    });
  }, []);
  return (
    <div>
      <Back />
      <ModalRight
        content={
          <div>
            <h1 className="text-2xl font-semibold mb-2">Select Zone</h1>
            <div className="grid grid-cols-2 gap-4 items-center ">
              {zoneDimensions.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setZoneIndex(index);
                      setOpenZoneDimensions(false);
                    }}
                    className={`my-2 text-center flex flex-col justify-center items-center border-2 p-2 ${
                      index == zoneIndex
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img className="max-h-36" src={item.image} />
                    <p
                      className={`${
                        index == zoneIndex ? "text-primary" : "text-muted"
                      } mt-2 text-sm`}
                    >
                      {item.width}x{item.height}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        }
        showModal={openZoneDimensions}
        setShowModal={() => {
          setOpenZoneDimensions(false);
        }}
      />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">New Zone</h1>
        <p className="text-base text-muted dark:text-white dark:text-opacity-50">
          Enter Zone details below
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            name: e.target.name.value,
            type: e.target.type.value,
            pageUrl: e.target.pageUrl.value,
            height: zoneDimensions[zoneIndex].height,
            width: zoneDimensions[zoneIndex].width,
            website_uuid: params.uuid,
          };
          console.log(payload);
          setUploading(true);
          addZone(payload)
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
        className="bg-white dark:bg-darkLight py-12 rounded-xl mt-8 w-6/12 px-8"
      >
        <div className="space-y-1">
          <h1 className="text-lg font-bold">Add Zone</h1>
          <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
            All fields are required
          </p>
        </div>
        <div
          className=" cursor-pointer mt-8 "
          onClick={() => {
            setOpenZoneDimensions(true);
          }}
        >
          <p className="text-muted">Click to change dimensions</p>
          <AnimatePresence
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className="flex flex-col justify-center items-center mt-2"
            >
              <img
                className=" max-h-36"
                src={zoneDimensions[zoneIndex].image}
              />
              <p className={`text-primary mt-2 text-sm text-center`}>
                {zoneDimensions[zoneIndex].width}x
                {zoneDimensions[zoneIndex].height}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <TextForm
            placeholder={"Enter zone name"}
            name={"name"}
            defaultValue={`${zoneDimensions[zoneIndex].width}x${zoneDimensions[zoneIndex].height}`}
            label={"Zone name"}
          />
          <TextForm
            placeholder={"Enter page url"}
            name={"pageUrl"}
            label={"Page URL where this zone is found"}
          />

          <SelectForm
            placeholder={"Enter website type"}
            name={"type"}
            label={"Type"}
            options={["Mass", "Premium"]}
          />
        </div>
        <SubmitButton loading={uploading} text={`Add Zone`} />
      </form>
    </div>
  );
};

export default AddZone;
