import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../services/supabase";

export default function LandingPage() {

    const formRef = useRef(null);

    const [form, setForm] = useState({
        nama: "",
        hp: "",
        alamat: "",
        jumlah: "",
        tanggal: ""
    });

    const [idPengajuan, setIdPengajuan] =
        useState("");

    const [hasilCek, setHasilCek] =
        useState(null);

    const [nomorPengajuan, setNomorPengajuan] =
        useState("");

    const [showSuccess, setShowSuccess] =
        useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const handleScroll = () => {
        formRef.current.scrollIntoView({
            behavior: "smooth"
        });
    };

    const handleSubmit = async () => {

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

        try {

            const kodePengajuan =
                "UCO-" + Date.now();

            const {
                data: pelanggan,
                error: pelangganError,
            } = await supabase
                .from("pelanggan")
                .insert([
                    {
                        nama: form.nama,
                        no_hp: form.hp,
                        alamat: form.alamat,
                    },
                ])
                .select()
                .single();

            if (pelangganError)
                throw pelangganError;

            const {
                error: penjemputanError,
            } = await supabase
                .from("penjemputan")
                .insert([
                    {
                        id_pelanggan:
                            pelanggan.id_pelanggan,
                        kode_pengajuan:
                            kodePengajuan,
                        estimasi_liter:
                            Number(form.jumlah),
                        tanggal_pengajuan:
                            form.tanggal,
                        status: "Pending",
                    },
                ]);

            if (penjemputanError)
                throw penjemputanError;

            setNomorPengajuan(
                kodePengajuan
            );

            setShowSuccess(true);

            setForm({
                nama: "",
                hp: "",
                alamat: "",
                jumlah: "",
                tanggal: "",
            });

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    };

    const cekStatus = async () => {

        if (!idPengajuan.trim()) {
            alert("Masukkan ID Pengajuan");
            return;
        }

        try {

            // Cari data penjemputan
            const {
                data: penjemputan,
                error: penjemputanError,
            } = await supabase
                .from("penjemputan")
                .select("*")
                .eq(
                    "kode_pengajuan",
                    idPengajuan.trim()
                )
                .single();

            console.log("Penjemputan:", penjemputan);
            console.log("Error:", penjemputanError);

            console.log("INPUT :", idPengajuan.trim());
console.log("DATA  :", penjemputan);
console.log("ERROR :", penjemputanError);

if (penjemputanError) {
    alert(JSON.stringify(penjemputanError));
    return;
}

if (!penjemputan) {
    alert("Data kosong");
    return;
}

            // Cari data pelanggan
            const {
                data: pelanggan,
                error: pelangganError,
            } = await supabase
                .from("pelanggan")
                .select("*")
                .eq(
                    "id_pelanggan",
                    penjemputan.id_pelanggan
                )
                .single();

            if (pelangganError) {
                throw pelangganError;
            }

            // Gabungkan data
            setHasilCek({
                kode_pengajuan:
                    penjemputan.kode_pengajuan,

                tanggal_pengajuan:
                    penjemputan.tanggal_pengajuan,

                estimasi_liter:
                    penjemputan.estimasi_liter,

                status:
                    penjemputan.status,

                pelanggan,
            });

        } catch (err) {

            console.error(err);
            alert(err.message);

        }

    };
    const copyID = async () => {
    if (!nomorPengajuan) return;

    await navigator.clipboard.writeText(nomorPengajuan);

    alert("ID berhasil disalin!");
};
    return (
        <div className="min-h-screen bg-gray-100">

            {/* HERO SECTION */}

            <section className="relative min-h-[100vh] overflow-hidden">

                <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">

                    <div
                        className="bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/img/gudang.jpeg')"
                        }}
                    />

                    <div
                        className="bg-cover"
                        style={{
                            backgroundImage: "url('/img/pickup.jpeg')",
                            backgroundPosition: "center 75%"
                        }}
                    />

                </div>

                <div className="absolute inset-0 bg-black/60 z-0"></div>
                {/* Navbar */}
                <div className="relative z-50 px-4 md:px-8 lg:px-12 py-6">

                    <div className="flex justify-between items-center">

                        {/* Logo */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                ZATHRA
                            </h1>

                            <p className="text-green-400 font-semibold">
                                PRIMA ENERGI
                            </p>
                        </div>

                        {/* Menu */}
                        <div className="hidden md:flex gap-8 text-white">

                            <button
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth"
                                    })
                                }
                                className="hover:text-green-400 duration-300"
                            >
                                Beranda
                            </button>

                            <button
                                onClick={() =>
                                    document
                                        .getElementById("form-request")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        })
                                }
                                className="hover:text-green-400 duration-300"
                            >
                                Ajukan Penjemputan
                            </button>

                            <button
                                onClick={() =>
                                    document
                                        .getElementById("cek-status")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        })
                                }
                                className="hover:text-green-400 duration-300"
                            >
                                Cek Status
                            </button>

                            <button
                                onClick={() =>
                                    document
                                        .getElementById("tentang")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        })
                                }
                                className="hover:text-green-400 duration-300"
                            >
                                Tentang Kami
                            </button>

                        </div>

                        {/* Login */}
                        <Link
                            to="/login"
                            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-white"
                        >
                            Login Petugas
                        </Link>

                    </div>

                </div>

                {/* Hero Content */}

                <div className="relative z-10 px-6 md:px-10 lg:px-20 pt-20 lg:pt-24">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                        <div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight">

                                Penjemputan
                                <br />

                                Minyak Jelantah

                                <br />

                                <span className="text-green-400">
                                    Profesional & Aman
                                </span>

                            </h1>

                            <p className="text-gray-200 mt-6 text-base md:text-lg lg:text-xl max-w-xl">

                                Zathra Prima Energi hadir untuk solusi
                                pengelolaan minyak jelantah Anda.
                                Mudah, cepat dan terpercaya.

                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("form-request")
                                            ?.scrollIntoView({
                                                behavior: "smooth"
                                            })
                                    }
                                    className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl text-white font-semibold"
                                >
                                    Ajukan Penjemputan
                                </button>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("cek-status")
                                            ?.scrollIntoView({
                                                behavior: "smooth"
                                            })
                                    }
                                    className="border border-white px-8 py-4 rounded-2xl text-white hover:bg-white hover:text-black duration-300"
                                >
                                    Cek Status
                                </button>

                            </div>

                        </div>

                        {/* Card Keunggulan */}
                        <div className="bg-white/95 backdrop-blur rounded-3xl p-10 w-full max-w-[500px] shadow-2xl">

                            <h2 className="text-4xl font-bold mb-8">
                                Keunggulan Kami
                            </h2>

                            <div className="space-y-6">

                                <div>
                                    <h3 className="font-bold text-green-600">
                                        Penjemputan Cepat
                                    </h3>
                                    <p className="text-gray-500">
                                        Tim siap menjemput sesuai jadwal.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-green-600">
                                        Harga Kompetitif
                                    </h3>
                                    <p className="text-gray-500">
                                        Harga terbaik untuk minyak jelantah.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-green-600">
                                        Aman & Terpercaya
                                    </h3>
                                    <p className="text-gray-500">
                                        Pengelolaan sesuai standar perusahaan.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-green-600">
                                        Ramah Lingkungan
                                    </h3>
                                    <p className="text-gray-500">
                                        Mendukung pengelolaan limbah berkelanjutan.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer Hero */}

                <div className="absolute bottom-0 left-0 right-0 bg-green-900/80 backdrop-blur">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 lg:p-8 text-white text-center md:text-left">

                        <div>
                            <h3 className="font-bold">
                                Terdaftar Resmi
                            </h3>
                            <p className="text-green-200">
                                Perusahaan berizin resmi
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold">
                                Layanan 24/7
                            </h3>
                            <p className="text-green-200">
                                Siap melayani kapan saja
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold">
                                Area Luas
                            </h3>
                            <p className="text-green-200">
                                Melayani area Riau dan sekitarnya
                            </p>
                        </div>

                    </div>

                </div>
            </section >

            {/* Form Request */}

            <div div
                id="form-request"
                ref={formRef}
                className="px-4 md:px-8 lg:px-20 py-10"
            >

                <div className="bg-white rounded-3xl shadow-sm p-10">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Form Request Penjemputan
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

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
                            type="number"
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
            </div >

            {/* Cek Status */}
            <div div
                id="cek-status"
                className="px-4 md:px-8 lg:px-20 pb-20"
            >
                <div className="bg-white rounded-3xl shadow-sm p-10">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Cek Status Penjemputan
                    </h1>

                    <div className="flex gap-4 mt-8">

                        <input
                            type="text"
                            placeholder="Masukkan ID Pengajuan"
                            value={idPengajuan}
                            onChange={(e) =>
                                setIdPengajuan(
                                    e.target.value
                                )
                            }
                            className="border p-4 rounded-2xl flex-1"
                        />

                        <button
                            onClick={cekStatus}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-2xl"
                        >
                            Cek Status
                        </button>

                    </div>

                    {hasilCek && (

                        <div className="mt-8 border rounded-2xl p-6">

                            <h2 className="text-xl font-bold mb-4">
                                Informasi Penjemputan
                            </h2>

                            <div className="space-y-2">

                                <p><b>ID:</b> {hasilCek?.kode_pengajuan}</p>
                                <p><b>Nama:</b> {hasilCek?.pelanggan?.nama}</p>
                                <p><b>No HP:</b> {hasilCek?.pelanggan?.no_hp}</p>
                                <p><b>Alamat:</b> {hasilCek?.pelanggan?.alamat}</p>
                                <p><b>Jumlah:</b> {hasilCek?.estimasi_liter} Liter</p>
                                <p><b>Tanggal:</b> {hasilCek?.tanggal_pengajuan}</p>
                                <p><b>Status:</b> {hasilCek?.status}</p>
                                <p>
                                    <b>Status:</b>{" "}
                                    <span
                                        className={`font-bold ${hasilCek.status === "Selesai"
                                            ? "text-green-600"
                                            : hasilCek.status === "Diproses"
                                                ? "text-yellow-500"
                                                : hasilCek.status === "Dalam Perjalanan"
                                                    ? "text-blue-500"
                                                    : "text-red-500"
                                            }`}
                                    >
                                        {hasilCek.status}
                                    </span>
                                </p>

                            </div>

                        </div>

                    )}

                </div>

                {/* Modal Success */}
                {
                    showSuccess && (

                        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                            <div className="bg-white rounded-3xl p-8 w-[500px] shadow-2xl">

                                <div className="text-center">

                                    <div className="text-6xl">
                                        🎉
                                    </div>

                                    <h2 className="text-3xl font-bold mt-3">
                                        Request Berhasil
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Simpan ID berikut untuk mengecek status penjemputan.
                                    </p>

                                </div>

                                <div className="mt-6 border-2 border-dashed border-green-500 rounded-2xl p-5 flex justify-between items-center">

                                    <span className="font-bold text-green-700 text-xl">
                                        {nomorPengajuan}
                                    </span>

                                    <button
                                        onClick={copyID}
                                        className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700"
                                    >
                                        <MdContentCopy size={22} />
                                    </button>

                                </div>

                                <button
                                    onClick={() =>
                                        setShowSuccess(false)
                                    }
                                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl"
                                >
                                    Tutup
                                </button>

                            </div>

                        </div>

                    )
                }
            </div >
        </div >
    );
}