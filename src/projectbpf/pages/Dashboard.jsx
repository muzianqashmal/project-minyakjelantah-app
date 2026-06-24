import MainLayout from "./layouts/MainLayout.jsx";

const StatCard = ({ label, value, icon, iconBg }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 flex-1">
    <div className={`${iconBg} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-inner`}>
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      <p className="text-gray-400 text-xs font-medium">{label}</p>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <MainLayout>
      {/* Top Header Inner */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <nav className="text-xs text-gray-400 flex gap-1">
            <span>Dashboard</span> / <span>Order List</span>
          </nav>
        </div>
        <button className="bg-[#00c853] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all shadow-md">
          Add Button
        </button>
      </div>

      {/* Stats Grid - 4 Columns */}
      <div className="flex flex-row gap-6 mb-8">
        <StatCard label="Total Orders" value="75" icon="🛒" iconBg="bg-emerald-500" />
        <StatCard label="Total Delivered" value="175" icon="🚚" iconBg="bg-blue-600" />
        <StatCard label="Total Canceled" value="40" icon="🚫" iconBg="bg-red-500" />
        <StatCard label="Total Revenue" value="Rp.128" icon="💰" iconBg="bg-amber-500" />
      </div>
    </MainLayout>
  );
}