import { useState } from "react";
import { supabase } from "../services/supabase";

export default function TambahData() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    nohp: "",
    alamat: "",
    jumlah: "",
    catatan: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    if (
      !form.nama ||
      !form.nohp ||
      !form.alamat ||
      !form.jumlah
    ) {
      alert("Lengkapi data terlebih dahulu");
      return;
    }

    try {

      setLoading(true);

      const kodePengajuan =
        "UCO-" + Date.now();

      // Simpan pelanggan
      const {
        data: pelanggan,
        error: pelangganError,
      } = await supabase
        .from("pelanggan")
        .insert([
          {
            nama: form.nama,
            no_hp: form.nohp,
            alamat: form.alamat,
          },
        ])
        .select()
        .single();

      if (pelangganError) throw pelangganError;

      // Simpan penjemputan
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
            status: "Pending",
            catatan:
              form.catatan,
          },
        ]);

      if (penjemputanError)
        throw penjemputanError;

      alert(
        `Pengajuan berhasil!\nKode Pengajuan: ${kodePengajuan}`
      );

      setForm({
        nama: "",
        nohp: "",
        alamat: "",
        jumlah: "",
        catatan: "",
      });

    } catch (error) {

      console.error(error);

      alert(
        "Gagal menyimpan data\n" +
        error.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-6">
        Pengajuan Penjemputan
      </h1>

      <div className="space-y-4">

        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          type="text"
          name="nohp"
          placeholder="Nomor HP"
          value={form.nohp}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <textarea
          name="alamat"
          placeholder="Alamat"
          value={form.alamat}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          type="number"
          name="jumlah"
          placeholder="Jumlah Liter"
          value={form.jumlah}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <textarea
          name="catatan"
          placeholder="Catatan"
          value={form.catatan}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
        >
          {
            loading
              ? "Menyimpan..."
              : "Simpan Pengajuan"
          }
        </button>

      </div>

    </div>

  );

}