export default function Header() {

    return (

        <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">

            <div>

                <h1 className="text-2xl font-bold">
                    Sistem Penjemputan Minyak Jelantah
                </h1>

                <p className="text-gray-500 mt-1">
                    Dashboard Monitoring
                </p>

            </div>

            <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex justify-center items-center font-bold">
                    M
                </div>

                <div>

                    <h1 className="font-bold">
                        Muzian
                    </h1>

                    <p className="text-sm text-gray-500">
                        Admin
                    </p>

                </div>

            </div>

        </div>

    );

}