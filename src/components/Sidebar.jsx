import {
  MdDashboard,
  MdOutlineLocalShipping,
  MdHistory,
  MdPeople,
  MdAssessment,
  MdSettings,
  MdAddCircle,
  MdLogout
} from "react-icons/md";

import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const petugas =
    JSON.parse(
      localStorage.getItem("petugas")
    );

  const menu = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard />
    },
    {
      title: "Tambah Penjemputan",
      path: "/tambah",
      icon: <MdAddCircle />
    },
    {
      title: "Data Penjemputan",
      path: "/penjemputan",
      icon: <MdOutlineLocalShipping />
    },
    {
      title: "Data Pelanggan",
      path: "/pelanggan",
      icon: <MdPeople />
    },
    {
      title: "Riwayat",
      path: "/riwayat",
      icon: <MdHistory />
    },
    {
      title: "Laporan",
      path: "/laporan",
      icon: <MdAssessment />
    },
    {
      title: "Pengaturan",
      path: "/pengaturan",
      icon: <MdSettings />
    }
  ];

  const logout = () => {

    if (
      !window.confirm(
        "Yakin ingin logout?"
      )
    ) {
      return;
    }

    localStorage.removeItem(
      "petugas"
    );

    window.location.href =
      "/login";
  };

  return (

    <aside
      className="
      w-72
      min-h-screen
      text-white
      flex
      flex-col
      bg-gradient-to-b
      from-green-950
      via-green-900
      to-green-700
    "
    >

      {/* Logo */}

      <div className="p-6">

        <h1 className="text-3xl font-bold">
          ZATHRA
        </h1>

        <p className="text-green-300">
          PRIMA ENERGI
        </p>

      </div>

      {/* User */}

      <div className="px-6 pb-6">

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="
              w-12
              h-12
              rounded-full
              border-2
              border-green-300
            "
          />

          <div>

            <h3 className="font-bold">
              {
                petugas?.firstName ||
                "Administrator"
              }
            </h3>

            <p className="text-sm text-green-300">
              Admin
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 px-4">

        {
          menu.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                p-4
                rounded-xl
                mb-2
                transition-all
                ${
                  isActive
                    ? "bg-green-600 shadow-lg"
                    : "hover:bg-green-800"
                }
              `
              }
            >

              <span className="text-2xl">
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>

            </NavLink>

          ))
        }

      </div>

      {/* Foto Armada */}

      <div className="p-4">

        <img
          src="/img/tanki.jpeg"
          alt="Armada"
          className="
            w-full
            h-40
            object-cover
            rounded-2xl
            shadow-lg
          "
        />

      </div>

      {/* Logout */}

      <div className="p-4">

        <button
          onClick={logout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-red-500
            hover:bg-red-600
            rounded-xl
            p-3
          "
        >

          <MdLogout />

          Logout

        </button>

      </div>

    </aside>

  );

}