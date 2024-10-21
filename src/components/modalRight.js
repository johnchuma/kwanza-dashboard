import { AnimatePresence, motion } from "framer-motion";

const ModalRight = ({ showModal, setShowModal, content, expanded }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <div>
          <div className="fixed z-40  inset-0 bg-black overflow-auto bg-opacity-10 flex">
            <div
              className="w-8/12 min-h-screen bg-transparent "
              onClick={() => {
                setShowModal();
              }}
            ></div>
            <motion.div
              initial={{
                x: 600,
                transition: {
                  ease: "linear",
                },
              }}
              animate={{
                x: 0,
                transition: {
                  ease: "linear",
                },
              }}
              exit={{
                x: 600,
                transition: {
                  ease: "linear",
                },
              }}
              className={`bg-white min-h-screen z-50 ${
                expanded ? "w-8/12 2xl:w-6/12" : "w-4/12 2xl:w-3/12 "
              }  ms-auto px-8 py-5 transition-all duration-500`}
            >
              {content}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalRight;
