import { useContext, useState } from "react";
import SubmitButton from "../../components/submitButton";
import TextForm from "../../components/textForm";
import { showError } from "../../utils/showError";
import toast from "react-hot-toast";
import SelectForm from "../../components/selectForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { registerUser } from "../../controllers/userController";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Back from "../../components/back";
import { addAgencyUser } from "../../controllers/agencyUserController";

const AddAgencyUser = () => {
  const [uploading, setUploading] = useState(false);
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const role = params.role;
  const { uuid } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">New agency user</h1>
        <p className="text-base text-muted dark:text-white dark:text-opacity-50">
          Enter user details below
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            agency_uuid: uuid,
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
          };
          setUploading(true);
          addAgencyUser(payload)
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
          <h1 className="text-lg font-bold">Register new agency user here</h1>
          <p className="text-base text-muted dark:text-white dark:text-opacity-50">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <TextForm
            placeholder={"Enter name"}
            name={"name"}
            label={"Full name"}
          />
          <TextForm
            placeholder={"Email Address"}
            name={"email"}
            label={"Email address"}
          />
          <TextForm
            placeholder={"Phone number"}
            name={"phone"}
            label={"Phone number"}
          />
        </div>
        <SubmitButton loading={uploading} text={`Add Agency User`} />
      </form>
    </div>
  );
};

export default AddAgencyUser;
