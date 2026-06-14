import { useEffect, useState } from "react";

export default function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRiwayat();
  }, []);

  const loadRiwayat = () => {
    const data =
      JSON.parse(
        localStorage.getItem("riwayat")
      ) || [];

    const sortedData = data.sort(
      (a, b) =>
        new Date(b.tanggal) -
        new Date(a.tanggal)
    );

    setRiwayat(sortedData);
  };

  const filteredData = riwayat.filter(
    (item) =>
      item.nama
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      item.pengajuanId
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-5">

          <h1 className="text-3xl font-bold">
            Riwayat Penjemputan
          </h1>

          <div className="bg-green-100 px-4 py-2 rounded">
            Total Riwayat :{" "}
            <strong>
              {riwayat.length}
            </strong>
          </div>

        </div>

        <input
          type="text"
          placeholder="Cari Nama / ID Pengajuan..."
          className="border p-3 rounded w-full mb-5"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <div className="overflow-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-3">
                  No
                </th>

                <th className="border p-3">
                  ID Pengajuan
                </th>

                <th className="border p-3">
                  Nama
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

              {filteredData.length ===
              0 ? (
                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-5"
                  >
                    Belum ada riwayat
                  </td>

                </tr>
              ) : (
                filteredData.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={
                        item.id
                      }
                    >

                      <td className="border p-3">
                        {index + 1}
                      </td>

                      <td className="border p-3">
                        {
                          item.pengajuanId
                        }
                      </td>

                      <td className="border p-3">
                        {
                          item.nama
                        }
                      </td>

                      <td className="border p-3">

                        <span
                          className={`px-3 py-1 rounded text-white ${
                            item.status ===
                            "Selesai"
                              ? "bg-green-500"
                              : item.status ===
                                "Dalam Perjalanan"
                              ? "bg-blue-500"
                              : item.status ===
                                "Diproses"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {
                            item.status
                          }
                        </span>

                      </td>

                      <td className="border p-3">
                        {
                          item.tanggal
                        }
                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}