import { toast } from "react-toastify";

export const handleError = (error, message) => {
  console.error("Errore:", error);
  toast.error(message || "Si è verificato un errore. Riprova.");
};
