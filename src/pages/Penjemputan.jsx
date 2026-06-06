import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Penjemputan() {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {

        const timeout = setTimeout(() => {

            const url = query
                ? `https://dummyjson.com/users/search?q=${query}`
                : `https://dummyjson.com/users`;

            axios
                .get(url)
                .then((response) => {

                    const hasil = response.data.users.map((user) => ({
                        id: user.id,
                        nama: `${user.firstName} ${user.lastName}`,
                        nohp: user.phone,
                        alamat: user.address.city,
                        jumlah: `${Math.floor(Math.random() * 50) + 10} Liter`,
                        tanggal: "2026-06-07"
                    }));

                    setData(hasil);

                })
                .catch((err) => {

                    setError(err.message);

                });

        }, 500);

        return () => clearTimeout(timeout);

    }, [query]);

    return (

        <div>

            <h1 className="text-3xl font-bold text-green-700 mb-6">
                Data Penjemputan
            </h1>

            <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari pelanggan..."
                    className="w-full border p-3 rounded-xl"
                />

            </div>

            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

                <table className="w-full">

                    <thead className="bg-green-600 text-white">

                        <tr>

                            <th className="p-4 text-left">Nama</th>
                            <th className="p-4 text-left">No HP</th>
                            <th className="p-4 text-left">Alamat</th>
                            <th className="p-4 text-left">Jumlah</th>
                            <th className="p-4 text-left">Tanggal</th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td className="p-4">

                                    <Link
                                        to={`/penjemputan/${item.id}`}
                                        className="text-green-600 hover:underline"
                                    >
                                        {item.nama}
                                    </Link>

                                </td>

                                <td>{item.nohp}</td>
                                <td>{item.alamat}</td>
                                <td>{item.jumlah}</td>
                                <td>{item.tanggal}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}