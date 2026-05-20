import {
    FaOilCan,
    FaUsers,
    FaMoneyBillWave
} from "react-icons/fa";

import {
    MdOutlineLocalShipping
} from "react-icons/md";

export default function Dashboard() {

    const cards = [
        {
            title: "Total Penjemputan",
            value: "120",
            icon: <MdOutlineLocalShipping />,
            bg: "bg-blue-100",
            text: "text-blue-600"
        },
        {
            title: "Total Liter",
            value: "2.450 L",
            icon: <FaOilCan />,
            bg: "bg-yellow-100",
            text: "text-yellow-600"
        },
        {
            title: "Total Pelanggan",
            value: "35",
            icon: <FaUsers />,
            bg: "bg-green-100",
            text: "text-green-600"
        },
        {
            title: "Pendapatan",
            value: "Rp 12 Jt",
            icon: <FaMoneyBillWave />,
            bg: "bg-red-100",
            text: "text-red-600"
        }
    ];

    return (

        <div>

            <h1 className="text-3xl font-bold text-gray-800">
                Dashboard Minyak Jelantah
            </h1>

            <p className="text-gray-500 mt-2">
                Monitoring sistem penjemputan minyak jelantah.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-5 mt-8">

                {cards.map((item, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-2xl p-5 shadow-sm"
                    >

                        <div className="flex justify-between">

                            <div>

                                <p className="text-gray-500">
                                    {item.title}
                                </p>

                                <h1 className="text-3xl font-bold mt-3">
                                    {item.value}
                                </h1>

                            </div>

                            <div className={`${item.bg} ${item.text} p-4 rounded-2xl text-3xl`}>
                                {item.icon}
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}