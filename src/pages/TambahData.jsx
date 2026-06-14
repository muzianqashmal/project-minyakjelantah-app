import { useState } from "react";

export default function TambahData() {
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

  const handleSubmit = () => {
    if (
      !form.nama ||
      !form.nohp ||
      !form.alamat ||
      !form.jumlah
    ) {
      alert("Lengkapi data terlebih dahulu");
      return;
    }

    const nomorPengajuan =
      "UCO-" + Date.now();

    const dataLama =
      JSON.parse(
        localStorage.getItem("penjemputan")
      ) || [];

    const dataBaru = {
      id: nomorPengajuan,
      ...form,
      status: "Menunggu",
      tanggalPengajuan:
        new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "penjemputan",
      JSON.stringify([
        ...dataLama,
        dataBaru,
      ])
    );

    alert(
      `Pengajuan berhasil\nID: ${nomorPengajuan}`
    );

    setForm({
      nama: "",
      nohp: "",
      alamat: "",
      jumlah: "",
      catatan: "",
    });
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
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Simpan Pengajuan
        </button>

      </div>
    </div>
  );
}