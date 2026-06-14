import { useState } from "react";

export default function CekStatus() {

  const [id, setId] = useState("");
  const [hasil, setHasil] = useState(null);

  const cekStatus = () => {

    const data =
      JSON.parse(
        localStorage.getItem("penjemputan")
      ) || [];

    const ditemukan = data.find(
      (item) =>
        item.id.toLowerCase() ===
        id.toLowerCase()
    );

    if (!ditemukan) {
      alert("Data tidak ditemukan");
      return;
    }

    setHasil(ditemukan);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-5">
        Cek Status Penjemputan
      </h1>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Masukkan ID Pengajuan"
          className="border p-3 flex-1 rounded"
          value={id}
          onChange={(e) =>
            setId(e.target.value)
          }
        />

        <button
          onClick={cekStatus}
          className="bg-green-600 text-white px-5 rounded"
        >
          Cari
        </button>

      </div>

      {hasil && (

        <div className="mt-6 border rounded p-4">

          <h2 className="font-bold text-xl mb-3">
            Hasil Pencarian
          </h2>

          <p>
            <strong>Nama:</strong>{" "}
            {hasil.nama}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {hasil.status}
          </p>

          <p>
            <strong>Tanggal:</strong>{" "}
            {hasil.tanggalPengajuan}
          </p>

          <p>
            <strong>Jumlah:</strong>{" "}
            {hasil.jumlah} Liter
          </p>

        </div>

      )}

    </div>
  );
}