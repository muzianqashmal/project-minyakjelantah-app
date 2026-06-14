import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailPenjemputan() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const semuaData =
      JSON.parse(
        localStorage.getItem("penjemputan")
      ) || [];

    const detail = semuaData.find(
      (item) => item.id === id
    );

    setData(detail);
  }, [id]);

  if (!data) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">
          Data Tidak Ditemukan
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-6">
        Detail Penjemputan
      </h1>

      <div className="space-y-4">

        <div>
          <label className="font-semibold">
            Nomor Pengajuan
          </label>

          <p>{data.id}</p>
        </div>

        <div>
          <label className="font-semibold">
            Nama Pelanggan
          </label>

          <p>{data.nama}</p>
        </div>

        <div>
          <label className="font-semibold">
            Nomor HP
          </label>

          <p>{data.nohp}</p>
        </div>

        <div>
          <label className="font-semibold">
            Alamat
          </label>

          <p>{data.alamat}</p>
        </div>

        <div>
          <label className="font-semibold">
            Jumlah Jelantah
          </label>

          <p>{data.jumlah} Liter</p>
        </div>

        <div>
          <label className="font-semibold">
            Catatan
          </label>

          <p>{data.catatan || "-"}</p>
        </div>

        <div>
          <label className="font-semibold">
            Tanggal Pengajuan
          </label>

          <p>{data.tanggalPengajuan}</p>
        </div>

        <div>
          <label className="font-semibold">
            Status Penjemputan
          </label>

          <p
            className={`font-bold ${
              data.status === "Selesai"
                ? "text-green-600"
                : data.status ===
                  "Dalam Perjalanan"
                ? "text-blue-600"
                : data.status ===
                  "Diproses"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {data.status}
          </p>
        </div>

      </div>

    </div>
  );
}