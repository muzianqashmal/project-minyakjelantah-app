import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Laporan() {

    const [data, setData] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        setLoading(true);

        const {
            data,
            error,
        } = await supabase
            .from("penjemputan")
            .select(`
                *,
                pelanggan(
                    nama,
                    no_hp
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

        setData(data);

        setLoading(false);

    };

    const totalPenjemputan =
        data.length;

    const totalLiter =
        data.reduce(

            (total, item) =>

                total +
                Number(
                    item.estimasi_liter
                ),

            0

        );

    const totalSelesai =
        data.filter(

            item =>
                item.status ===
                "Selesai"

        ).length;

    const totalDiproses =
        data.filter(

            item =>

                item.status ===
                "Diproses" ||

                item.status ===
                "Dalam Perjalanan"

        ).length;

    const cetakLaporan =
        () => {

            window.print();

        };

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Laporan Penjemputan
                </h1>

                <p className="text-gray-500">
                    Rekapitulasi Data Penjemputan
                    Minyak Jelantah
                </p>

            </div>

            <div className="grid md:grid-cols-4 gap-5">

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="text-gray-500">
                        Total Penjemputan
                    </h3>

                    <h1 className="text-4xl font-bold text-blue-600">

                        {totalPenjemputan}

                    </h1>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="text-gray-500">
                        Total Liter
                    </h3>

                    <h1 className="text-4xl font-bold text-purple-600">

                        {totalLiter}

                    </h1>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="text-gray-500">
                        Sedang Diproses
                    </h3>

                    <h1 className="text-4xl font-bold text-yellow-600">

                        {totalDiproses}

                    </h1>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="text-gray-500">
                        Selesai
                    </h3>

                    <h1 className="text-4xl font-bold text-green-600">

                        {totalSelesai}

                    </h1>

                </div>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-bold">
                        Detail Data Penjemputan
                    </h2>

                    <button
                        onClick={cetakLaporan}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                    >
                        Cetak Laporan
                    </button>

                </div>

                <div className="overflow-auto">

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="border p-3">
                                    Kode
                                </th>

                                <th className="border p-3">
                                    Nama
                                </th>

                                <th className="border p-3">
                                    Liter
                                </th>

                                <th className="border p-3">
                                    Tanggal
                                </th>

                                <th className="border p-3">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                loading ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center p-6"
                                        >

                                            Memuat data...

                                        </td>

                                    </tr>

                                )

                                    :

                                    data.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="text-center p-6"
                                            >

                                                Belum ada data

                                            </td>

                                        </tr>

                                    )

                                        :

                                        data.map((item) => (

                                            <tr
                                                key={
                                                    item.id_penjemputan
                                                }
                                            >

                                                <td className="border p-3">

                                                    {
                                                        item.kode_pengajuan
                                                    }

                                                </td>

                                                <td className="border p-3">

                                                    {
                                                        item.pelanggan
                                                            ?.nama
                                                    }

                                                </td>

                                                <td className="border p-3">

                                                    {
                                                        item.estimasi_liter
                                                    } Liter

                                                </td>

                                                <td className="border p-3">

                                                    {

                                                        new Date(
                                                            item.tanggal_pengajuan
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )

                                                    }

                                                </td>

                                                <td className="border p-3">

                                                    <span
                                                        className={`px-3 py-1 rounded text-white

                                        ${item.status ===
                                                                "Selesai"

                                                                ? "bg-green-500"

                                                                : item.status ===
                                                                    "Diproses"

                                                                    ? "bg-yellow-500"

                                                                    : item.status ===
                                                                        "Dalam Perjalanan"

                                                                        ? "bg-blue-500"

                                                                        : item.status ===
                                                                            "Pending"

                                                                            ? "bg-orange-500"

                                                                            : "bg-red-500"

                                                            }

                                        `}
                                                    >

                                                        {
                                                            item.status
                                                        }

                                                    </span>

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