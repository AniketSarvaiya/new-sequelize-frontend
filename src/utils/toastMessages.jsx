import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toasterrormsg = (msg) => {
  return toast.warning(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

const toastsuccessmsg = (msg) => {
  return toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
export { toasterrormsg, toastsuccessmsg };
