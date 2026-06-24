import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Penjemputan() {

  const [data, setData] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {

    const hasil =
      JSON.parse(
        localStorage.getItem(
          "penjemputan"
        )
      ) || [];

    setData(hasil);

  };

  const ubahStatus = (
    id,
    statusBaru
  ) => {

    const dataBaru =
      data.map((item) => {

        if (
          item.id === id
        ) {

          return {
            ...item,
            status:
              statusBaru,
          };

        }

        return item;

      });

    setData(dataBaru);

    localStorage.setItem(
      "penjemputan",
      JSON.stringify(dataBaru)
    );

    const riwayat =
      JSON.parse(
        localStorage.getItem(
          "riwayat"
        )
      ) || [];

    const dataUpdate =
      data.find(
        (x) =>
          x.id === id
      );

    riwayat.push({
      id: Date.now(),
      pengajuanId: id,
      nama:
        dataUpdate.nama,
      status:
        statusBaru,
      tanggal:
        new Date().toLocaleString(),
    });

    localStorage.setItem(
      "riwayat",
      JSON.stringify(riwayat)
    );

  };

  const hapusData = (
    id
  ) => {

    if (
      !window.confirm(
        "Yakin ingin menghapus data?"
      )
    ) {
      return;
    }

    const hasil =
      data.filter(
        (item) =>
          item.id !== id
      );

    setData(hasil);

    localStorage.setItem(
      "penjemputan",
      JSON.stringify(hasil)
    );

  };

  const filteredData =
    data.filter(
      (item) =>
        item.nama
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.id
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalSelesai =
    data.filter(
      (item) =>
        item.status ===
        "Selesai"
    ).length;

  const totalDiproses =
    data.filter(
      (item) =>
        item.status ===
          "Diproses" ||
        item.status ===
          "Dalam Perjalanan"
    ).length;

  return (

    <div className="space-y-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-5">

          <h1 className="text-3xl font-bold">
            Data Penjemputan
          </h1>

          <Link
            to="/tambah"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Tambah Data
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-5">

          <div className="bg-blue-100 p-4 rounded-xl">

            <h3 className="font-semibold">
              Total Penjemputan
            </h3>

            <p className="text-3xl font-bold text-blue-700">
              {data.length}
            </p>

          </div>

          <div className="bg-yellow-100 p-4 rounded-xl">

            <h3 className="font-semibold">
              Sedang Diproses
            </h3>

            <p className="text-3xl font-bold text-yellow-600">
              {totalDiproses}
            </p>

          </div>

          <div className="bg-green-100 p-4 rounded-xl">

            <h3 className="font-semibold">
              Selesai
            </h3>

            <p className="text-3xl font-bold text-green-700">
              {totalSelesai}
            </p>

          </div>

        </div>

        <input
          type="text"
          placeholder="Cari ID atau Nama..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border p-3 rounded w-full mb-5"
        />

        <div className="overflow-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-3">
                  ID
                </th>

                <th className="border p-3">
                  Nama
                </th>

                <th className="border p-3">
                  No HP
                </th>

                <th className="border p-3">
                  Liter
                </th>

                <th className="border p-3">
                  Tanggal
                </th>

                <th className="border p-3">
                  Status
                </th>

                <th className="border p-3">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody>

              {
                filteredData.length === 0
                  ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center p-5"
                      >
                        Data tidak ditemukan
                      </td>

                    </tr>

                  )
                  : (

                    filteredData.map(
                      (item) => (

                        <tr key={item.id}>

                          <td className="border p-3">
                            {item.id}
                          </td>

                          <td className="border p-3">
                            {item.nama}
                          </td>

                          <td className="border p-3">
                            {
                              item.hp ||
                              item.nohp
                            }
                          </td>

                          <td className="border p-3">
                            {item.jumlah} Liter
                          </td>

                          <td className="border p-3">
                            {
                              item.tanggalPengajuan
                            }
                          </td>

                          <td className="border p-3">

                            <select
                              value={
                                item.status
                              }
                              onChange={(e) =>
                                ubahStatus(
                                  item.id,
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded"
                            >

                              <option>
                                Menunggu
                              </option>

                              <option>
                                Dijadwalkan
                              </option>

                              <option>
                                Diproses
                              </option>

                              <option>
                                Dalam Perjalanan
                              </option>

                              <option>
                                Sedang Dijemput
                              </option>

                              <option>
                                Selesai
                              </option>

                              <option>
                                Dibatalkan
                              </option>

                            </select>

                          </td>

                          <td className="border p-3">

                            <div className="flex gap-2">

                              <Link
                                to={`/penjemputan/${item.id}`}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                              >
                                Detail
                              </Link>

                              <button
                                onClick={() =>
                                  hapusData(
                                    item.id
                                  )
                                }
                                className="bg-red-500 text-white px-3 py-1 rounded"
                              >
                                Hapus
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
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