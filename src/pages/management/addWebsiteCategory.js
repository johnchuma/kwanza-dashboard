import { useContext, useState } from "react";
import SubmitButton from "../../components/submitButton";
import TextForm from "../../components/textForm";
import { showError } from "../../utils/showError";
import toast from "react-hot-toast";
import SelectForm from "../../components/selectForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { registerUser } from "../../controllers/userController";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Back from "../../components/back";
import { addWebsiteCategory } from "../../controllers/websiteCategoriesController";

const AddWebsiteCategory = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">
          New Website category
        </h1>
        <p className="text-base text-muted dark:text-white dark:text-opacity-50">
          Enter website category details below
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            name: e.target.name.value,
          };
          setUploading(true);
          addWebsiteCategory(payload)
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
          <h1 className="text-lg font-bold">Add website category</h1>
          <p className="text-base text-muted dark:text-white dark:text-opacity-50">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <TextForm
            placeholder={"Enter category name"}
            name={"name"}
            label={"Category name"}
          />
        </div>
        <SubmitButton loading={uploading} text={`Add category`} />
      </form>
    </div>
  );
};

export default AddWebsiteCategory;
