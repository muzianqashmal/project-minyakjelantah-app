import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <p className="text-2xl font-semibold mt-4">Wah, Halamannya Gak Ada!</p>
      <p className="text-gray-500 mt-2">Mungkin kamu salah ketik alamat atau halamannya sudah pindah.</p>
      <Link 
        to="/" 
        className="mt-6 px-6 py-2 bg-hijau text-white rounded-lg hover:bg-emerald-600 transition"
      >
        Balik ke Dashboard
      </Link>
    </div>
  );
}