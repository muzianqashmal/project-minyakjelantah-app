import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export default function LandingPage() {

    const formRef = useRef(null);

    const [form, setForm] = useState({
        nama: "",
        hp: "",
        alamat: "",
        jumlah: "",
        tanggal: ""
    });

    // Scroll ke form
    const handleScroll = () => {
        formRef.current.scrollIntoView({
            behavior: "smooth"
        });
    };

    // Submit form
    const handleSubmit = () => {

        if (
            !form.nama ||
            !form.hp ||
            !form.alamat ||
            !form.jumlah ||
            !form.tanggal
        ) {

            alert("Isi semua data!");

            return;

        }

        // Ambil data lama
        const oldData =
            JSON.parse(
                localStorage.getItem("penjemputan")
            ) || [];

        // Tambah data baru
        const newData = [
            ...oldData,
            form
        ];

        // Simpan ke localStorage
        localStorage.setItem(
            "penjemputan",
            JSON.stringify(newData)
        );

        alert(
            "Request berhasil dikirim!"
        );

        // Reset form
        setForm({
            nama: "",
            hp: "",
            alamat: "",
            jumlah: "",
            tanggal: ""
        });
    };
    
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <div className="flex justify-between items-center px-10 py-5 bg-white shadow-sm">

                <h1 className="text-2xl font-extrabold text-green-700">
                    Zathra Prima Energi
                </h1>

                <Link
                    to="/login"
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                >
                    Login Petugas
                </Link>

            </div>

            {/* Hero */}
            <div className="grid grid-cols-2 gap-10 items-center px-20 py-20">

                <div>

                    <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
                        Sistem Penjemputan
                        Minyak Jelantah
                    </h1>

                    <p className="text-gray-500 mt-5 text-lg">
                        Layanan penjemputan minyak jelantah terpercaya untuk rumah makan, UMKM, dan masyarakat.
                    </p>

                    <button
                        onClick={handleScroll}
                        className="mt-8 bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-2xl"
                    >
                        Ajukan Penjemputan
                    </button>

                </div>

                <div className="flex justify-center">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
                        alt="oil"
                        className="w-[350px]"
                    />

                </div>

            </div>

            {/* Form */}
            <div
                ref={formRef}
                className="px-20 pb-20"
            >

                <div className="bg-white rounded-3xl shadow-sm p-10">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Form Request Penjemputan
                    </h1>

                    <div className="grid grid-cols-2 gap-5 mt-8">

                        <input
                            type="text"
                            placeholder="Nama"
                            value={form.nama}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    nama: e.target.value
                                })
                            }
                            className="border p-4 rounded-2xl"
                        />

                        <input
                            type="text"
                            placeholder="Nomor HP"
                            value={form.hp}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    hp: e.target.value
                                })
                            }
                            className="border p-4 rounded-2xl"
                        />

                        <textarea
                            placeholder="Alamat"
                            rows="5"
                            value={form.alamat}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    alamat: e.target.value
                                })
                            }
                            className="border p-4 rounded-2xl col-span-2"
                        ></textarea>

                        <input
                            type="text"
                            placeholder="Jumlah Minyak (Liter)"
                            value={form.jumlah}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    jumlah: e.target.value
                                })
                            }
                            className="border p-4 rounded-2xl"
                        />

                        <input
                            type="date"
                            value={form.tanggal}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    tanggal: e.target.value
                                })
                            }
                            className="border p-4 rounded-2xl"
                        />

                    </div>

                    <button
                        onClick={handleSubmit}
                        className="mt-8 bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-2xl"
                    >
                        Kirim Request
                    </button>

                </div>

            </div>

        </div>
    );
}