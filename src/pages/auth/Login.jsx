import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

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

        setDataForm({
            ...dataForm,
            [name]: value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        setLoading(true);

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
                        </div>

                    )
                }

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-5 mt-8"
                >

                    <input
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
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={
                            dataForm.password
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full border p-4 rounded-2xl outline-none"
                    />

                    <button
                        type="submit"
                        disabled={
                            loading
                        }
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
                    </p>

                </div>

            </div>

        </div>

    );

}