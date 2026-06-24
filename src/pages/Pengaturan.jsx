import { useEffect, useState } from "react";

export default function Pengaturan() {

    const [form, setForm] = useState({
        perusahaan: "",
        alamat: "",
        email: "",
        telepon: ""
    });

    useEffect(() => {

        const data =
            JSON.parse(
                localStorage.getItem(
                    "pengaturan"
                )
            );

        if (data) {
            setForm(data);
        }

    }, []);

    const simpanPengaturan = () => {

        localStorage.setItem(
            "pengaturan",
            JSON.stringify(form)
        );

        alert(
            "Pengaturan berhasil disimpan"
        );
    };

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Pengaturan Sistem
                </h1>

                <p className="text-gray-500">
                    Konfigurasi informasi perusahaan
                </p>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

                <div className="space-y-4">

                    <input
                        type="text"
                        placeholder="Nama Perusahaan"
                        value={form.perusahaan}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                perusahaan:
                                    e.target.value
                            })
                        }
                        className="border p-3 rounded w-full"
                    />

                    <input
                        type="text"
                        placeholder="Alamat"
                        value={form.alamat}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                alamat:
                                    e.target.value
                            })
                        }
                        className="border p-3 rounded w-full"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email:
                                    e.target.value
                            })
                        }
                        className="border p-3 rounded w-full"
                    />

                    <input
                        type="text"
                        placeholder="Nomor Telepon"
                        value={form.telepon}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                telepon:
                                    e.target.value
                            })
                        }
                        className="border p-3 rounded w-full"
                    />

                    <button
                        onClick={
                            simpanPengaturan
                        }
                        className="bg-green-600 text-white px-5 py-3 rounded"
                    >
                        Simpan Pengaturan
                    </button>

                </div>

            </div>

        </div>

    );
}