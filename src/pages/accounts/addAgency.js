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
import { addAgency } from "../../controllers/agencyController";

const AddAgency = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">New Agency</h1>
        <p className="text-base text-muted dark:text-mutedLight">
          Enter agency details below
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            name: e.target.name.value,
            email: e.target.email.value,
          };
          setUploading(true);
          addAgency(payload)
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
          <h1 className="text-lg font-bold">Register new agency here</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <TextForm
            placeholder={"Enter agency name"}
            name={"name"}
            label={"Full name"}
          />
          <TextForm
            placeholder={"Enter agency email Address"}
            name={"email"}
            label={"Agency email address"}
          />
        </div>
        <SubmitButton loading={uploading} text={`Add agency`} />
      </form>
    </div>
  );
};

export default AddAgency;
