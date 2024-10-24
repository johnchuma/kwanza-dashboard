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
import {
  linkWithZone,
  unlinkWithZone,
} from "../../controllers/sspBannersController";
import { getBannerZones } from "../../controllers/zonesController";
import Pagination from "../../components/pagination";

const LinkBannerWithZones = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const params = useGetParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    let path = `${params.uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    getBannerZones(path).then((response) => {
      const rows = response.data.body.rows;
      const count = response.data.body.count;
      setData(rows);
      setCount(count);
      setLoading(false);
    });
  };
  return (
    <div>
      <Back />
      <div className="space-y-2">
        <h1 className="text-4xl 2xl:text-3xl font-bold">Available Zones</h1>
        <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
          Showing zones with the same diminsions as banner
        </p>
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-black rounded-t-2xl bg-opacity-40 dark:bg-opacity-10 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-lg">Zones ({count})</h1>
          <input
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className="search-style"
            placeholder="Search here"
          />
        </div>
        <div className="px-6 py-5">
          <table className="w-full text-base  ">
            <thead>
              <tr>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Name
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Dimensions
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50"></th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item) => {
                return (
                  <tr>
                    <td className="text-start py-4">{item.name}</td>
                    <td className="text-start py-4">
                      {item.width}x{item.height}
                    </td>
                    <td className="text-start py-4">
                      <a
                        className="hover:underline  cursor-pointer text-primary"
                        href={item.pageUrl}
                        target="__blank"
                      >
                        Visit zone's page
                      </a>
                    </td>
                    <td className="text-start py-4">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={`switch-${item.uuid}`} // Unique ID for accessibility
                          className="sr-only" // Hide the default checkbox
                          defaultChecked={item.isLinked}
                          onChange={(e) => {
                            if (item.isLinked) {
                              unlinkWithZone({
                                zone_uuid: item.uuid,
                                banner_uuid: params.uuid,
                              }).then(() => {
                                getData();
                                toast.success("Unlinked successfully");
                              });
                            } else {
                              linkWithZone({
                                zone_uuid: item.uuid,
                                banner_uuid: params.uuid,
                              }).then(() => {
                                getData();
                                toast.success("Linked successfully");
                              });
                            }
                          }}
                        />
                        <div className="flex items-center">
                          <label
                            htmlFor={`switch-${item.uuid}`}
                            className={`flex items-center cursor-pointer w-12 h-6 bg-gray-200 rounded-full transition duration-200 ease-in-out ${
                              item.isLinked ? "bg-green-400" : ""
                            }`}
                          >
                            <span
                              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                item.isLinked ? "translate-x-6" : ""
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            limit={limit}
            count={count}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkBannerWithZones;
