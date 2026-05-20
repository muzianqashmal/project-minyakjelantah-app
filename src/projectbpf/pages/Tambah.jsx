import MainLayout from "./layouts/MainLayout.jsx";

export default function Tambah() {
  return (
    <MainLayout>
      <h1>Tambah Data</h1>

      <input placeholder="Nama" /><br /><br />
      <input placeholder="Alamat" /><br /><br />

      <button>Simpan</button>
    </MainLayout>
  );
}