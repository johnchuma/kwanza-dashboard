import { useEffect, useState } from "react";
import SubmitButton from "../../components/submitButton";
import TextForm from "../../components/textForm";
import { showError } from "../../utils/showError";
import toast from "react-hot-toast";
import SelectForm from "../../components/selectForm";
import { useNavigate } from "react-router-dom";
import Back from "../../components/back";
import { useGetParams } from "../../utils/getParams";
import { getWebsiteCategories } from "../../controllers/websiteCategoriesController";
import { addSSPCampaignBanner } from "../../controllers/sspBannersController";
import { BsImage } from "react-icons/bs";
import { getImageDimensions } from "../../utils/getWidthAndHeightOnImage";
import { FaFileZipper } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { isFileImage, isZipped } from "../../utils/checkExtensions";

const AddSSPCampaignBanner = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const params = useGetParams();
  const [categories, setCategories] = useState([]);
  const [isImage, setIsImage] = useState(true);
  const [pickedFile, setPickedFile] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    getWebsiteCategories().then((response) => {
      setCategories(response.data.body);
    });
  }, []);
  return (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">Add new banner</h1>
        <p className="text-base text-muted dark:text-mutedLight">
          Fill the form below to add a banner
        </p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          var formData = new FormData();
          if (isImage) {
            let dimensions = await getImageDimensions(e.target.file.files[0]);
            formData.set("width", dimensions.width);
            formData.set("height", dimensions.height);
          } else {
            formData.set("width", e.target.width.value);
            formData.set("height", e.target.height.value);
          }

          formData.set("storageType", e.target.storageType.value);
          formData.set("destinationURL", e.target.destinationURL.value);

          formData.set("ssp_campaign_uuid", params.uuid);
          formData.set("file", e.target.file.files[0]);
          setUploading(true);
          addSSPCampaignBanner(formData)
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
          <h1 className="text-lg font-bold">Add new banner </h1>
          <p className="text-base text-muted dark:text-mutedLight">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <div className="space-y-2">
            <lable className="text-muted">Banner Type</lable>
            <select
              onChange={(e) => {
                setPickedFile(null);
                setIsImage(e.target.value == "web" ? true : false);
              }}
              className="input-style"
              name={"storageType"}
            >
              <option value={"web"}>Image</option>
              <option value={"html"}>HTML</option>
            </select>
          </div>

          <div className="space-y-2">
            <lable className="text-muted">Banner</lable>
            <div className="w-full py-12 border-2 rounded-lg border-dashed border-rounded flex justify-center">
              <label for="file">
                {pickedFile != null ? (
                  isImage ? (
                    <div className="flex flex-col items-center space-y-2">
                      <img src={URL.createObjectURL(pickedFile)} />
                      <p className="text-muted text-sm">{pickedFile.name}</p>
                      <p className="text-muted text-sm">
                        {dimensions.width}x{dimensions.height}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <FaFileZipper className="text-4xl text-muted h-12" />
                      <p className="text-muted text-sm">{pickedFile.name}</p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col space-y-2 items-center   ">
                    <BsImage className="text-4xl text-muted h-12" />
                    <p className="text-muted text-sm">
                      {isImage ? "Pick image banner" : "Pick zipped html file"}
                    </p>
                  </div>
                )}
              </label>
            </div>
            <input
              id="file"
              required
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (isImage == true) {
                  if (isFileImage(file)) {
                    getImageDimensions(file).then((dimensions) => {
                      setDimensions(dimensions);
                      setPickedFile(file);
                    });
                  } else {
                    e.target.value = null;
                    toast.error("File selected is not an image");
                  }
                } else {
                  if (isZipped(file)) {
                    setPickedFile(file);
                  } else {
                    e.target.value = null;
                    toast.error("File selected is not zipped folder");
                  }
                  // alert(file.name);
                }
                console.log(file);
              }}
              name="file"
              className="sr-only"
            />
          </div>
          {/* <TextForm name={"file"} inputType={"file"} label={"Select banner"} /> */}
          {isImage == false && (
            <TextForm
              placeholder={"Enter width"}
              name={"width"}
              inputType={"number"}
              label={"Width"}
            />
          )}
          {isImage == false && (
            <TextForm
              placeholder={"Enter height"}
              name={"height"}
              inputType={"number"}
              label={"Height"}
            />
          )}
          <TextForm
            placeholder={"Enter destination URL"}
            name={"destinationURL"}
            label={"Destination URL"}
          />
        </div>
        <SubmitButton loading={uploading} text={`Add banner`} />
      </form>
    </div>
  );
};

export default AddSSPCampaignBanner;
