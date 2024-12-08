import { atom } from "jotai";

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

// IS LOADING
export const isLoadingAtom = atom(false);
