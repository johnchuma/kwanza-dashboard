import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ showModal, setShowModal, content, title }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <div>
          <div className="fixed z-40 w-screen  inset-0 bg-black overflow-auto bg-opacity-10 flex flex-col justify-center items-center">
            <motion.div
              initial={{ y: -600, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  ease: "linear",
                },
              }}
              exit={{
                y: -600,
                opacity: 0,
                transition: {
                  ease: "linear",
                },
              }}
              className="bg-white overflow-scroll z-50 w-6/12 2xl:w-5/12 min-h-48 max-h-[90vh] 2xl:max-h-[80vh] rounded-xl "
            >
              <div className="bg-background py-4 px-8">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-xl">{title}</h1>
                  <AiOutlineClose
                    onClick={() => {
                      setShowModal();
                    }}
                    className="text-muted cursor-pointer text-2xl"
                  />
                </div>
              </div>
              <div className=" py-4">{content}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
