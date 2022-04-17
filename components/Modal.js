import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { XIcon } from "@heroicons/react/outline";
//import IconButton from "@mui/material/IconButton";
//import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
//import { getPostState } from "../atoms/postAtom";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const gifYouUp = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.15,
            ease: "easeOut",
        },
    },
};

const Modal = ({ handleClose, type, comp }) => {
    // const { data: session } = useSession();

    return (
        <Backdrop onClick={handleClose}>
            {type === "dropIn" && (
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="rounded flex flex-col drop-shadow-lg justify-center bg-black-100 w-full max-w-screen-xl	 mx-6"
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex items-center justify-between border-b border-black-300 px-4 py-2.5">
                        <h4 className="text-xl text-white">gggg</h4>
                        <button onClick={handleClose}>
                            <XIcon className="h-4 w-4 text-white" />
                        </button>
                    </div>

                    <div className="p-4 space-y-2">
                       {comp}
                    </div>

                </motion.div>
            )}

            {type === "gifYouUp" && (
                {/*<motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-l-lg flex bg-[#1D2226] w-full max-w-6xl -mt-[7vh] mx-6"
          variants={gifYouUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.img
            alt=""
            onDoubleClick={handleClose}
            src={post.photoUrl}
            className="object-contain max-h-[80vh] w-full max-w-3xl rounded-l-lg"
          />
          <div className="w-full md:w-3/5 bg-white dark:bg-[#1D2226] rounded-r-lg">
            <Post post={post} modalPost />
          </div>
        </motion.div> */}
            )}
        </Backdrop>
    );
};

export default Modal;