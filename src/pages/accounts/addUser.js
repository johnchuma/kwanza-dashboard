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
import { useGetParams } from "../../utils/getParams";

const AddUser = () => {
  const [uploading, setUploading] = useState(false);
  const [searchParams] = useSearchParams();
  const params = useGetParams();
  const role = params.role;
  const uuid = params.uuid;
  const navigate = useNavigate();
  return (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">
          New {role || "User"}
        </h1>
        <p className="text-base text-muted dark:text-mutedLight">
          Enter {role || "User"} details below
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            role: role || e.target.role.value,
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            agency_uuid: uuid,
          };
          setUploading(true);
          registerUser(payload)
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
          <h1 className="text-lg font-bold">
            Register new {role || "User"} here
          </h1>
          <p className="text-base text-muted dark:text-mutedLight">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          {role == null && (
            <SelectForm
              placeholder={"Enter your role"}
              name={"role"}
              options={["admin", "publisher", "influencer"]}
              label={"Role"}
            />
          )}
          <TextForm
            placeholder={`Enter ${role || "User"} name`}
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
        <SubmitButton loading={uploading} text={`Add ${role || "User"}`} />
      </form>
    </div>
  );
};

export default AddUser;
