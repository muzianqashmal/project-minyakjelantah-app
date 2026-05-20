import {
    RiDashboardFill,
    RiHistoryLine,
    RiSettings3Line
} from "react-icons/ri";

import {
    MdOutlineLocalShipping,
    MdPeopleAlt
} from "react-icons/md";

import { FaOilCan } from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const menuClass = ({ isActive }) =>
        `flex items-center rounded-xl p-4 transition-all duration-300 space-x-3
        ${isActive
            ? "bg-green-400 text-white font-bold shadow-lg"
            : "text-white/90 hover:bg-green-500 hover:text-white"
        }`;

    return (
        <div
            className="flex min-h-screen w-[290px] flex-col bg-green-700 p-6"
        >

            {/* Logo */}
            <div className="mb-10">

                <div className="flex items-center gap-3">

                    <div className="bg-green-500 p-3 rounded-2xl shadow-lg">
                        <FaOilCan className="text-2xl text-white" />
                    </div>

                    <div className="flex flex-col">

                        <span className="text-2xl font-extrabold text-white leading-tight">
                            Zathra Prima Energi
                        </span>

                        <span className="text-sm text-green-100">
                            Sistem Minyak Jelantah
                        </span>

                    </div>

                </div>

            </div>

            {/* Menu */}
            <div className="flex-1">

                <ul className="space-y-2">

                    <li>
                        <NavLink to="/" className={menuClass}>
                            <RiDashboardFill className="text-2xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/penjemputan" className={menuClass}>
                            <MdOutlineLocalShipping className="text-2xl" />
                            <span>Data Penjemputan</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/riwayat" className={menuClass}>
                            <RiHistoryLine className="text-2xl" />
                            <span>Riwayat</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/pelanggan" className={menuClass}>
                            <MdPeopleAlt className="text-2xl" />
                            <span>Pelanggan</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/laporan" className={menuClass}>
                            <RiDashboardFill className="text-2xl" />
                            <span>Laporan</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/pengaturan" className={menuClass}>
                            <RiSettings3Line className="text-2xl" />
                            <span>Pengaturan</span>
                        </NavLink>
                    </li>

                </ul>

            </div>

            {/* Footer */}
            <div className="mt-10 border-t border-green-500 pt-5">

                <div className="bg-green-500/40 rounded-2xl p-4 text-white">

                    <h1 className="font-bold text-lg">
                        Sistem Minyak Jelantah
                    </h1>

                    <p className="text-sm text-green-100 mt-1">
                        Dashboard pencatatan dan penjemputan minyak jelantah oleh petugas lapangan.
                    </p>

                </div>

                <div className="mt-5 text-center text-sm text-green-100">
                    © 2026 Zathra Prima Energi
                </div>

            </div>

        </div>
    );
}