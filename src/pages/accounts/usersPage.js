import { useEffect, useState } from "react";
import { getUsers } from "../../controllers/userController";
import Spinner from "../../components/spinner";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const UsersPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let path = `?limit=${limit}&page=${page}&keyword=${keyword}`;
    getUsers(path).then((response) => {
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
          <h1 className="text-4xl 2xl:text-3xl font-bold">Users</h1>
          <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
            Manage Users Below
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/add-user");
          }}
          className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
        >
          Add User
        </button>
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-black rounded-t-2xl bg-opacity-40 dark:bg-opacity-10 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-lg">Users ({count})</h1>
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
                  Created At
                </th>
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
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item) => {
                return (
                  <tr key={item.uuid}>
                    <td className="text-start py-4">
                      {moment(item.createdAt).format("yyy,MMM DD")}
                    </td>
                    <td className="text-start py-4">{item.name}</td>
                    <td className="text-start py-4">{item.email}</td>
                    <td className="text-start py-4">{item.phone}</td>
                    <td className="text-start py-4">{item.role}</td>
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

export default UsersPage;
