import { FaBell, FaSearch } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";

export default function Header() {
    return (
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm">

            {/* Search */}
            <div className="relative w-[400px]">

                <input
                    type="text"
                    placeholder="Cari data penjemputan..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 pl-12 outline-none focus:border-green-500"
                />

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            </div>

            {/* Right */}
            <div className="flex items-center gap-5">

                <div className="relative cursor-pointer">
                    <FaBell className="text-xl text-gray-600" />

                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        3
                    </span>
                </div>

                <div className="flex items-center gap-3 border-l pl-5">

                    <div className="text-right">
                        <p className="font-bold text-gray-800">
                            Muzian Qashmal
                        </p>

                        <span className="text-sm text-gray-500">
                            Owner
                        </span>
                    </div>

                    <HiOutlineUserCircle className="text-5xl text-green-600" />

                </div>

            </div>

        </div>
    );
}