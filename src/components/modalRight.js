import { AnimatePresence, motion } from "framer-motion";

const ModalRight = ({ showModal, setShowModal, content }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <div>
          <div className="fixed z-40  inset-0 bg-black overflow-auto bg-opacity-10 flex">
            <div
              className="w-8/12 h-screen bg-transparent "
              onClick={() => {
                setShowModal();
              }}
            ></div>
            <motion.div
              initial={{ x: 600 }}
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
              className="bg-white z-50 w-4/12 2xl:w-3/12 h-screen ms-auto px-8 py-5"
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
