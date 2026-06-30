import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function DetailPenjemputan() {

  const { id } = useParams();

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

  }, [id]);

  const loadData = async () => {

    setLoading(true);

    const {
      data,
      error,
    } = await supabase
      .from("penjemputan")
      .select(`
        *,
        pelanggan(
          id_pelanggan,
          nama,
          no_hp,
          alamat
        ),
        petugas(
          id_petugas,
          nama
        )
      `)
      .eq(
        "id_penjemputan",
        id
      )
      .single();

    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }

    setData(data);

    setLoading(false);

  };

  if (loading) {

    return (

      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold">

          Memuat Data...

        </h1>

      </div>

    );

  }

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

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="font-semibold text-gray-500">
            Kode Pengajuan
          </label>

          <p className="mt-1 text-lg">
            {data.kode_pengajuan}
          </p>

        </div>

        <div>

          <label className="font-semibold text-gray-500">
            Tanggal Pengajuan
          </label>

          <p className="mt-1 text-lg">

            {
              new Date(
                data.tanggal_pengajuan
              ).toLocaleDateString(
                "id-ID",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )
            }

          </p>

        </div>

        <div>

          <label className="font-semibold text-gray-500">
            Nama Pelanggan
          </label>

          <p className="mt-1 text-lg">
            {data.pelanggan?.nama}
          </p>

        </div>

        <div>

          <label className="font-semibold text-gray-500">
            Nomor HP
          </label>

          <p className="mt-1 text-lg">
            {data.pelanggan?.no_hp}
          </p>

        </div>

        <div className="md:col-span-2">

          <label className="font-semibold text-gray-500">
            Alamat
          </label>

          <p className="mt-1 text-lg">
            {data.pelanggan?.alamat}
          </p>

        </div>

        <div>

          <label className="font-semibold text-gray-500">
            Estimasi Liter
          </label>

          <p className="mt-1 text-lg">
            {data.estimasi_liter} Liter
          </p>

        </div>

        <div>

          <label className="font-semibold text-gray-500">
            Status
          </label>

          <p
            className={`mt-1 font-bold text-lg
        ${data.status === "Selesai"
                ? "text-green-600"
                : data.status === "Diproses" ||
                  data.status === "Dalam Perjalanan"
                  ? "text-blue-600"
                  : data.status === "Pending"
                    ? "text-orange-600"
                    : data.status === "Dibatalkan"
                      ? "text-red-600"
                      : "text-gray-700"
              }`}
          >

            {data.status}

          </p>

        </div>

        <div>

          <label className="font-semibold text-gray-500">
            Petugas
          </label>

          <p className="mt-1 text-lg">

            {
              data.petugas?.nama ??
              "Belum Ditugaskan"
            }

          </p>

        </div>

        <div className="md:col-span-2">

          <label className="font-semibold text-gray-500">
            Catatan
          </label>

          <p className="mt-1 text-lg">

            {
              data.catatan ||
              "-"
            }

          </p>

        </div>

      </div>

    </div>

  );

}