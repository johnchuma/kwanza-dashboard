import { useContext, useEffect, useRef, useState } from "react";
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
import { UserContext } from "../../layouts/dashboardLayout";
import { getUserInvoices } from "../../controllers/invoicesControllers";
import Pagination from "../../components/pagination";

const PublisherInvoicesPage = () => {
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
  const { user } = useContext(UserContext);
  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowOptions(false);
    });
  }, [dropdownRef]);
  useEffect(() => {
    let path = `${user.uuid}/?limit=${limit}&page=${page}&keyword=${keyword}`;
    getUserInvoices(path).then((response) => {
      const rows = response.data.body.rows;
      const count = response.data.body.count;
      console.log(rows);
      setData(rows);
      setCount(count);
      setLoading(false);
      setCount(count);
      setLoading(false);
    });
  }, [page, keyword]);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl 2xl:text-3xl font-bold">Invoices</h1>
          <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
            Manage publisher's invoices
          </p>
        </div>
        {user.role == "publisher" && (
          <button
            onClick={() => {
              navigate(`/add-invoice`);
            }}
            className="py-2 px-6 font-semibold rounded-lg bg-primary text-white"
          >
            Generate Invoice
          </button>
        )}
      </div>
      <div className="bg-white  dark:bg-darkLight rounded-2xl mt-4 ">
        <div className="bg-background dark:bg-black rounded-t-2xl bg-opacity-40 dark:bg-opacity-10 px-6 items-center py-4 flex justify-between">
          <h1 className="font-bold text-lg">Invoices ({data.length})</h1>
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
                  Invoice sent at
                </th>

                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Amount
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50"></th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item, index) => {
                return (
                  <tr>
                    <td className="text-start py-4">
                      {moment(item.createdAt).format("yyy, MMM DD")}
                    </td>
                    <td className="text-start py-4">{item.amount} TZS</td>
                    <td className="text-start py-4">
                      {item.InvoicePayment ? (
                        <button className="bg-green-200 w-24  px-3 py-1 rounded-lg text-green-700 font-bold">
                          Paid
                        </button>
                      ) : (
                        <button className="bg-red-100 w-32  px-3 py-1 rounded-lg text-red-700 font-bold">
                          On Process
                        </button>
                      )}
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

export default PublisherInvoicesPage;
