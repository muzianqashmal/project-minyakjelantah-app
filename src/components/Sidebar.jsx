import {
    MdDashboard,
    MdOutlineLocalShipping,
    MdHistory,
    MdPeople,
    MdAssessment,
    MdSettings
} from "react-icons/md";

import { Link } from "react-router-dom";

export default function Sidebar() {

    const menu = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <MdDashboard />
        },
        {
            title: "Penjemputan",
            path: "/penjemputan",
            icon: <MdOutlineLocalShipping />
        },
        {
            title: "Riwayat",
            path: "/riwayat",
            icon: <MdHistory />
        },
        {
            title: "Pelanggan",
            path: "/pelanggan",
            icon: <MdPeople />
        },
        {
            title: "Laporan",
            path: "/laporan",
            icon: <MdAssessment />
        },
        {
            title: "Pengaturan",
            path: "/pengaturan",
            icon: <MdSettings />
        }
    ];

    return (

        <div className="w-64 min-h-screen bg-green-700 text-white p-6">

            <h1 className="text-4xl font-bold leading-tight">
                Zathra Prima Energi
            </h1>

            <div className="space-y-3 mt-14">

                {menu.map((item, index) => (

                    <Link
                        key={index}
                        to={item.path}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-800 transition-all"
                    >

                        <div className="text-2xl">
                            {item.icon}
                        </div>

                        <h1>
                            {item.title}
                        </h1>

                    </Link>

                ))}

            </div>

        </div>

    );

}