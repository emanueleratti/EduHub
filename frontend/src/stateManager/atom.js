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

// ABOUT PAGE
export const defaultAbout = atom({
  aboutTitle: "",
  aboutSubtitle: "",
  aboutDescription: "",
  aboutImage: "",
  contactTitle: "",
  contactSubtitle: "",
  contactDescription: "",
  contactImage: "",
});
export const aboutAtom = atom(defaultAbout);
export const aboutDataAtom = atom(defaultAbout);

export const aboutActionsAtom = atom(null, async (get, set, action) => {
  const setLoading = (value) => set(isLoadingAtom, value);

  switch (action.type) {
    case "GET":
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/aboutPage`
        );
        set(aboutAtom, response.data.aboutPage);
        set(aboutDataAtom, response.data.aboutPage);
      } catch (error) {
        handleError(error, "Errore durante il caricamento dei dati");
      } finally {
        setLoading(false);
      }
      break;

    case "PATCH":
      try {
        setLoading(true);
        const about = get(aboutAtom);
        const response = await axios.patch(
          `${import.meta.env.VITE_URL}/aboutPage/update`,
          about
        );
        set(aboutAtom, response.data);
        handleNotification("About aggiornato correttamente!");
      } catch (error) {
        handleError(error, "Errore durante l'aggiornamento");
      } finally {
        setLoading(false);
      }
      break;

    case "PATCH_FIELD":
      const { name, value } = action.payload;
      const currentAbout = get(aboutAtom);
      set(aboutAtom, {
        ...currentAbout,
        [name]: value,
      });
      break;
  }
});

// CATEGORIES PAGE
export const defaultCategoriesPage = {
  slug: "",
  title: "",
  titleExtended: "",
  subtitle: "",
  description: "",
  gallerySlider: [],
  isTemplate: false,
};
export const categoriesPageAtom = atom(defaultCategoriesPage);
export const categoriesPageDataAtom = atom([]);
export const currentCategoryAtom = atom(null);

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
          set(categoriesPageDataAtom, response.data.categories);
        } catch (error) {
          handleError(error, "Errore durante il caricamento delle categorie");
        } finally {
          setLoading(false);
        }
        break;

      case "GET_BY_CATEGORY":
        try {
          setLoading(true);
          const { category } = action.payload;
          const response = await axios.get(
            `${import.meta.env.VITE_URL}/categoriesPage/${category}`
          );
          set(currentCategoryAtom, response.data.category);
          set(categoriesPageAtom, response.data.category);
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
          const currentCategories = get(categoriesPageDataAtom);
          set(categoriesPageDataAtom, [
            ...currentCategories,
            response.data.category,
          ]);
          set(categoriesPageAtom, defaultCategoriesPage);
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
          const currentCategories = get(categoriesPageDataAtom);
          const updatedCategories = currentCategories.map((category) =>
            category._id === id ? response.data.category : category
          );
          set(categoriesPageDataAtom, updatedCategories);
          set(categoriesPageAtom, defaultCategoriesPage);
          handleNotification("Categoria aggiornata con successo");
        } catch (error) {
          handleError(error, "Errore durante l'aggiornamento della categoria");
        } finally {
          setLoading(false);
        }
        break;

      case "PATCH_FIELD":
        const { name, value } = action.payload;
        const currentCategory = get(categoriesPageAtom);
        set(categoriesPageAtom, {
          ...currentCategory,
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
          const currentCategories = get(categoriesPageDataAtom);
          const filteredCategories = currentCategories.filter(
            (category) => category._id !== id
          );
          set(categoriesPageDataAtom, filteredCategories);
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

// SINGLE COURSE PAGE
export const defaultSingleCoursePage = {
  slug: "",
  category: "",
  heroImage: "",
  title: "",
  titleExtended: "",
  description: "",
  highlightedText: "",
  levels: [
    {
      title: "",
      description: "",
      programListTitle: "",
      programFirstListItems: [],
      programSecondListItems: [],
      programThirdListItems: [],
      GROUP: {
        price: 0,
        duration: "",
        description: "",
      },
      SINGLE: {
        price: 0,
        duration: "",
        description: "",
      },
      FRIENDS: {
        price: 0,
        duration: "",
        description: "",
      },
    },
  ],
  isTemplate: false,
};

export const singleCoursePageAtom = atom(defaultSingleCoursePage);
export const singleCoursePageDataAtom = atom([]);
export const currentSingleCourseAtom = atom(null);

export const singleCoursePageActionsAtom = atom(
  null,
  async (get, set, action) => {
    const setLoading = (value) => set(isLoadingAtom, value);

    switch (action.type) {
      case "GET":
        try {
          setLoading(true);
          const response = await axios.get(
            `${import.meta.env.VITE_URL}/singleCoursePage`
          );
          set(singleCoursePageDataAtom, response.data.courses);
        } catch (error) {
          handleError(error, "Errore durante il caricamento dei corsi");
        } finally {
          setLoading(false);
        }
        break;

      case "GET_BY_COURSE":
        try {
          setLoading(true);
          const { course } = action.payload;
          const response = await axios.get(
            `${import.meta.env.VITE_URL}/categoriesPage/${course}`
          );
          set(currentSingleCourseAtom, response.data.course);
          set(singleCoursePageAtom, response.data.course);
        } catch (error) {
          handleError(error, "Errore durante il caricamento della categoria");
        } finally {
          setLoading(false);
        }
        break;

      case "POST":
        try {
          setLoading(true);
          const { courseData } = action.payload;
          const response = await axios.post(
            `${import.meta.env.VITE_URL}/singleCoursePage/create`,
            courseData
          );
          const currentCourses = get(singleCoursePageDataAtom);
          set(singleCoursePageDataAtom, [
            ...currentCourses,
            response.data.course,
          ]);
          set(singleCoursePageAtom, defaultSingleCoursePage);
          handleNotification("Corso creato con successo");
        } catch (error) {
          handleError(error, "Errore durante la creazione del corso");
        } finally {
          setLoading(false);
        }
        break;

      case "PATCH":
        try {
          setLoading(true);
          const { id, updateData } = action.payload;
          const response = await axios.patch(
            `${import.meta.env.VITE_URL}/singleCoursePage/update/${id}`,
            updateData
          );
          const currentCourses = get(singleCoursePageDataAtom);
          const updatedCourses = currentCourses.map((course) =>
            course._id === id ? response.data.course : course
          );
          set(singleCoursePageDataAtom, updatedCourses);
          set(singleCoursePageAtom, defaultSingleCoursePage);
          handleNotification("Corso aggiornato con successo");
        } catch (error) {
          handleError(error, "Errore durante l'aggiornamento del corso");
        } finally {
          setLoading(false);
        }
        break;

      case "PATCH_FIELD":
        try {
          const { name, value } = action.payload;
          const currentCourse = get(singleCoursePageAtom);

          // Gestione campi nidificati
          if (name.includes(".")) {
            const parts = name.split(".");
            const newCourse = { ...currentCourse };
            let current = newCourse;

            for (let i = 0; i < parts.length - 1; i++) {
              if (Array.isArray(current[parts[i]])) {
                // Se è un array, mantieni l'array esistente o creane uno nuovo
                current[parts[i]] = current[parts[i]] || [];
                // Assicurati che l'elemento dell'array esista
                current[parts[i]][0] = current[parts[i]][0] || {};
                current = current[parts[i]][0];
              } else {
                // Se è un oggetto, mantieni l'oggetto esistente o creane uno nuovo
                current[parts[i]] = current[parts[i]] || {};
                current = current[parts[i]];
              }
            }
            current[parts[parts.length - 1]] = value;
            set(singleCoursePageAtom, newCourse);
          } else {
            set(singleCoursePageAtom, {
              ...currentCourse,
              [name]: value,
            });
          }
        } catch (error) {
          console.error("Error in PATCH_FIELD:", error);
        }
        break;

      case "DELETE":
        try {
          setLoading(true);
          const { id } = action.payload;
          await axios.delete(
            `${import.meta.env.VITE_URL}/coursePage/delete/${id}`
          );
          const currentCourses = get(singleCoursePageDataAtom);
          const filteredCourses = currentCourses.filter(
            (course) => course._id !== id
          );
          set(singleCoursePageDataAtom, filteredCourses);
          handleNotification("Corso eliminato con successo");
        } catch (error) {
          handleError(error, "Errore durante l'eliminazione del corso");
        } finally {
          setLoading(false);
        }
        break;
    }
  }
);
