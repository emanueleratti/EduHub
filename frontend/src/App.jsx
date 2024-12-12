import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { HomeDashboard } from "./pages/HomeDashboard";
import { CoursesPage } from "./pages/CoursesPage";
import { CoursesDashboard } from "./pages/CoursesDashboard";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoriesDashboard } from "./pages/CategoriesDashboard";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/corsi" element={<CoursesPage />} />
        <Route path="/categorie" element={<CategoriesPage />} />
        <Route path="/dashboard/homepage" element={<HomeDashboard />} />
        <Route path="/dashboard/courses" element={<CoursesDashboard />} />
        <Route path="/dashboard/categories" element={<CategoriesDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
