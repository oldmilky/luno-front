import toast from "react-hot-toast";

export const toastError = (message: string) => {
  const errorStyle = {
    background: "rgba(13, 14, 17, 0.92)",
    padding: "20px 30px 20px 30px",
    borderRadius: "20px",
    color: "#d6405e",
    fontSize: "16px",
    fontWeight: "600",
  };

  toast.error(message, { style: errorStyle });
};

export const toastSuccess = (message: string) => {
  const successStyle = {
    background: "rgba(13, 14, 17, 0.92)",
    padding: "20px 30px 20px 30px",
    borderRadius: "20px",
    color: "#72E292",
    fontSize: "16px",
    fontWeight: "600",
  };

  toast.success(message, { style: successStyle });
};
