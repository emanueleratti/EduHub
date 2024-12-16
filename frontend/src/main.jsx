import "./index.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import { StrictMode } from "react";
import { Provider } from "jotai";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { Loader } from "./components/Loader/Loader.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <App />
      <Loader />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </Provider>
  </StrictMode>
);
