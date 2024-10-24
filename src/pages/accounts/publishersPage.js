import { useEffect, useRef, useState } from "react";
import { getPublishers, getUsers } from "../../controllers/userController";
import Spinner from "../../components/spinner";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../../components/sidebarItem";
import { BsSignpost2 } from "react-icons/bs";
import { LiaBuysellads } from "react-icons/lia";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { HiDotsVertical } from "react-icons/hi";
import { ImEarth } from "react-icons/im";
import { GrStatusPlaceholder } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";

const PublishersPage = () => {
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
    let path = `?limit=${limit}&page=${page}&keyword=${keyword}`;
    getPublishers(path).then((response) => {
      console.log();
      const rows = response.data.body.rows;
      const count = response.data.body.count;
      setData(rows);
      setCount(count);
      setLoading(false);
    });
  }, [page, keyword]);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl 2xl:text-3xl font-bold">Publishers</h1>
          <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
            Manage publishers Below
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/add-user/?role=publisher");
          }}
          className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
        >
          Add Publisher
        </button>
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-black rounded-t-2xl bg-opacity-40 dark:bg-opacity-10 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-base">Publishers ({count})</h1>
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
                  Email
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Phone
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Websites
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50"></th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item) => {
                return (
                  <tr>
                    <td className="text-start py-4">{item.name}</td>
                    <td className="text-start py-4">{item.email}</td>
                    <td className="text-start py-4">{item.phone}</td>
                    <td className="text-start py-4">{item.websites}</td>
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
                            <div ref={dropdownRef} className="popup-style">
                              <SidebarItem
                                icon={<ImEarth />}
                                path={`/websites/?uuid=${item.uuid}`}
                                title={"Websites"}
                              />
                              <SidebarItem
                                icon={<AiOutlineEdit />}
                                path={`/`}
                                title={"Edit publisher"}
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

export default PublishersPage;
