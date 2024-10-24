import { IoDocumentAttachOutline } from "react-icons/io5";
import SidebarItem from "../sidebarItem";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { UserContext } from "../../layouts/dashboardLayout";
import { useContext } from "react";

const SidebarLegalSection = () => {
  const { user, setShowPrivacyModal, setShowTermsModal } =
    useContext(UserContext);
  return (
    <div className="pt-5">
      <h1 className="font-bold text-xs text-muted dark:text-white dark:text-opacity-50 dark:text-white dark:text-opacity-80 mb-2">
        LEGAL DOCUMENTS
      </h1>
      <SidebarItem
        icon={<MdOutlinePrivacyTip />}
        title={"Privacy Policy"}
        onClick={() => {
          setShowPrivacyModal(true);
        }}
        path="/privacy-policy"
      />
      <SidebarItem
        icon={<IoDocumentAttachOutline />}
        title={"Terms of use"}
        onClick={() => {
          setShowTermsModal(true);
        }}
        path="/terms-of-use"
      />
    </div>
  );
};

export default SidebarLegalSection;
