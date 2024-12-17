import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { HomeDashboard } from "./pages/HomeDashboard";
import { CoursesPage } from "./pages/CoursesPage";
import { CoursesDashboard } from "./pages/CoursesDashboard";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoriesDashboard } from "./pages/CategoriesDashboard";
import { SingleCourseDashboard } from "./pages/SingleCourseDashboard";
import { SingleCoursePage } from "./pages/SingleCoursePage";
import { AboutDashboard } from "./pages/AboutDashboard";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/corsi" element={<CoursesPage />} />
        <Route path="/corsi/:category" element={<CategoriesPage />} />
        <Route path="/corsi/:category/:course" element={<SingleCoursePage />} />

        <Route path="/dashboard/homepage" element={<HomeDashboard />} />
        <Route path="/dashboard/courses" element={<CoursesDashboard />} />
        <Route path="/dashboard/categories" element={<CategoriesDashboard />} />
        <Route path="/dashboard/about" element={<AboutDashboard />} />
        <Route
          path="/dashboard/single-course"
          element={<SingleCourseDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
};
