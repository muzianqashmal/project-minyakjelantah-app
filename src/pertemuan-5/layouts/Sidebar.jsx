export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-green-900 to-green-700 text-white p-5">
      
      {/* LOGO / NAMA APP */}
      <h1 className="text-2xl font-bold mb-8 leading-tight">
        🟢 Zathra Prima Energi
        <p className="text-sm font-normal text-green-200">
          Sistem Minyak Jelantah
        </p>
      </h1>

      {/* MENU */}
      <ul className="space-y-3 text-sm">
        <li className="bg-green-600 px-3 py-2 rounded">Dashboard</li>
        <li className="hover:bg-green-600 px-3 py-2 rounded">Data Penjemputan</li>
        <li className="hover:bg-green-600 px-3 py-2 rounded">Tambah Data</li>
        <li className="hover:bg-green-600 px-3 py-2 rounded">Riwayat</li>
        <li className="hover:bg-green-600 px-3 py-2 rounded">Pelanggan</li>
        <li className="hover:bg-green-600 px-3 py-2 rounded">Laporan</li>
        <li className="hover:bg-green-600 px-3 py-2 rounded">Pengaturan</li>
        <li className="hover:bg-red-500 px-3 py-2 rounded mt-6">Logout</li>
      </ul>
    </div>
  );
}