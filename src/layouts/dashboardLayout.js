import { Outlet, useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/dashboardNavbar";
import { createContext, useEffect, useState } from "react";
import { deleteTokens, getTokens } from "../utils/authStore";
import { getMyInfo } from "../controllers/userController";
import Loader from "../components/loader";
import Sidebar from "../components/sidebars/adminSidebar";
import AdminSidebar from "../components/sidebars/adminSidebar";
import AdvertiserSidebar from "../components/sidebars/advertiserSidebar";
import PublisherSidebar from "../components/sidebars/publisherSidebar";
import AgencySidebar from "../components/sidebars/agencySidebar";
import Modal from "../components/modal";
import PrivacyPolicy from "../components/legal documentation/privacyPolicy";
import TermsOfUse from "../components/legal documentation/termsOfUse";
export const UserContext = createContext();
export const PublisherContext = createContext();
const DashboardLayout = () => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = getTokens();
    if (token) {
      getMyInfo()
        .then((response) => {
          const data = response.data.body;
          console.log(data);
          setLoading(false);
          setUser(data);
        })
        .catch((e) => {
          deleteTokens();
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <UserContext.Provider
      value={{ user, setShowPrivacyModal, setShowTermsModal }}
    >
      <PublisherContext.Provider value={{ revenue, setRevenue }}>
        <Modal
          title={"Privacy Policy"}
          setShowModal={() => {
            setShowPrivacyModal(false);
          }}
          showModal={showPrivacyModal}
          content={
            <div>
              <PrivacyPolicy />
            </div>
          }
        />
        <Modal
          title={"Terms and Conditions"}
          setShowModal={() => {
            setShowTermsModal(false);
          }}
          showModal={showTermsModal}
          content={
            <div>
              <TermsOfUse />
            </div>
          }
        />
        <div
          className={`${isDark ? "dark" : "light"} transition-all duration-200`}
        >
          <div className="flex text-dark dark:text-white">
            <div className="bg-white dark:bg-dark w-[19.5%] 2xl:w-[14%] border-r border-muted border-opacity-25 fixed h-screen">
              {user.role == "advertiser" && <AdvertiserSidebar />}
              {user.role == "publisher" && <PublisherSidebar />}
              {user.role == "admin" && <AdminSidebar />}
              {user.role == "agency user" && <AgencySidebar />}
            </div>
            <div className="bg-background dark:bg-dark w-[80.5%] 2xl:w-[86%]  ms-auto min-h-screen  ">
              <div className="fixed w-[80.5%] 2xl:w-[86%]  ms-auto">
                <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:w-[95%] mx-auto bg-background dark:bg-dark bg-opacity-85">
                  <DashboardNavbar isDark={isDark} setIsDark={setIsDark} />
                </div>
              </div>
              <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:w-[95%] 2xl:w-8/12 mx-auto">
                <div className="pt-20 mb-24 ">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublisherContext.Provider>
    </UserContext.Provider>
  );
};

export default DashboardLayout;
