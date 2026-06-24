import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { supabase } from "../../services/supabase";
=======
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588

export default function Login() {

    const navigate = useNavigate();

<<<<<<< HEAD
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {

        const { name, value } = evt.target;
=======
    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [dataForm, setDataForm] =
        useState({
            email: "",
            password: "",
        });

    const handleChange = (evt) => {

        const { name, value } =
            evt.target;
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588

        setDataForm({
            ...dataForm,
            [name]: value,
        });

    };

<<<<<<< HEAD
    const handleSubmit = async (e) => {
=======
    const handleSubmit = (e) => {
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588

        e.preventDefault();

        setLoading(true);
<<<<<<< HEAD
        setError("");

        try {

            const { data, error } =
                await supabase.auth.signInWithPassword({
                    email: dataForm.email,
                    password: dataForm.password,
                });

            if (error) {

                setError(error.message);
                setLoading(false);
                return;

            }

            const { data: petugas, error: petugasError } =
                await supabase
                    .from("petugas")
                    .select("*")
                    .eq("email", dataForm.email)
                    .single();

            if (petugasError) {

                setError("Data petugas tidak ditemukan");
                setLoading(false);
                return;

            }

            localStorage.setItem(
                "petugas",
                JSON.stringify(petugas)
            );

            navigate("/dashboard");

        } catch (err) {

            setError("Terjadi kesalahan saat login");

        }

        setLoading(false);
=======

        setError("");

        setTimeout(() => {

            if (
                dataForm.email ===
                    "admin" &&
                dataForm.password ===
                    "admin123"
            ) {

                localStorage.setItem(
                    "petugas",
                    JSON.stringify({
                        firstName:
                            "Administrator",
                        username:
                            "admin",
                        role:
                            "Admin",
                    })
                );

                navigate(
                    "/dashboard"
                );

            } else if (
                dataForm.email ===
                    "petugas" &&
                dataForm.password ===
                    "petugas123"
            ) {

                localStorage.setItem(
                    "petugas",
                    JSON.stringify({
                        firstName:
                            "Petugas Lapangan",
                        username:
                            "petugas",
                        role:
                            "Petugas",
                    })
                );

                navigate(
                    "/dashboard"
                );

            } else {

                setError(
                    "Username atau Password salah"
                );

            }

            setLoading(false);

        }, 800);
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white w-[450px] p-10 rounded-3xl shadow-sm">

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-green-700">
                        Zathra Prima Energi
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Login Petugas Penjemputan
                    </p>

                </div>

                {
                    error && (

                        <div className="bg-red-100 text-red-700 p-4 rounded-2xl mt-8 text-sm">

                            {error}

                        </div>

                    )
                }

                {
                    loading && (

                        <div className="bg-gray-100 text-gray-700 p-4 rounded-2xl mt-8 text-sm">

                            Memproses login...
<<<<<<< HEAD

=======
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588
                        </div>

                    )
                }

                <form
<<<<<<< HEAD
                    onSubmit={handleSubmit}
=======
                    onSubmit={
                        handleSubmit
                    }
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588
                    className="space-y-5 mt-8"
                >

                    <input
<<<<<<< HEAD
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-2xl outline-none"
                        required
=======
                        type="text"
                        name="email"
                        placeholder="Username"
                        value={
                            dataForm.email
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full border p-4 rounded-2xl outline-none"
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
<<<<<<< HEAD
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-2xl outline-none"
                        required
=======
                        value={
                            dataForm.password
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full border p-4 rounded-2xl outline-none"
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588
                    />

                    <button
                        type="submit"
<<<<<<< HEAD
                        disabled={loading}
=======
                        disabled={
                            loading
                        }
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588
                        className="w-full bg-green-600 hover:bg-green-700 transition-all text-white p-4 rounded-2xl"
                    >

                        {
                            loading
                                ? "Loading..."
                                : "Login"
                        }

                    </button>

                </form>

                <div className="mt-8 text-sm text-gray-500 text-center leading-7 border-t pt-5">

<<<<<<< HEAD
                    <p>
                        Login menggunakan akun yang terdaftar
                        di Supabase Authentication.
=======
                    <p className="font-semibold">
                        Akun Demo
                    </p>

                    <p>
                        Username :
                        <b> admin </b>
                    </p>

                    <p>
                        Password :
                        <b> admin123 </b>
                    </p>

                    <br />

                    <p>
                        Username :
                        <b> petugas </b>
                    </p>

                    <p>
                        Password :
                        <b> petugas123 </b>
>>>>>>> 7a3028895eef780b3f9169ed0f9718a98f11f588
                    </p>

                </div>

            </div>

        </div>

    );

}