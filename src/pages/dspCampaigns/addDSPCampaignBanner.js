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
import { addDSPCampaignBanner } from "../../controllers/dspBannersController";
import { BsImage } from "react-icons/bs";
import { getImageDimensions } from "../../utils/getWidthAndHeightOnImage";
import { FaFileZipper } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { isFileImage, isZipped } from "../../utils/checkExtensions";

const AddDSPCampaignBanner = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const params = useGetParams();
  const [categories, setCategories] = useState([]);
  const [isImage, setIsImage] = useState(true);
  const [pickedFiles, setPickedFiles] = useState([]); // Multiple files state
  const [dimensions, setDimensions] = useState([]);

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
          setUploading(true);

          if (isImage) {
            // Loop through multiple files and their dimensions
            await Promise.all(
              [...e.target.file.files].map(async (file) => {
                let dimensions = await getImageDimensions(file);

                var formData = new FormData(); // Create new FormData for each file
                formData.append("file", file);
                formData.append("width", dimensions.width);
                formData.append("height", dimensions.height);
                formData.append("storageType", e.target.storageType.value);
                formData.append(
                  "destinationURL",
                  e.target.destinationURL.value
                );
                formData.append("dsp_campaign_uuid", params.uuid);

                // Upload each image separately
                return addDSPCampaignBanner(formData)
                  .then((data) => {})
                  .catch((err) => {
                    console.log(err);
                  });
              })
            );
          } else {
            // Handle non-image files (e.g., zipped HTML) as a single upload
            var formData = new FormData();
            formData.set("width", e.target.width.value);
            formData.set("height", e.target.height.value);
            formData.set("file", e.target.file.files[0]);
            formData.set("storageType", e.target.storageType.value);
            formData.set("destinationURL", e.target.destinationURL.value);
            formData.set("dsp_campaign_uuid", params.uuid);

            addDSPCampaignBanner(formData)
              .then((data) => {
                toast.success("Zipped HTML file added successfully");
              })
              .catch((err) => {
                // showError(err);
                console.log(err);
              });
          }

          setUploading(false);
          navigate(-1); // Navigate back after uploads are completed
        }}
        className="bg-white dark:bg-darkLight py-12 rounded-xl mt-8 w-6/12 px-8"
      >
        <div className="space-y-1">
          <h1 className="text-lg font-bold">Add new banner</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <div className="space-y-2">
            <label className="text-muted">Banner Type</label>
            <select
              onChange={(e) => {
                setPickedFiles([]);
                setIsImage(e.target.value === "web");
              }}
              className="input-style"
              name={"storageType"}
            >
              <option value={"web"}>Image</option>
              <option value={"html"}>HTML</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-muted">Banner</label>
            <div className="w-full py-12 border-2 rounded-lg border-dashed border-rounded flex justify-center">
              <label htmlFor="file">
                {pickedFiles.length > 0 ? (
                  <div className="flex flex-wrap gap-4 justify-center">
                    {pickedFiles.map((file, index) =>
                      isImage ? (
                        <div
                          key={index}
                          className="flex flex-col items-center space-y-1"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            className="w-32 h-32 object-cover"
                          />
                          <p className="text-muted text-sm line-clamp-1 px-24 text-center">
                            {file.name}
                          </p>
                          {dimensions[index] && (
                            <p className="text-muted text-sm">
                              {dimensions[index].width}x
                              {dimensions[index].height}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="flex flex-col items-center space-y-2"
                        >
                          <FaFileZipper className="text-4xl text-muted h-12" />
                          <p className="text-muted text-sm">{file.name}</p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 items-center">
                    <BsImage className="text-4xl text-muted h-12" />
                    <p className="text-muted text-sm">
                      {isImage ? "Pick image banners" : "Pick zipped HTML file"}
                    </p>
                  </div>
                )}
              </label>
            </div>
            <input
              id="file"
              required
              type="file"
              multiple={isImage} // Allow multiple file selection for images
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (isImage) {
                  const validImages = files.filter((file) => isFileImage(file));
                  if (validImages.length !== files.length) {
                    toast.error("Some files are not images");
                  } else {
                    Promise.all(
                      validImages.map((file) =>
                        getImageDimensions(file).then((dim) => dim)
                      )
                    ).then((dimensionsArray) => {
                      setDimensions(dimensionsArray);
                      setPickedFiles(validImages);
                    });
                  }
                } else {
                  const zippedFile = files[0];
                  if (isZipped(zippedFile)) {
                    setPickedFiles([zippedFile]);
                  } else {
                    e.target.value = null;
                    toast.error("File selected is not a zipped folder");
                  }
                }
              }}
              name="file"
              className="sr-only"
            />
          </div>

          {isImage === false && (
            <>
              <TextForm
                placeholder={"Enter width"}
                name={"width"}
                inputType={"number"}
                label={"Width"}
              />
              <TextForm
                placeholder={"Enter height"}
                name={"height"}
                inputType={"number"}
                label={"Height"}
              />
            </>
          )}

          <TextForm
            placeholder={"Enter destination URL"}
            name={"destinationURL"}
            label={"Destination URL"}
          />
        </div>
        <SubmitButton loading={uploading} text={`Add banner(s)`} />
      </form>
    </div>
  );
};

export default AddDSPCampaignBanner;
