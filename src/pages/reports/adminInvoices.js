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
import {
  addInvoicePayment,
  deleteInvoicePayment,
  getAdminInvoices,
} from "../../controllers/invoicesControllers";
import toast from "react-hot-toast";

const AdminInvoices = () => {
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
    getData();
  }, [page, keyword]);
  const getData = () => {
    let path = `?limit=${limit}&page=${page}&keyword=${keyword}`;
    getAdminInvoices(path).then((response) => {
      const rows = response.data.body.rows;
      const count = response.data.body.count;
      console.log(rows);
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
      <Back />
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
                  Publisher name
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Amount
                </th>
                <th className="text-start text-muted dark:text-white dark:text-opacity-50">
                  Is Paid
                </th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {data.map((item, index) => {
                return (
                  <tr>
                    <td className="text-start py-4">
                      {moment(item.createdAt).format("yyy, MMM DD")}
                    </td>
                    <td className="text-start py-4">{item.User.name}</td>
                    <td className="text-start py-4">{item.amount} TZS</td>
                    <td className="text-start py-2">
                      <div>
                        {item.InvoicePayment ? (
                          <Switch
                            onClick={() => {
                              deleteInvoicePayment(
                                `${item.InvoicePayment.uuid}/payment`
                              ).then((res) => {
                                getData();
                                toast.success("Payment record deleted");
                              });
                            }}
                            isActive={true}
                          />
                        ) : (
                          <Switch
                            onClick={() => {
                              addInvoicePayment(`${item.uuid}/payment`).then(
                                (res) => {
                                  getData();
                                  toast.success("Recorded Successfully");
                                }
                              );
                            }}
                            isActive={false}
                          />
                        )}
                      </div>
                    </td>
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
                              className="bg-white absolute rounded-xl top-4 shadow-lg z-30 right-0 w-64 px-2 py-4"
                            >
                              <SidebarItem
                                icon={<BsDownload />}
                                path={`/`}
                                title={"Download Invoice"}
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
          {/* <Pagination
            limit={limit}
            count={count}
            setPage={setPage}
            page={page}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminInvoices;
