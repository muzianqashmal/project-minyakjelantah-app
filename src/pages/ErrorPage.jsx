import { Link } from "react-router-dom";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
      <img 
        src={image || "https://i.pinimg.com/1200x/80/f7/ba/80f7ba73dba7c6f1a428f6dd0b528570.jpg"} 
        alt={`Error ${code}`} 
        className="w-64 mb-6"
      />
      <h1 className="text-6xl font-poppins-extrabold text-gray-900 mb-2">
        {code}
      </h1>
      <p className="text-xl text-gray-500 mb-8 max-w-md">
        {description}
      </p>
      <Link 
        to="/" 
        className="bg-hijau text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-600 transition-all"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}