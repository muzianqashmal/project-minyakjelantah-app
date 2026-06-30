import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Penjemputan() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    setLoading(true);

    const { data, error } = await supabase
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
      .order(
        "tanggal_pengajuan",
        {
          ascending: false,
        }
      );

    if (error) {

      console.log(error);

      alert(error.message);

      setLoading(false);

      return;

    }

    setData(data);

    setLoading(false);

  };

  const filteredData =
    data.filter((item) => {

      const nama =
        item.pelanggan?.nama || "";

      const kode =
        item.kode_pengajuan || "";

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

  const totalPending =
    data.filter(
      x =>
        x.status ===
        "Pending"
    ).length;

  const totalDiproses =
    data.filter(
      x =>
        x.status ===
        "Diproses" ||

        x.status ===
        "Dalam Perjalanan"
    ).length;

  const totalSelesai =
    data.filter(
      x =>
        x.status ===
        "Selesai"
    ).length;
  const ubahStatus = async (
    idPenjemputan,
    statusBaru
  ) => {

    const { error } =
      await supabase
        .from("penjemputan")
        .update({
          status: statusBaru,
        })
        .eq(
          "id_penjemputan",
          idPenjemputan
        );

    if (error) {

      alert(error.message);
      return;

    }

    const {
      error: riwayatError,
    } = await supabase
      .from("riwayat_status")
      .insert([
        {
          id_penjemputan:
            idPenjemputan,

          status:
            statusBaru,

          tanggal_update:
            new Date(),

          keterangan:
            "Status diubah menjadi " +
            statusBaru,
        },
      ]);

    if (riwayatError) {

      alert(
        riwayatError.message
      );

      return;

    }

    await loadData();

    alert(
      "Status berhasil diperbarui"
    );

  };

  const hapusData = async (
    idPenjemputan
  ) => {

    const konfirmasi =
      window.confirm(
        "Yakin ingin menghapus data penjemputan?"
      );

    if (!konfirmasi) return;

    const { error } =
      await supabase
        .from("penjemputan")
        .delete()
        .eq(
          "id_penjemputan",
          idPenjemputan
        );

    if (error) {

      alert(error.message);

      return;

    }

    await loadData();

    alert(
      "Data berhasil dihapus"
    );

  };

  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Data Penjemputan
          </h1>

          <Link
            to="/tambah"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
          >
            Tambah Data
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-blue-100 rounded-xl p-5">

            <p className="text-gray-600">
              Total Penjemputan
            </p>

            <h2 className="text-3xl font-bold text-blue-700">

              {data.length}

            </h2>

          </div>

          <div className="bg-orange-100 rounded-xl p-5">

            <p className="text-gray-600">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-orange-700">

              {totalPending}

            </h2>

          </div>

          <div className="bg-yellow-100 rounded-xl p-5">

            <p className="text-gray-600">
              Diproses
            </p>

            <h2 className="text-3xl font-bold text-yellow-700">

              {totalDiproses}

            </h2>

          </div>

          <div className="bg-green-100 rounded-xl p-5">

            <p className="text-gray-600">
              Selesai
            </p>

            <h2 className="text-3xl font-bold text-green-700">

              {totalSelesai}

            </h2>

          </div>

        </div>

        <input
          type="text"
          placeholder="Cari kode atau nama pelanggan..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3 w-full mb-5"
        />

        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-3">
                  Kode
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
                  Petugas
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
                loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center p-5"
                    >
                      Memuat data...
                    </td>

                  </tr>

                ) : filteredData.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center p-5"
                    >
                      Belum ada data penjemputan
                    </td>

                  </tr>

                ) : (

                  filteredData.map((item) => (

                    <tr
                      key={item.id_penjemputan}
                    >

                      <td className="border p-3">
                        {item.kode_pengajuan}
                      </td>

                      <td className="border p-3">
                        {item.pelanggan?.nama}
                      </td>

                      <td className="border p-3">
                        {item.pelanggan?.no_hp}
                      </td>

                      <td className="border p-3">
                        {item.estimasi_liter} Liter
                      </td>

                      <td className="border p-3">
                        {
                          new Date(
                            item.tanggal_pengajuan
                          ).toLocaleDateString("id-ID")
                        }
                      </td>

                      <td className="border p-3">
                        {
                          item.petugas?.nama ??
                          "-"
                        }
                      </td>

                      <td className="border p-3">

                        <select
                          value={item.status}
                          onChange={(e) =>
                            ubahStatus(
                              item.id_penjemputan,
                              e.target.value
                            )
                          }
                          className="border rounded p-2 w-full"
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Dijadwalkan">
                            Dijadwalkan
                          </option>

                          <option value="Diproses">
                            Diproses
                          </option>

                          <option value="Dalam Perjalanan">
                            Dalam Perjalanan
                          </option>

                          <option value="Sedang Dijemput">
                            Sedang Dijemput
                          </option>

                          <option value="Selesai">
                            Selesai
                          </option>

                          <option value="Dibatalkan">
                            Dibatalkan
                          </option>

                        </select>

                      </td>

                      <td className="border p-3">

                        <div className="flex gap-2">

                          <Link
                            to={`/penjemputan/${item.id_penjemputan}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Detail
                          </Link>

                          <button
                            onClick={() =>
                              hapusData(
                                item.id_penjemputan
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Hapus
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}