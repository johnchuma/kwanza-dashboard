import { useContext, useEffect, useRef, useState } from "react";
import { getUsers } from "../../controllers/userController";
import Spinner from "../../components/spinner";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { getAgencies } from "../../controllers/agencyController";
import moment from "moment";
import { HiDotsVertical } from "react-icons/hi";
import SidebarItem from "../../components/sidebarItem";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { closePopupMenu } from "../../utils/closePopupMenu";
import { getAgencyUsers } from "../../controllers/agencyUserController";
import Back from "../../components/back";
import { UserContext } from "../../layouts/dashboardLayout";

const AgencyUsersPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const { user } = useContext(UserContext);
  const { uuid } = useParams();
  useEffect(() => {
    let path = `${uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    getAgencyUsers(path).then((response) => {
      console.log(response.data);
      const rows = response.data.body.rows;

      const count = response.data.body.count;
      setData(rows);
      setCount(count);
      setLoading(false);
    });
  }, [page, keyword]);

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
      {user.role != "agency user" && <Back />}

      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl 2xl:text-3xl font-bold">Agency Users</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Manage agency users Below{" "}
          </p>
        </div>
        <button
          onClick={() => {
            navigate(`/add-agency-user/${uuid}`);
          }}
          className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
        >
          Add agency user
        </button>
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-darkLight rounded-t-2xl bg-opacity-40 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-lg">Agency users ({count})</h1>
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
                  Phone
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
                    <td className="text-start py-4">{item.User.name}</td>
                    <td className="text-start py-4">{item.User.email}</td>
                    <td className="text-start py-4">{item.User.phone}</td>
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
                                icon={<AiOutlineDelete />}
                                title={"Delete User"}
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

export default AgencyUsersPage;
