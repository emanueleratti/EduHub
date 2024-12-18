import { atom } from "jotai";
import axios from "axios";
import { handleError } from "../utility/errorHandler";
import { handleNotification } from "../utility/notificationHandler";

export const authAtom = atom({
  isAuthenticated: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
});

export const authActionsAtom = atom(null, async (get, set, action) => {
  switch (action.type) {
    case "LOGIN":
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/auth/login`,
          action.payload
        );

        const { token, user } = response.data;

        console.log("Token salvato:", token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        set(authAtom, {
          isAuthenticated: true,
          user,
          token,
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        handleNotification("Login effettuato con successo!");
        return true;
      } catch (error) {
        handleError(error, "Errore durante il login");
        return false;
      }
      break;

    case "REGISTER":
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/auth/register`,
          action.payload
        );

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        set(authAtom, {
          isAuthenticated: true,
          user,
          token,
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        handleNotification("Registrazione effettuata con successo!");
        return true;
      } catch (error) {
        handleError(error, "Errore durante la registrazione");
        return false;
      }
      break;

    case "REFRESH_TOKEN":
      try {
        const currentToken = get(authAtom).token;
        if (!currentToken) return false;

        const decoded = jwtDecode(currentToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp - currentTime < 300) {
          const response = await axios.post(
            `${import.meta.env.VITE_URL}/auth/refresh-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${currentToken}`,
              },
            }
          );

          const { token, user } = response.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          set(authAtom, {
            isAuthenticated: true,
            user,
            token,
          });

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return true;
      } catch (error) {
        set(authAtom, {
          isAuthenticated: false,
          user: null,
          token: null,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        return false;
      }
      break;

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];

      set(authAtom, {
        isAuthenticated: false,
        user: null,
        token: null,
      });
      break;
  }
});
