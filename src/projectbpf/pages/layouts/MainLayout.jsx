import Sidebar from "./Sidebar.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="flex bg-[#f4f7f6] min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1">
        {/* Header Putih Atas */}
        <header className="bg-white h-16 border-b flex items-center justify-between px-8">
          <span className="text-sm text-gray-500 font-medium">Dashboard</span>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800 leading-none">Muzian Qashmal</p>
              <p className="text-[10px] text-gray-400">Owner</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-emerald-500 overflow-hidden">
               <div className="w-full h-full bg-slate-400"></div> {/* Placeholder Foto */}
            </div>
          </div>
        </header>

        {/* Konten Utama */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}