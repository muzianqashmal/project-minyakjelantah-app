import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {

  const petugas = localStorage.getItem("petugas");

  if (!petugas) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="bg-white border-b px-8 py-5 flex justify-between items-center shadow-sm">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="text-slate-500 text-sm">
              Selamat datang kembali, Admin!
            </p>
          </div>

          <div className="bg-slate-100 px-5 py-3 rounded-xl flex items-center gap-3">

            <span className="text-slate-600">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>

            <span className="text-green-600 text-xl">
              📅
            </span>

          </div>

        </div>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
}