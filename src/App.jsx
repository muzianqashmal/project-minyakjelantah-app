import {
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import LandingPage from "./pages/LandingPage";

import Dashboard from "./pages/Dashboard";
import Penjemputan from "./pages/Penjemputan";

import Login from "./pages/auth/Login";

function App() {

  return (

    <Routes>

      {/* Landing */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Dashboard */}
      <Route
        path="/"
        element={<MainLayout />}
      >

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="penjemputan"
          element={<Penjemputan />}
        />

      </Route>

    </Routes>

  );

}

export default App;