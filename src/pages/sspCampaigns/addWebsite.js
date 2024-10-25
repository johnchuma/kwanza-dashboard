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
import { addWebsite } from "../../controllers/websitesController";
import { useGetParams } from "../../utils/getParams";
import { getWebsiteCategories } from "../../controllers/websiteCategoriesController";

const AddWebsite = () => {
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
        <h1 className="text-4xl 2xl:text-3xl font-bold">New Website</h1>
        <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
          Enter website details below
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            website: e.target.website.value,
            type: e.target.type.value,
            category_uuid: e.target.category.value,
            user_uuid: params.uuid,
          };
          console.log(payload);
          setUploading(true);
          addWebsite(payload)
            .then((res) => {
              toast.success("added successfully");
              navigate(`/zones/?uuid=${res.data.body.uuid}`);
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
          <h1 className="text-lg font-bold">Add website </h1>
          <p className="text-base text-muted dark:text-white dark:text-opacity-50">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <SelectForm
            placeholder={"Enter website name"}
            name={"category"}
            label={"Category"}
            values={categories.map((item) => item.uuid)}
            options={categories.map((item) => item.name)}
          />
          <SelectForm
            placeholder={"Enter website type"}
            name={"type"}
            label={"Type"}
            options={["Mass", "Premium"]}
          />
          <TextForm
            placeholder={"Enter website name"}
            name={"website"}
            label={"Website name"}
          />
        </div>
        <SubmitButton loading={uploading} text={`Add Website`} />
      </form>
    </div>
  );
};

export default AddWebsite;
