import { useContext, useState } from "react";
import SubmitButton from "../../components/submitButton";
import TextForm from "../../components/textForm";
import { UserContext } from "../../layouts/dashboardLayout";
import { editUserInfo } from "../../controllers/userController";
import { showError } from "../../utils/showError";
import toast from "react-hot-toast";
import Back from "../../components/back";

const MyAccountInfo = () => {
  const { user } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);
  return (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">Account Details</h1>
        <p className="text-base text-muted dark:text-mutedLight">
          View and edit you account below
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
          };
          setUploading(true);
          editUserInfo(user.uuid, payload)
            .then((data) => {
              toast.success("Changes Saved successfully");
              setUploading(false);
            })
            .catch((err) => {
              showError(err);
            });
        }}
        className="bg-white dark:bg-darkLight py-12 rounded-xl mt-8 w-6/12 px-8"
      >
        <div className="space-y-1">
          <h1 className="text-lg font-bold">Manage your account Details</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            All fields are required
          </p>
        </div>
        <div className="space-y-4 my-6 mb-8">
          <TextForm
            placeholder={"Enter your name"}
            defaultValue={user.name}
            name={"name"}
            label={"Full name"}
          />
          <TextForm
            placeholder={"Email Address"}
            defaultValue={user.email}
            name={"email"}
            label={"Email address"}
          />
          <TextForm
            placeholder={"Phone nummber"}
            name={"phone"}
            defaultValue={user.phone}
            label={"Phone number"}
          />
        </div>
        <SubmitButton loading={uploading} text={"Save Changes"} />
      </form>
    </div>
  );
};

export default MyAccountInfo;
