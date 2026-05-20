import { useState } from "react";

export default function Penjemputan() {

    const [showModal, setShowModal] = useState(false);

    const [data, setData] = useState([
        {
            id: 1,
            nama: "Warung Bu Siti",
            nohp: "08123456789",
            alamat: "Jl Merdeka",
            jumlah: "25 Liter",
            status: "Pending"
        },
        {
            id: 2,
            nama: "RM Barokah",
            nohp: "08111111111",
            alamat: "Jl Sudirman",
            jumlah: "40 Liter",
            status: "Diproses"
        }
    ]);

    const [form, setForm] = useState({
        nama: "",
        nohp: "",
        alamat: "",
        jumlah: "",
        status: "Pending"
    });

    /*
    |--------------------------------------------------------------------------
    | Handle Input
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = () => {

        if (
            !form.nama ||
            !form.nohp ||
            !form.alamat ||
            !form.jumlah
        ) {
            alert("Semua field wajib diisi!");
            return;
        }

        const newData = {
            id: Date.now(),
            ...form
        };

        setData([...data, newData]);

        setShowModal(false);

        setForm({
            nama: "",
            nohp: "",
            alamat: "",
            jumlah: "",
            status: "Pending"
        });

    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = (id) => {

        const confirmDelete = confirm(
            "Yakin ingin menghapus data?"
        );

        if (confirmDelete) {

            const filtered = data.filter(
                (item) => item.id !== id
            );

            setData(filtered);

        }

    };

    return (

        <div>

            {/* Header */}
            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        Data Penjemputan
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Kelola data penjemputan minyak jelantah.
                    </p>

                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 hover:bg-green-700 transition-all text-white px-5 py-3 rounded-xl"
                >
                    + Tambah Data
                </button>

            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm mt-6 p-5">

                <input
                    type="text"
                    placeholder="Cari pelanggan..."
                    className="w-full border p-3 rounded-xl outline-none"
                />

            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm mt-6 p-6 overflow-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b text-left">

                            <th className="pb-4">
                                Nama
                            </th>

                            <th className="pb-4">
                                No HP
                            </th>

                            <th className="pb-4">
                                Alamat
                            </th>

                            <th className="pb-4">
                                Jumlah
                            </th>

                            <th className="pb-4">
                                Status
                            </th>

                            <th className="pb-4">
                                Aksi
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td className="py-4">
                                    {item.nama}
                                </td>

                                <td>
                                    {item.nohp}
                                </td>

                                <td>
                                    {item.alamat}
                                </td>

                                <td>
                                    {item.jumlah}
                                </td>

                                <td>

                                    <span
                                        className={`
                                        px-3 py-1 rounded-full text-sm

                                        ${
                                            item.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"

                                            : item.status === "Diproses"
                                            ? "bg-blue-100 text-blue-700"

                                            : "bg-green-100 text-green-700"
                                        }
                                        `}
                                    >

                                        {item.status}

                                    </span>

                                </td>

                                <td>

                                    <div className="flex gap-2">

                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                        >
                                            Hapus
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Modal */}
            {
                showModal && (

                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                        <div className="bg-white p-8 rounded-2xl w-[500px]">

                            <h1 className="text-2xl font-bold mb-6">
                                Tambah Data Penjemputan
                            </h1>

                            <div className="space-y-4">

                                <input
                                    type="text"
                                    name="nama"
                                    placeholder="Nama"
                                    value={form.nama}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded-xl outline-none"
                                />

                                <input
                                    type="text"
                                    name="nohp"
                                    placeholder="No HP"
                                    value={form.nohp}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded-xl outline-none"
                                />

                                <textarea
                                    name="alamat"
                                    placeholder="Alamat"
                                    value={form.alamat}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded-xl outline-none"
                                />

                                <input
                                    type="text"
                                    name="jumlah"
                                    placeholder="Jumlah Liter"
                                    value={form.jumlah}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded-xl outline-none"
                                />

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded-xl outline-none"
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Diproses">
                                        Diproses
                                    </option>

                                    <option value="Selesai">
                                        Selesai
                                    </option>

                                </select>

                            </div>

                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-200 px-5 py-2 rounded-xl"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-600 text-white px-5 py-2 rounded-xl"
                                >
                                    Simpan
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );

}