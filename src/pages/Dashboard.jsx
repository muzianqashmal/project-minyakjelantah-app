import {
    FaOilCan,
    FaUsers,
    FaMoneyBillWave
} from "react-icons/fa";

import {
    MdOutlineLocalShipping
} from "react-icons/md";

export default function Dashboard() {

    const cards = [
        {
            title: "Total Penjemputan",
            value: "120",
            icon: <MdOutlineLocalShipping />,
            bg: "bg-blue-100",
            text: "text-blue-600"
        },
        {
            title: "Total Liter",
            value: "2.450 L",
            icon: <FaOilCan />,
            bg: "bg-yellow-100",
            text: "text-yellow-600"
        },
        {
            title: "Total Pelanggan",
            value: "35",
            icon: <FaUsers />,
            bg: "bg-green-100",
            text: "text-green-600"
        },
        {
            title: "Pendapatan",
            value: "Rp 12 Jt",
            icon: <FaMoneyBillWave />,
            bg: "bg-red-100",
            text: "text-red-600"
        }
    ];

    return (
        <div className="p-6">

            {/* Title */}
            <div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Dashboard Minyak Jelantah
                </h1>

                <p className="text-gray-500 mt-2">
                    Monitoring sistem pencatatan dan penjemputan minyak jelantah.
                </p>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-5 mt-8">

                {cards.map((item, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">
                                    {item.title}
                                </p>

                                <h1 className="text-3xl font-bold mt-3">
                                    {item.value}
                                </h1>

                            </div>

                            <div className={`${item.bg} ${item.text} p-4 rounded-2xl text-3xl`}>
                                {item.icon}
                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm mt-8 p-6">

                <div className="flex justify-between items-center mb-5">

                    <h1 className="text-xl font-bold text-gray-800">
                        Penjemputan Terbaru
                    </h1>

                </div>

                <table className="w-full">

                    <thead>

                        <tr className="border-b text-left">

                            <th className="pb-4">Nama Mitra</th>
                            <th className="pb-4">Tanggal</th>
                            <th className="pb-4">Jumlah</th>
                            <th className="pb-4">Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr className="border-b">

                            <td className="py-4">
                                Warung Bu Siti
                            </td>

                            <td>
                                12 Mei 2026
                            </td>

                            <td>
                                25 Liter
                            </td>

                            <td>
                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                    Diproses
                                </span>
                            </td>

                        </tr>

                        <tr className="border-b">

                            <td className="py-4">
                                RM Barokah
                            </td>

                            <td>
                                13 Mei 2026
                            </td>

                            <td>
                                40 Liter
                            </td>

                            <td>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                    Selesai
                                </span>
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}