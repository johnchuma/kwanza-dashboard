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

const AddZone = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const params = useGetParams();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getWebsiteCategories().then((response) => {
      setCategories(response.data.body);
    });
  }, []);
  return (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">New Zone</h1>
        <p className="text-base text-muted dark:text-mutedLight">
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
            height: e.target.height.value,
            width: e.target.width.value,
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
          <p className="text-base text-muted dark:text-mutedLight">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <TextForm
            placeholder={"Enter zone name"}
            name={"name"}
            label={"Zone name"}
          />
          <TextForm
            placeholder={"Enter page url"}
            name={"pageUrl"}
            label={"Page URL where this zone is found"}
          />
          <TextForm
            placeholder={"Enter width"}
            name={"width"}
            label={"Width"}
          />
          <TextForm
            placeholder={"Enter height"}
            name={"height"}
            label={"Height"}
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
