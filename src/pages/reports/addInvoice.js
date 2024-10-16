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

const AddInvoice = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // getWebsiteCategories().then((response) => {
    //   setCategories(response.data.body);
    // });
  }, []);
  return (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">Send Invoice</h1>
        <p className="text-base text-muted dark:text-mutedLight">
          Enter payment details below
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
          <h1 className="text-lg font-bold">Payment Request</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <TextForm
            placeholder={"Enter amount name"}
            name={"amount"}
            label={"Amount"}
          />
        </div>
        <SubmitButton loading={uploading} text={`Send Request`} />
      </form>
    </div>
  );
};

export default AddInvoice;
