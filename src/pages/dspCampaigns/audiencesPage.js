import { useContext, useEffect, useRef, useState } from "react";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../../components/sidebarItem";
import { BsTrash } from "react-icons/bs";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { HiDotsVertical } from "react-icons/hi";
import Back from "../../components/back";
import moment from "moment";
import { getLogs } from "../../controllers/logsController";
import { useGetParams } from "../../utils/getParams";
import {
  deleteAudience,
  getAudiences,
} from "../../controllers/audenciesController";
import toast from "react-hot-toast";
import { UserContext } from "../../layouts/dashboardLayout";
import Pagination from "../../components/pagination";

const AudiencesPage = () => {
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
  const params = useGetParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowOptions(false);
    });
  }, [dropdownRef]);
  useEffect(() => {
    findData();
  }, [page, keyword]);
  const findData = () => {
    setLoading(true);
    let path = `user/${params.uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    getAudiences(path).then((response) => {
      const rows = response.data.body.rows;
      const count = response.data.body.count;
      setData(rows);
      setCount(count);
      setLoading(false);
      setCount(count);
      setLoading(false);
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      {user.role != "advertiser" && <Back />}

      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl 2xl:text-3xl font-bold">Audiences</h1>
          <p className="text-sm text-muted dark:text-mutedLight">
            View system user audiences{" "}
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              navigate(`/add-audience/?uuid=${params.uuid}`);
            }}
            className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
          >
            Add Audience
          </button>
        </div>
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-darkLight rounded-t-2xl bg-opacity-40 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-lg">My audiences ({data.length})</h1>
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
                <th className="text-start text-muted dark:text-mutedLight">
                  Created At
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Audience
                </th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item, index) => {
                return (
                  <tr key={item.uuid}>
                    <td className="text-start py-4">
                      {moment(item.createdAt).fromNow()}
                    </td>
                    <td className="text-start py-4">{item.name}</td>
                    <td className="text-start py-4">
                      <div className="relative">
                        <HiDotsVertical
                          className=" cursor-pointer"
                          onClick={() => {
                            if (showOptions == false) {
                              setSelectedItem(item);
                              setShowOptions(!showOptions);
                            }
                          }}
                        />
                        {showOptions == true &&
                          selectedItem.uuid == item.uuid && (
                            <div
                              ref={dropdownRef}
                              className="bg-white absolute rounded-xl top-4 shadow-lg z-30 right-0 w-52 px-2 py-4"
                            >
                              <SidebarItem
                                icon={<BsTrash />}
                                path={`/`}
                                onClick={() => {
                                  deleteAudience(item.uuid).then(() => {
                                    findData();
                                    toast.success("Deleted Successfully");
                                    setSelectedItem(null);
                                  });
                                }}
                                title={"Delete"}
                              />
                            </div>
                          )}
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

export default AudiencesPage;
