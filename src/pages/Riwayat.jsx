import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Riwayat() {

  const [riwayat, setRiwayat] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadRiwayat();

  }, []);

  const loadRiwayat = async () => {

    setLoading(true);

    const {
      data,
      error,
    } = await supabase
      .from("riwayat_status")
      .select(`
        *,
        penjemputan(
          kode_pengajuan,
          pelanggan(
            nama,
            no_hp
          )
        )
      `)
      .order(
        "tanggal_update",
        {
          ascending: false,
        }
      );

    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }

    setRiwayat(data);

    setLoading(false);

  };

  const filteredData =
    riwayat.filter((item) => {

      const nama =
        item.penjemputan
          ?.pelanggan
          ?.nama || "";

      const kode =
        item.penjemputan
          ?.kode_pengajuan || "";

      return (

        nama
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        kode
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );

    });

  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-5">

          <h1 className="text-3xl font-bold">
            Riwayat Penjemputan
          </h1>

          <div className="bg-green-100 px-4 py-2 rounded">

            Total Riwayat :
            <strong>
              {" "}
              {riwayat.length}
            </strong>

          </div>

        </div>

        <input
          type="text"
          placeholder="Cari Nama / Kode Pengajuan..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded w-full mb-5"
        />

        <div className="overflow-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-3">
                  No
                </th>

                <th className="border p-3">
                  Kode Pengajuan
                </th>

                <th className="border p-3">
                  Nama Pelanggan
                </th>

                <th className="border p-3">
                  Status
                </th>

                <th className="border p-3">
                  Tanggal Update
                </th>

              </tr>

            </thead>

            <tbody>

              {

                loading ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center p-6"
                    >

                      Memuat data...

                    </td>

                  </tr>

                )

                  :

                  filteredData.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center p-6"
                      >

                        Belum ada riwayat

                      </td>

                    </tr>

                  )

                    :

                    filteredData.map(

                      (item, index) => (

                        <tr
                          key={item.id_riwayat}
                        >

                          <td className="border p-3">

                            {index + 1}

                          </td>

                          <td className="border p-3">

                            {
                              item.penjemputan
                                ?.kode_pengajuan
                            }

                          </td>

                          <td className="border p-3">

                            {
                              item.penjemputan
                                ?.pelanggan
                                ?.nama
                            }

                          </td>

                          <td className="border p-3">

                            <span
                              className={`px-3 py-1 rounded text-white

                      ${item.status ===
                                  "Selesai"

                                  ? "bg-green-500"

                                  : item.status ===
                                    "Diproses"

                                    ? "bg-yellow-500"

                                    : item.status ===
                                      "Dalam Perjalanan"

                                      ? "bg-blue-500"

                                      : item.status ===
                                        "Pending"

                                        ? "bg-orange-500"

                                        : "bg-red-500"
                                }

                      `}
                            >

                              {item.status}

                            </span>

                          </td>

                          <td className="border p-3">

                            {

                              new Date(
                                item.tanggal_update
                              ).toLocaleString(
                                "id-ID"
                              )

                            }

                          </td>

                        </tr>

                      )

                    )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}