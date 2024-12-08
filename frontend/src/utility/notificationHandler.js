import { toast } from "react-toastify";

export const handleNotification = (message) => {
  toast.success(message || "Operazione completata con successo!");
};
