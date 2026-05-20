import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";

import React, { Suspense } from "react";

import Loading from "./components/Loading";

// Public
const LandingPage = React.lazy(() => import("./pages/LandingPage"));

// Petugas
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Penjemputan = React.lazy(() => import("./pages/Penjemputan"));
const Riwayat = React.lazy(() => import("./pages/Riwayat"));
const Pelanggan = React.lazy(() => import("./pages/Pelanggan"));
const Laporan = React.lazy(() => import("./pages/Laporan"));
const Pengaturan = React.lazy(() => import("./pages/Pengaturan"));

// Auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// Layout
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {

    return (
        <Suspense fallback={<Loading />}>

            <Routes>

                {/* Public */}
                <Route
                    path="/"
                    element={<LandingPage />}
                />

                {/* Auth */}
                <Route element={<AuthLayout />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/forgot"
                        element={<Forgot />}
                    />

                </Route>

                {/* Dashboard Petugas */}
                <Route element={<MainLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/penjemputan"
                        element={<Penjemputan />}
                    />

                    <Route
                        path="/riwayat"
                        element={<Riwayat />}
                    />

                    <Route
                        path="/pelanggan"
                        element={<Pelanggan />}
                    />

                    <Route
                        path="/laporan"
                        element={<Laporan />}
                    />

                    <Route
                        path="/pengaturan"
                        element={<Pengaturan />}
                    />

                </Route>

                {/* Not Found */}
                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </Suspense>
    );
}

export default App;