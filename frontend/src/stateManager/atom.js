import { atom } from "jotai";
import axios from "axios";
import { handleError } from "../utility/errorHandler";
import { handleNotification } from "../utility/notificationHandler";

// IS LOADING
export const isLoadingAtom = atom(false);

// HOME PAGE
export const defaultHomePage = atom({
  heroSlider: [],
  firstIncipit: "",
  logo: "",
  firstDescription: "",
  sloganSubtitle: "",
  sloganTitle: "",
  secondDescription: "",
  scrollText: "",
  ctaTitle: "",
  ctaDescription: "",
  ctaButton: "",
  ctaLink: "",
});
export const homePageAtom = atom(defaultHomePage);
export const homePageDataAtom = atom(defaultHomePage);

export const homePageActionsAtom = atom(null, async (get, set, action) => {
  const setLoading = (value) => set(isLoadingAtom, value);

  switch (action.type) {
    case "GET":
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/homePage`
        );
        set(homePageAtom, response.data.homePage);
        set(homePageDataAtom, response.data.homePage);
      } catch (error) {
        handleError(error, "Errore durante il caricamento dei dati");
      } finally {
        setLoading(false);
      }
      break;

    case "PATCH":
      try {
        setLoading(true);
        const homePage = get(homePageAtom);
        const response = await axios.patch(
          `${import.meta.env.VITE_URL}/homePage/update`,
          homePage
        );
        set(homePageAtom, response.data);
        handleNotification("HomePage aggiornata correttamente!");
      } catch (error) {
        handleError(error, "Errore durante l'aggiornamento");
      } finally {
        setLoading(false);
      }
      break;

    case "PATCH_FIELD":
      const { name, value } = action.payload;
      const currentHomePage = get(homePageAtom);
      set(homePageAtom, {
        ...currentHomePage,
        [name]: value,
      });
      break;
  }
});

// COURSES PAGE
export const defaultCoursesPage = atom({
  heroImage: "",
  sloganTitle: "",
  iconFirstNumber: "",
  iconFirstTitle: "",
  iconSecondNumber: "",
  iconSecondTitle: "",
  iconThirdNumber: "",
  iconThirdTitle: "",
  firstSubtitle: "",
  firstDescription: "",
  gallerySlider: [],
});
export const coursesPageAtom = atom(defaultCoursesPage);
export const coursesPageDataAtom = atom(defaultCoursesPage);

export const coursesPageActionsAtom = atom(null, async (get, set, action) => {
  const setLoading = (value) => set(isLoadingAtom, value);

  switch (action.type) {
    case "GET":
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/coursesPage`
        );
        set(coursesPageAtom, response.data.coursesPage);
        set(coursesPageDataAtom, response.data.coursesPage);
      } catch (error) {
        handleError(error, "Errore durante il caricamento dei corsi");
      } finally {
        setLoading(false);
      }
      break;

    case "PATCH":
      try {
        setLoading(true);
        const coursesPage = get(coursesPageAtom);
        const response = await axios.patch(
          `${import.meta.env.VITE_URL}/coursesPage/update`,
          coursesPage
        );
        set(coursesPageAtom, response.data);
        handleNotification("Corsi aggiornati correttamente!");
      } catch (error) {
        handleError(error, "Errore durante l'aggiornamento");
      } finally {
        setLoading(false);
      }
      break;

    case "PATCH_FIELD":
      const { name, value } = action.payload;
      const currentCoursesPage = get(coursesPageAtom);
      set(coursesPageAtom, {
        ...currentCoursesPage,
        [name]: value,
      });
      break;
  }
});

// CATEGORIES PAGE
export const defaultCategoriesPage = [];
export const categoriesPageAtom = atom(defaultCategoriesPage);
export const categoriesPageDataAtom = atom(defaultCategoriesPage);

export const categoriesPageActionsAtom = atom(
  null,
  async (get, set, action) => {
    const setLoading = (value) => set(isLoadingAtom, value);

    switch (action.type) {
      case "GET":
        try {
          setLoading(true);
          const response = await axios.get(
            `${import.meta.env.VITE_URL}/categoriesPage`
          );
          set(categoriesPageAtom, response.data.categories);
          set(categoriesPageDataAtom, response.data.categories);
        } catch (error) {
          handleError(error, "Errore durante il caricamento delle categorie");
        } finally {
          setLoading(false);
        }
        break;

      case "GET_BY_ID":
        try {
          setLoading(true);
          const { id } = action.payload;
          const response = await axios.get(
            `${import.meta.env.VITE_URL}/categoriesPage/${id}`
          );
          return response.data.category;
        } catch (error) {
          handleError(error, "Errore durante il caricamento della categoria");
        } finally {
          setLoading(false);
        }
        break;

      case "POST":
        try {
          setLoading(true);
          const { categoryData } = action.payload;
          const response = await axios.post(
            `${import.meta.env.VITE_URL}/categoriesPage/create`,
            categoryData
          );
          const currentCategories = get(categoriesPageAtom);
          set(categoriesPageAtom, [
            ...currentCategories,
            response.data.category,
          ]);
          handleNotification("Categoria creata con successo");
        } catch (error) {
          handleError(error, "Errore durante la creazione della categoria");
        } finally {
          setLoading(false);
        }
        break;

      case "PATCH":
        try {
          setLoading(true);
          const { id, updateData } = action.payload;
          const response = await axios.patch(
            `${import.meta.env.VITE_URL}/categoriesPage/update/${id}`,
            updateData
          );
          const currentCategories = get(categoriesPageAtom);
          const updatedCategories = currentCategories.map((cat) =>
            cat._id === id ? response.data.category : cat
          );
          set(categoriesPageAtom, updatedCategories);
          handleNotification("Categoria aggiornata con successo");
        } catch (error) {
          handleError(error, "Errore durante l'aggiornamento della categoria");
        } finally {
          setLoading(false);
        }
        break;

      case "PATCH_FIELD":
        const { name, value } = action.payload;
        const currentCategoriesPage = get(categoriesPageAtom);
        set(categoriesPageAtom, {
          ...currentCategoriesPage,
          [name]: value,
        });
        break;

      case "DELETE":
        try {
          setLoading(true);
          const { id } = action.payload;
          await axios.delete(
            `${import.meta.env.VITE_URL}/categoriesPage/delete/${id}`
          );
          const currentCategories = get(categoriesPageAtom);
          const filteredCategories = currentCategories.filter(
            (cat) => cat._id !== id
          );
          set(categoriesPageAtom, filteredCategories);
          handleNotification("Categoria eliminata con successo");
        } catch (error) {
          handleError(error, "Errore durante l'eliminazione della categoria");
        } finally {
          setLoading(false);
        }
        break;
    }
  }
);
