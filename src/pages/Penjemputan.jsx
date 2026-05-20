import { useEffect, useState } from "react";

export default function Penjemputan() {

    const [data, setData] = useState([]);

    useEffect(() => {

        const result =
            JSON.parse(
                localStorage.getItem("penjemputan")
            ) || [];

        setData(result);

    }, []);

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold text-green-700 mb-8">
                Data Penjemputan
            </h1>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                <table className="w-full">

                    <thead className="bg-green-600 text-white">

                        <tr>

                            <th className="p-4 text-left">
                                Nama
                            </th>

                            <th className="p-4 text-left">
                                No HP
                            </th>

                            <th className="p-4 text-left">
                                Alamat
                            </th>

                            <th className="p-4 text-left">
                                Jumlah
                            </th>

                            <th className="p-4 text-left">
                                Tanggal
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            data.length > 0 ? (

                                data.map((item, index) => (

                                    <tr
                                        key={index}
                                        className="border-b"
                                    >

                                        <td className="p-4">
                                            {item.nama}
                                        </td>

                                        <td className="p-4">
                                            {item.hp}
                                        </td>

                                        <td className="p-4">
                                            {item.alamat}
                                        </td>

                                        <td className="p-4">
                                            {item.jumlah} Liter
                                        </td>

                                        <td className="p-4">
                                            {item.tanggal}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="p-10 text-center text-gray-400"
                                    >
                                        Belum ada data
                                    </td>

                                </tr>

                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}