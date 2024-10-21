import { useEffect, useRef, useState } from "react";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../../components/sidebarItem";
import { BsDownload, BsTrash } from "react-icons/bs";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { HiDotsVertical } from "react-icons/hi";
import moment from "moment";
import Back from "../../components/back";
import { getWebsiteCategories } from "../../controllers/websiteCategoriesController";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Switch from "../../components/switch";
import TextForm from "../../components/textForm";
import SubmitButton from "../../components/submitButton";
import {
  getSettings,
  updateSetting,
} from "../../controllers/settingsController";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    getSettings().then((response) => {
      setData(response.data.body);
      setLoading(false);
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      {/* <Back /> */}
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl 2xl:text-3xl font-bold">System Settings</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Manage system settings
          </p>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          const payload = {
            amount: e.target.amount.value,
          };
          updateSetting(payload).then((res) => {
            setUploading(false);
            toast.success("Saved successfully");
            getData();
          });
        }}
        className="bg-white dark:bg-darkLight py-10 rounded-xl mt-8 w-6/12 px-8"
      >
        <div className="space-y-1">
          <h1 className="text-lg font-bold">Publisher's payment plan</h1>
        </div>
        <div className="flex space-x-4 items-center">
          <TextForm
            placeholder={"Enter amount"}
            defaultValue={data?.publisherPayment || ""}
            name={"amount"}
            label={"Payment per click/1000 impressions "}
          />
          <h1 className="mt-5">TZS</h1>
        </div>
        <SubmitButton loading={uploading} text={`Save Changes`} />
      </form>
    </div>
  );
};

export default SettingsPage;
