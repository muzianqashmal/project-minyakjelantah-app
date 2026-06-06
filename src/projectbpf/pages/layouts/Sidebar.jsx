export default function Sidebar() {
  const menus = [
    { name: "Dashboard", active: true },
    { name: "Data Penjemputan", active: false },
    { name: "Tambah Data", active: false },
    { name: "Riwayat", active: false },
    { name: "Pelanggan", active: false },
    { name: "Laporan", active: false },
    { name: "Pengaturan", active: false },
    { name: "Logout", active: false },
  ];

  return (
    <div className="w-64 bg-[#008d36] min-h-screen text-white p-4">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
        <div>
          <h1 className="font-bold text-sm leading-tight text-white">Zathra Prima Energi</h1>
          <p className="text-[10px] text-emerald-100">Sistem Minyak Jelantah</p>
        </div>
      </div>

      <nav className="space-y-1">
        {menus.map((menu) => (
          <div
            key={menu.name}
            className={`px-4 py-3 rounded-md text-sm cursor-pointer transition-all ${
              menu.active 
                ? "bg-[#00c853] shadow-lg font-semibold" 
                : "hover:bg-emerald-600/50"
            }`}
          >
            {menu.name}
          </div>
        ))}
      </nav>
    </div>
  );
}