import { useEffect, useRef, useState } from "react";
import { getUsers } from "../../controllers/userController";
import Spinner from "../../components/spinner";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import { deleteAgency, getAgencies } from "../../controllers/agencyController";
import moment from "moment";
import { HiDotsVertical } from "react-icons/hi";
import SidebarItem from "../../components/sidebarItem";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { RiAdvertisementLine } from "react-icons/ri";
import toast from "react-hot-toast";

const AgenciesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    getData();
  }, [page, keyword]);
  const getData = () => {
    let path = `?limit=${limit}&page=${page}&keyword=${keyword}`;
    getAgencies(path).then((response) => {
      console.log(response.data);
      const rows = response.data.body.rows;

      const count = response.data.body.count;
      setData(rows);
      setCount(count);
      setLoading(false);
    });
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowOptions(false);
    });
  }, [dropdownRef]);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl 2xl:text-3xl  font-bold">Agencies</h1>
          <p className="text-sm text-muted dark:text-mutedLight">
            Manage agencies Below
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/add-agency");
          }}
          className="py-2 px-6 font-semibold rounded-lg  bg-primary text-white"
        >
          Add Agency
        </button>
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-darkLight rounded-t-2xl bg-opacity-40 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-lg">Agencies ({count})</h1>
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
                  Registered At
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Name
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Email
                </th>
                <th className="text-start text-muted dark:text-mutedLight">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item) => {
                return (
                  <tr>
                    <td className="text-start py-4">
                      {moment(item.createdAt).format("yyy, MMM DD")}
                    </td>
                    <td className="text-start py-4">{item.name}</td>
                    <td className="text-start py-4">{item.email}</td>
                    <td className="text-start py-4">
                      {item.isMain ? (
                        <button
                          title="Advertisers who self onboard will be assigned to the main agency"
                          className="text-primary w-24 text-sm  bg-primary bg-opacity-20 px-3 py-1 rounded-lg"
                        >
                          Main
                        </button>
                      ) : (
                        <button className="text-gray-700 w-24 text-sm  bg-gray-500 bg-opacity-20 px-3 py-1 rounded-lg">
                          Normal
                        </button>
                      )}
                    </td>
                    <td className="text-start py-4">
                      <div className="relative">
                        <HiDotsVertical
                          className=" cursor-pointer"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowOptions(!showOptions);
                          }}
                        />
                        {showOptions == true &&
                          selectedItem.uuid == item.uuid && (
                            <div
                              ref={dropdownRef}
                              className="bg-white absolute rounded-xl top-4 shadow-lg z-30 right-0 w-52 px-2 py-4"
                            >
                              <SidebarItem
                                icon={<RiAdvertisementLine />}
                                path={`/agency/advertisers/?uuid=${item.uuid}`}
                                title={"Advertisers"}
                              />
                              <SidebarItem
                                icon={<AiOutlineUser />}
                                path={`/agency/${item.uuid}/users`}
                                title={"Agency Users"}
                              />
                              <SidebarItem
                                icon={<AiOutlineDelete />}
                                onClick={() => {
                                  deleteAgency(item.uuid).then((res) => {
                                    getData();
                                    toast.success("Deleted successfully");
                                  });
                                }}
                                title={"Delete Agency"}
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

export default AgenciesPage;
