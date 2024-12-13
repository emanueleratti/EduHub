import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { HomeDashboard } from "./pages/HomeDashboard";
import { CoursesPage } from "./pages/CoursesPage";
import { CoursesDashboard } from "./pages/CoursesDashboard";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoriesDashboard } from "./pages/CategoriesDashboard";
import { CourseDashboard } from "./pages/CourseDashboard";
import { CoursePage } from "./pages/CoursePage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/corsi" element={<CoursesPage />} />
        <Route path="/corsi/:slug" element={<CategoriesPage />} />

        <Route path="/corso-rhinoceros" element={<CoursePage />} />
        <Route path="/dashboard/homepage" element={<HomeDashboard />} />
        <Route path="/dashboard/courses" element={<CoursesDashboard />} />
        <Route path="/dashboard/categories" element={<CategoriesDashboard />} />
        <Route path="/dashboard/course" element={<CourseDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
