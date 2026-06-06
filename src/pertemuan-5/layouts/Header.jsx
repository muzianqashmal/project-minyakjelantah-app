export default function Header() {
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-4">
      
      {/* KIRI */}
      <h2 className="text-lg font-semibold text-gray-700">
        Dashboard
      </h2>

      {/* KANAN (PROFILE) */}
      <div className="flex items-center gap-3">
        
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />

        <div className="text-sm">
          <p className="font-semibold text-gray-700">
            Muzian Qashmal
          </p>
          <p className="text-gray-500 text-xs">
            Owner
          </p>
        </div>

      </div>
    </div>
  );
}