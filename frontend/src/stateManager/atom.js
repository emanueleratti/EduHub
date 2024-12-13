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
export const defaultCategoriesPage = [
  {
    slug: "",
    title: "",
    titleExtended: "",
    subtitle: "",
    description: "",
    gallerySlider: [],
  },
];
export const categoriesPageAtom = atom(defaultCategoriesPage);
export const categoriesPageDataAtom = atom(defaultCategoriesPage);
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

          if (response.data && response.data.categories) {
            set(categoriesPageDataAtom, response.data.categories);
            set(categoriesPageAtom, response.data.categories);
          } else {
            console.error(
              "Dati categorie non trovati nella risposta:",
              response.data
            );
            handleError(null, "Struttura dati non valida");
          }
        } catch (error) {
          handleError(error, "Errore durante il caricamento delle categorie");
        } finally {
          setLoading(false);
        }
        break;

      case "GET_BY_SLUG":
        try {
          setLoading(true);
          const { slug } = action.payload;

          if (!slug) {
            throw new Error("Slug non valido");
          }

          const response = await axios.get(
            `${import.meta.env.VITE_URL}/categoriesPage/corsi/${slug}`
          );

          if (response.data && response.data.category) {
            set(currentCategoryAtom, response.data.category);
          } else {
            set(currentCategoryAtom, null);
            handleError(null, "Categoria non trovata");
          }
        } catch (error) {
          console.error("Error fetching category:", error);
          set(currentCategoryAtom, null);
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

          set(categoriesPageAtom, [
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

          const currentCategories = get(categoriesPageDataAtom);
          const filteredCategories = currentCategories.filter(
            (category) => category._id !== id
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

// COURSE PAGE
const defaultCoursePage = [
  {
    slug: "corso-rhinoceros",
    heroImage: "https://placehold.co/1920x700?text=Slider+1",
    title: "Rhinoceros",
    titleExtended: "Corso Rhinoceros",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan. Praesent sed bibendum nibh. Vivamus fermentum nunc arcu, id condimentum dolor placerat non. Integer id ligula libero. Morbi auctor nunc ipsum, vitae tempus velit iaculis ac. Nam iaculis sapien ac justo ultrices, quis auctor ligula porttitor. Phasellus ullamcorper enim et dui fringilla, nec dapibus quam commodo. Integer tempus ultrices lacus, at congue enim congue sit amet. Praesent ex dolor, condimentum nec porta a, ultrices nec turpis. Proin viverra quam quis maximus consectetur. Pellentesque dui tortor, consequat non tempor eget, tincidunt sed mauris.",
    highlightedText:
      "Proin viverra quam quis maximus consectetur. Pellentesque dui tortor, consequat non tempor eget, tincidunt sed mauris.",
    levels: [
      {
        title: "Livello 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. ",
        programListTitle: "PROGRAMMA CORSO LIVELLO 1",
        programFirstListItems:
          "<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li></ul>",
        programSecondListItems:
          "<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li></ul>",
        programThirdListItems:
          "<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li></ul>",
        GROUP: {
          price: 500,
          duration: "24 ore",
          description:
            "3 giornate da 8 ore<br/>Mattina: lezioni teoriche<br/>Pomeriggio: esercitazioni pratiche",
        },
        SINGLE: {
          price: 550,
          duration: "24 ore",
          description:
            "3 giornate da 8 ore<br/>Mattina: lezioni teoriche<br/>Pomeriggio: esercitazioni pratiche",
        },
        FRIENDS: {
          price: 450,
          duration: "24 ore",
          description:
            "3 giornate da 8 ore<br/>Mattina: lezioni teoriche<br/>Pomeriggio: esercitazioni pratiche",
        },
      },
    ],
  },
];

export const coursePageAtom = atom(defaultCoursePage);
export const coursePageDataAtom = atom(defaultCoursePage);
export const courseArrayAtom = atom([]);
export const currentCourseAtom = atom(null);

export const coursePageActionsAtom = atom(null, async (get, set, action) => {
  const setLoading = (value) => set(isLoadingAtom, value);

  switch (action.type) {
    case "GET":
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/coursePage`
        );

        set(courseArrayAtom, response.data.courses);
        set(coursePageDataAtom, response.data.courses);
        set(coursePageAtom, response.data.courses);
      } catch (error) {
        handleError(error, "Errore durante il caricamento dei corsi");
      } finally {
        setLoading(false);
      }
      break;

    // case "GET_BY_SLUG":
    //   try {
    //     setLoading(true);
    //     const { slug } = action.payload;

    //     if (!slug) {
    //       throw new Error("Slug non valido");
    //     }

    //     const response = await axios.get(
    //       `${import.meta.env.VITE_URL}/coursePage/corsi/${slug}`
    //     );

    //     if (response.data && response.data.course) {
    //       set(currentCourseAtom, response.data.course);
    //     } else {
    //       set(currentCourseAtom, null);
    //       handleError(null, "Corso non trovato");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching course:", error);
    //     set(currentCourseAtom, null);
    //     handleError(error, "Errore durante il caricamento del corso");
    //   } finally {
    //     setLoading(false);
    //   }
    //   break;

    case "POST":
      try {
        setLoading(true);
        const { courseData } = action.payload;

        const response = await axios.post(
          `${import.meta.env.VITE_URL}/coursePage/create`,
          courseData
        );

        const currentCourse = get(coursePageDataAtom);

        set(coursePageAtom, [...currentCourse, response.data.course]);

        set(coursePageAtom, defaultCoursePage);

        handleNotification("Corso creato con successo");
      } catch (error) {
        handleError(error, "Errore durante la creazione del corso");
      } finally {
        setLoading(false);
      }
      break;

    // case "PATCH":
    //   try {
    //     setLoading(true);
    //     const { id, updateData } = action.payload;

    //     const response = await axios.patch(
    //       `${import.meta.env.VITE_URL}/coursePage/update/${id}`,
    //       updateData
    //     );

    //     const currentCourse = get(coursePageDataAtom);
    //     const updatedCourse = currentCourse.map((course) =>
    //       course._id === id ? response.data.course : course
    //     );

    //     set(coursePageAtom, updatedCourse);

    //     handleNotification("Corso aggiornato con successo");
    //   } catch (error) {
    //     handleError(error, "Errore durante l'aggiornamento del corso");
    //   } finally {
    //     setLoading(false);
    //   }
    //   break;

    case "PATCH_FIELD":
      try {
        const { path, value } = action.payload;
        const currentState = { ...get(coursePageAtom) };

        let current = currentState;
        for (let i = 0; i < path.length - 1; i++) {
          if (!current[path[i]]) {
            current[path[i]] = {};
          }
          current = current[path[i]];
        }
        current[path[path.length - 1]] = value;

        set(coursePageAtom, currentState);
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

        const currentCourse = get(coursePageDataAtom);
        const filteredCourses = currentCourse.filter(
          (course) => course._id !== id
        );

        set(coursePageAtom, filteredCourses);

        handleNotification("Corso eliminato con successo");
      } catch (error) {
        handleError(error, "Errore durante l'eliminazione del corso");
      } finally {
        setLoading(false);
      }
      break;
  }
});
