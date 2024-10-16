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

const SettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowOptions(false);
    });
  }, [dropdownRef]);
  useEffect(() => {
    getWebsiteCategories().then((response) => {
      console.log();
      const rows = response.data.body;
      setData(rows);
      setCount(count);
      setLoading(false);
    });
  }, [page, keyword]);
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
        }}
        className="bg-white dark:bg-darkLight py-10 rounded-xl mt-8 w-6/12 px-8"
      >
        <div className="space-y-1">
          <h1 className="text-lg font-bold">Publisher's payment plan</h1>
        </div>
        <div className="space-y-4 my-4 mb-8">
          <TextForm
            placeholder={"Enter amount"}
            name={"clickPayment"}
            label={"Payment per click/1000 impressions "}
          />
        </div>
        <SubmitButton text={`Save Changes`} />
      </form>
    </div>
  );
};

export default SettingsPage;
