import { toast } from "react-toastify";

const displayToast = (message, type) => {
  if (type == "success") {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      draggable: false,
    });
  } else if (type == "error") {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      draggable: false,
    });
  } else {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      draggable: false,
    });
  }
};

export default displayToast;
