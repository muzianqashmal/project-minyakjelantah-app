import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Penjemputan from "./pages/Penjemputan";
import DetailPenjemputan from "./pages/DetailPenjemputan";
import TambahData from "./pages/TambahData";
import Pelanggan from "./pages/Pelanggan";
import Riwayat from "./pages/Riwayat";
import Laporan from "./pages/Laporan";
import Pengaturan from "./pages/Pengaturan";

import Login from "./pages/auth/Login";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={<MainLayout />}
      >

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="tambah"
          element={<TambahData />}
        />

        <Route
          path="penjemputan"
          element={<Penjemputan />}
        />

        <Route
          path="penjemputan/:id"
          element={<DetailPenjemputan />}
        />

        <Route
          path="pelanggan"
          element={<Pelanggan />}
        />

        <Route
          path="riwayat"
          element={<Riwayat />}
        />

        <Route
          path="laporan"
          element={<Laporan />}
        />

        <Route
          path="pengaturan"
          element={<Pengaturan />}
        />

      </Route>

    </Routes>
  );
}

export default App;