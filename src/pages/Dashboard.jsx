import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

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

    const [totalLiter, setTotalLiter] =
        useState(0);

    const [diproses, setDiproses] =
        useState(0);

    const [selesai, setSelesai] =
        useState(0);

    const [pending, setPending] =
        useState(0);

    const [dataTerbaru, setDataTerbaru] =
        useState([]);

    const [chartData, setChartData] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        setLoading(true);

        const {
            data: penjemputan,
            error,
        } = await supabase
            .from("penjemputan")
            .select(`
                *,
                pelanggan(
                    id_pelanggan,
                    nama,
                    no_hp,
                    alamat
                ),
                petugas(
                    id_petugas,
                    nama
                )
            `)
            .order(
                "tanggal_pengajuan",
                {
                    ascending: false,
                }
            );

        if (error) {

            alert(error.message);

            setLoading(false);

            return;

        }

        const {
            count: jumlahPelanggan,
        } = await supabase
            .from("pelanggan")
            .select("*", {
                count: "exact",
                head: true,
            });

        setTotalPelanggan(
            jumlahPelanggan || 0
        );

        setTotalPenjemputan(
            penjemputan.length
        );

        const total =
            penjemputan.reduce(

                (jumlah, item) =>

                    jumlah +
                    Number(
                        item.estimasi_liter
                    ),

                0

            );

        setTotalLiter(
            total
        );

        const dataPending =
            penjemputan.filter(
                item =>
                    item.status ===
                    "Pending"
            ).length;

        const dataDiproses =
            penjemputan.filter(
                item =>
                    item.status ===
                    "Diproses" ||

                    item.status ===
                    "Dalam Perjalanan"
            ).length;

        const dataSelesai =
            penjemputan.filter(
                item =>
                    item.status ===
                    "Selesai"
            ).length;

        setPending(
            dataPending
        );

        setDiproses(
            dataDiproses
        );

        setSelesai(
            dataSelesai
        );

        setChartData({

            labels: [

                "Pending",

                "Diproses",

                "Selesai",

            ],

            datasets: [

                {

                    data: [

                        dataPending,

                        dataDiproses,

                        dataSelesai,

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
            penjemputan.slice(0, 5)
        );

        setLoading(false);

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
                        Selamat datang kembali.
                        Kelola data penjemputan minyak jelantah.
                    </p>

                </div>

                <div className="bg-white px-5 py-3 rounded-xl shadow">

                    {
                        new Date().toLocaleDateString(
                            "id-ID",
                            {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )
                    }

                </div>

            </div>

            {/* Card Statistik */}

            <div className="grid lg:grid-cols-5 gap-5">

                <div className="bg-white p-6 rounded-2xl shadow">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

                            <MdLocalShipping
                                size={30}
                                className="text-blue-600"
                            />

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Penjemputan
                            </p>

                            <h1 className="text-4xl font-bold">
                                {totalPenjemputan}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                            <MdPeople
                                size={30}
                                className="text-green-600"
                            />

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Pelanggan
                            </p>

                            <h1 className="text-4xl font-bold">
                                {totalPelanggan}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">

                            <MdPending
                                size={30}
                                className="text-yellow-600"
                            />

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Pending
                            </p>

                            <h1 className="text-4xl font-bold">
                                {pending}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

                            <MdPending
                                size={30}
                                className="text-blue-600"
                            />

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Diproses
                            </p>

                            <h1 className="text-4xl font-bold">
                                {diproses}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                            <MdCheckCircle
                                size={30}
                                className="text-green-600"
                            />

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Selesai
                            </p>

                            <h1 className="text-4xl font-bold">
                                {selesai}
                            </h1>

                        </div>

                    </div>

                </div>

            </div>

            {/* Total Liter */}

            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow">

                <h3 className="text-lg">
                    Total Estimasi Minyak Jelantah
                </h3>

                <h1 className="text-5xl font-bold mt-3">
                    {totalLiter} Liter
                </h1>

            </div>

            {/* Chart + Data */}

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Chart */}

                <div className="bg-white rounded-2xl p-6 shadow">

                    <h2 className="text-2xl font-bold">
                        Statistik Penjemputan
                    </h2>

                    <p className="text-gray-500 mb-5">
                        Distribusi status penjemputan
                    </p>

                    <div className="max-w-[350px] mx-auto">

                        {
                            loading ? (

                                <p className="text-center">
                                    Memuat grafik...
                                </p>

                            ) : (

                                chartData && (
                                    <Doughnut
                                        data={chartData}
                                    />
                                )

                            )
                        }

                    </div>

                </div>

                {/* Penjemputan Terbaru */}

                <div className="bg-white rounded-2xl p-6 shadow">

                    <div className="flex justify-between items-center mb-5">

                        <div>

                            <h2 className="text-2xl font-bold">
                                Penjemputan Terbaru
                            </h2>

                            <p className="text-sm text-gray-500">
                                5 data terbaru
                            </p>

                        </div>

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

                            {
                                loading ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center py-6"
                                        >
                                            Memuat...
                                        </td>

                                    </tr>

                                ) :

                                    dataTerbaru.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center py-6"
                                            >
                                                Belum ada data
                                            </td>

                                        </tr>

                                    ) :

                                        dataTerbaru.map((item) => (

                                            <tr
                                                key={
                                                    item.id_penjemputan
                                                }
                                                className="border-b"
                                            >

                                                <td className="py-3">

                                                    {
                                                        item.pelanggan
                                                            ?.nama
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        item.estimasi_liter
                                                    } L

                                                </td>

                                                <td>

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs
                                ${item.status ===
                                                                "Selesai"

                                                                ? "bg-green-100 text-green-700"

                                                                : item.status ===
                                                                    "Diproses" ||
                                                                    item.status ===
                                                                    "Dalam Perjalanan"

                                                                    ? "bg-blue-100 text-blue-700"

                                                                    : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                    >

                                                        {item.status}

                                                    </span>

                                                </td>

                                                <td>

                                                    {
                                                        new Date(
                                                            item.tanggal_pengajuan
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )
                                                    }

                                                </td>

                                            </tr>

                                        ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}