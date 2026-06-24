import { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import {
    MdPeople,
    MdLocalShipping,
    MdPending,
    MdCheckCircle,
} from "react-icons/md";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function Dashboard() {

    const [totalPelanggan, setTotalPelanggan] =
        useState(0);

    const [totalPenjemputan, setTotalPenjemputan] =
        useState(0);

    const [diproses, setDiproses] =
        useState(0);

    const [selesai, setSelesai] =
        useState(0);

    const [dataTerbaru, setDataTerbaru] =
        useState([]);

    const [chartData, setChartData] =
        useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {

        const data =
            JSON.parse(
                localStorage.getItem(
                    "penjemputan"
                )
            ) || [];

        setTotalPenjemputan(
            data.length
        );

        const pelangganUnik = [
            ...new Set(
                data.map(
                    (item) =>
                        item.hp ||
                        item.nohp
                )
            ),
        ];

        setTotalPelanggan(
            pelangganUnik.length
        );

        const menunggu =
            data.filter(
                (item) =>
                    item.status ===
                    "Menunggu"
            ).length;

        const jumlahDiproses =
            data.filter(
                (item) =>
                    item.status ===
                    "Diproses" ||
                    item.status ===
                    "Dalam Perjalanan"
            ).length;

        const jumlahSelesai =
            data.filter(
                (item) =>
                    item.status ===
                    "Selesai"
            ).length;

        setDiproses(
            jumlahDiproses
        );

        setSelesai(
            jumlahSelesai
        );

        setChartData({
            labels: [
                "Menunggu",
                "Diproses",
                "Selesai",
            ],
            datasets: [
                {
                    data: [
                        menunggu,
                        jumlahDiproses,
                        jumlahSelesai,
                    ],
                    backgroundColor: [
                        "#f59e0b",
                        "#3b82f6",
                        "#22c55e",
                    ],
                    borderWidth: 0,
                },
            ],
        });

        setDataTerbaru(
            [...data]
                .reverse()
                .slice(0, 5)
        );
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold text-slate-800">
                        Dashboard
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Selamat datang kembali, Admin!
                        Kelola penjemputan minyak jelantah dengan mudah.
                    </p>

                </div>

                <div className="bg-white px-5 py-3 rounded-xl shadow-sm">
                    {new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </div>

            </div>

            {/* Statistik */}

            <div className="grid lg:grid-cols-4 gap-5">

                <div className="bg-white p-6 rounded-2xl shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">

                            <MdLocalShipping
                                size={30}
                                className="text-blue-600"
                            />

                        </div>

                        <div>

                            <h3 className="text-gray-500">
                                Total Penjemputan
                            </h3>

                            <h1 className="text-4xl font-bold">
                                {totalPenjemputan}
                            </h1>

                            <p className="text-sm text-gray-400">
                                Semua data penjemputan
                            </p>

                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">

                            <MdPending
                                size={30}
                                className="text-yellow-500"
                            />

                        </div>

                        <div>

                            <h3 className="text-gray-500">
                                Menunggu
                            </h3>

                            <h1 className="text-4xl font-bold">
                                {
                                    chartData?.datasets[0]
                                        ?.data[0]
                                }
                            </h1>

                            <p className="text-sm text-gray-400">
                                Menunggu proses
                            </p>

                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">

                            <MdPending
                                size={30}
                                className="text-blue-600"
                            />

                        </div>

                        <div>

                            <h3 className="text-gray-500">
                                Diproses
                            </h3>

                            <h1 className="text-4xl font-bold">
                                {diproses}
                            </h1>

                            <p className="text-sm text-gray-400">
                                Sedang diproses
                            </p>

                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">

                            <MdCheckCircle
                                size={30}
                                className="text-green-600"
                            />

                        </div>

                        <div>

                            <h3 className="text-gray-500">
                                Selesai
                            </h3>

                            <h1 className="text-4xl font-bold">
                                {selesai}
                            </h1>

                            <p className="text-sm text-gray-400">
                                Selesai dijemput
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Chart + Table */}

            <div className="grid lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl p-6 shadow-sm">

                    <h2 className="text-2xl font-bold">
                        Statistik Penjemputan
                    </h2>

                    <p className="text-gray-500 text-sm mb-5">
                        Distribusi status penjemputan
                    </p>

                    <div className="max-w-[350px] mx-auto">

                        {chartData && (
                            <Doughnut
                                data={chartData}
                            />
                        )}

                    </div>

                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">

                    <div className="flex justify-between items-center mb-4">

                        <div>

                            <h2 className="text-2xl font-bold">
                                Penjemputan Terbaru
                            </h2>

                            <p className="text-sm text-gray-500">
                                5 data penjemputan terbaru
                            </p>

                        </div>

                        <button className="text-green-600 font-semibold">
                            Lihat Semua
                        </button>

                    </div>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-3">
                                    Nama
                                </th>

                                <th className="text-left py-3">
                                    Liter
                                </th>

                                <th className="text-left py-3">
                                    Status
                                </th>

                                <th className="text-left py-3">
                                    Tanggal
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {dataTerbaru.map(
                                (item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b"
                                    >

                                        <td className="py-3">
                                            {item.nama}
                                        </td>

                                        <td>
                                            {item.jumlah} L
                                        </td>

                                        <td>

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs ${item.status === "Selesai"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "Diproses"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>

                                        </td>

                                        <td>
                                            {item.tanggal}
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}