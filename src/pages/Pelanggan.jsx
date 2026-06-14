import { useEffect, useState } from "react";

export default function Pelanggan() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [editId, setEditId] =
    useState(null);

  const [form, setForm] =
    useState({
      nama: "",
      hp: "",
      alamat: "",
    });

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

  const hapusData = (id) => {

    if (
      !window.confirm(
        "Yakin ingin menghapus pelanggan?"
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

  const editData = (item) => {

    setEditId(item.id);

    setForm({
      nama: item.nama || "",
      hp:
        item.hp ||
        item.nohp ||
        "",
      alamat:
        item.alamat || "",
    });

  };

  const simpanEdit = () => {

    const hasil =
      data.map((item) => {

        if (
          item.id === editId
        ) {

          return {
            ...item,
            nama: form.nama,
            hp: form.hp,
            alamat:
              form.alamat,
          };

        }

        return item;

      });

    setData(hasil);

    localStorage.setItem(
      "penjemputan",
      JSON.stringify(hasil)
    );

    setEditId(null);

    alert(
      "Data berhasil diperbarui"
    );

  };

  const filteredData =
    data.filter((item) => {

      const hp =
        item.hp ||
        item.nohp ||
        "";

      return (
        item.nama
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        hp
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    });

  const totalPelanggan =
    [
      ...new Set(
        data.map(
          (item) =>
            item.hp ||
            item.nohp
        )
      ),
    ].length;

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
                filteredData.length === 0
                  ? (

                    <tr>

                      <td
                        colSpan="4"
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
                            {item.nama}
                          </td>

                          <td className="border p-3">
                            {
                              item.hp ||
                              item.nohp
                            }
                          </td>

                          <td className="border p-3">
                            {
                              item.alamat
                            }
                          </td>

                          <td className="border p-3">

                            <div className="flex gap-2">

                              <button
                                onClick={() =>
                                  editData(
                                    item
                                  )
                                }
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                              >
                                Edit
                              </button>

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
                placeholder="No HP"
                value={form.hp}
                onChange={(e) =>
                  setForm({
                    ...form,
                    hp:
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
                  onClick={
                    simpanEdit
                  }
                  className="bg-green-600 text-white px-5 py-2 rounded"
                >
                  Simpan
                </button>

                <button
                  onClick={() =>
                    setEditId(null)
                  }
                  className="bg-gray-500 text-white px-5 py-2 rounded"
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