import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/admin/ProtectedRoute";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Courses from "./pages/public/Courses";
import CourseDetails from "./pages/public/CourseDetails";
import Contact from "./pages/public/Contact";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminCourses from "./pages/admin/Courses";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";
import Enrollments from "./pages/admin/Enrollments";
import EnrollmentDetails from "./pages/admin/EnrollmentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/courses/:slug"
            element={<CourseDetails />}
          />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* Protected Admin */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            <Route
              path="courses"
              element={<AdminCourses />}
            />

            <Route
              path="courses/new"
              element={<AddCourse />}
            />

            <Route
              path="courses/:id/edit"
              element={<EditCourse />}
            />

            <Route
              path="enrollments"
              element={<Enrollments />}
            />

            <Route
              path="enrollments/:id"
              element={<EnrollmentDetails />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;