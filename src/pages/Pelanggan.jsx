import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Pelanggan() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const [form, setForm] =
    useState({
      nama: "",
      no_hp: "",
      alamat: "",
    });

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    setLoading(true);

    const { data, error } = await supabase
      .from("pelanggan")
      .select("*")
      .order("id_pelanggan", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setData(data);
    setLoading(false);

  };

  const editData = (item) => {

    setEditId(
      item.id_pelanggan
    );

    setForm({

      nama:
        item.nama,

      no_hp:
        item.no_hp,

      alamat:
        item.alamat,

    });

  };

  const simpanEdit = async () => {

    const { error } =
      await supabase
        .from("pelanggan")
        .update({

          nama:
            form.nama,

          no_hp:
            form.no_hp,

          alamat:
            form.alamat,

        })
        .eq(
          "id_pelanggan",
          editId
        );

    if (error) {

      alert(error.message);

      return;

    }

    alert(
      "Data berhasil diperbarui"
    );

    setEditId(null);

    loadData();

  };

  const hapusData = async (
    id
  ) => {

    if (
      !window.confirm(
        "Yakin ingin menghapus pelanggan?"
      )
    ) {
      return;
    }

    const { error } =
      await supabase
        .from("pelanggan")
        .delete()
        .eq(
          "id_pelanggan",
          id
        );

    if (error) {

      alert(error.message);

      return;

    }

    alert(
      "Data berhasil dihapus"
    );

    loadData();

  };

  const filteredData =
    data.filter((item) =>

      item.nama
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      item.no_hp
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  const totalPelanggan =
    data.length;

  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-4">
          Data Pelanggan
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-5">

          <div className="bg-green-100 p-4 rounded-xl">

            <h3 className="font-semibold">
              Total Pelanggan
            </h3>

            <p className="text-3xl font-bold text-green-700">
              {totalPelanggan}
            </p>

          </div>

        </div>

        <input
          type="text"
          placeholder="Cari nama atau nomor HP..."
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
                  Nama
                </th>

                <th className="border p-3">
                  No HP
                </th>

                <th className="border p-3">
                  Alamat
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
                      colSpan="4"
                      className="text-center p-5"
                    >

                      Memuat data...

                    </td>

                  </tr>

                ) :

                  filteredData.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center p-5"
                      >

                        Belum ada data pelanggan

                      </td>

                    </tr>

                  ) :

                    filteredData.map((item) => (

                      <tr
                        key={item.id_pelanggan}
                      >

                        <td className="border p-3">
                          {item.nama}
                        </td>

                        <td className="border p-3">
                          {item.no_hp}
                        </td>

                        <td className="border p-3">
                          {item.alamat}
                        </td>

                        <td className="border p-3">

                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                editData(item)
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                hapusData(
                                  item.id_pelanggan
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

              }

            </tbody>

          </table>

        </div>

      </div>

      {
        editId && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
              Edit Pelanggan
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Nama"
                value={form.nama}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nama:
                      e.target.value,
                  })
                }
                className="border p-3 rounded w-full"
              />

              <input
                type="text"
                placeholder="Nomor HP"
                value={form.no_hp}
                onChange={(e) =>
                  setForm({
                    ...form,
                    no_hp:
                      e.target.value,
                  })
                }
                className="border p-3 rounded w-full"
              />

              <textarea
                placeholder="Alamat"
                value={form.alamat}
                onChange={(e) =>
                  setForm({
                    ...form,
                    alamat:
                      e.target.value,
                  })
                }
                className="border p-3 rounded w-full"
              />

              <div className="flex gap-3">

                <button
                  onClick={simpanEdit}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                >
                  Simpan
                </button>

                <button
                  onClick={() =>
                    setEditId(null)
                  }
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
                >
                  Batal
                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

}