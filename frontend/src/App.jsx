import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { HomePageDashboard } from "./pages/HomePageDashboard";
import { CoursesPage } from "./pages/CoursesPage";
import { CoursesPageDashboard } from "./pages/CoursesPageDashboard";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/corsi" element={<CoursesPage />} />
        <Route path="/dashboard/homepage" element={<HomePageDashboard />} />
        <Route path="/dashboard/courses" element={<CoursesPageDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
