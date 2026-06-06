import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Login() {

    const navigate = useNavigate();

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    /*
    |--------------------------------------------------------------------------
    | Handle Input
    |--------------------------------------------------------------------------
    */

    const handleChange = (evt) => {

        const { name, value } = evt.target;

        setDataForm({
            ...dataForm,
            [name]: value,
        });

    };

    /*
    |--------------------------------------------------------------------------
    | Handle Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        axios

            .post(
                "https://dummyjson.com/auth/login",
                {
                    username: dataForm.email,
                    password: dataForm.password,
                }
            )

            .then((response) => {

                console.log(response.data);

                // Simpan login
                localStorage.setItem(
                    "petugas",
                    JSON.stringify(response.data)
                );

                // Redirect
                navigate("/dashboard");

            })

            .catch((err) => {

                if (err.response) {

                    setError(
                        err.response.data.message
                    );

                } else {

                    setError(
                        "Terjadi kesalahan server"
                    );

                }

            })

            .finally(() => {

                setLoading(false);

            });

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white w-[450px] p-10 rounded-3xl shadow-sm">

                {/* Logo */}
                <div className="text-center">

                    <h1 className="text-4xl font-bold text-green-700">
                        Zathra Prima Energi
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Login Petugas Penjemputan
                    </p>

                </div>

                {/* Error */}
                {
                    error && (

                        <div className="bg-red-100 text-red-700 p-4 rounded-2xl mt-8 text-sm">

                            {error}

                        </div>

                    )
                }

                {/* Loading */}
                {
                    loading && (

                        <div className="bg-gray-100 text-gray-700 p-4 rounded-2xl mt-8 text-sm">

                            Mohon tunggu...

                        </div>

                    )
                }

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                >

                    <input
                        type="text"
                        name="email"
                        placeholder="Username"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-2xl outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-2xl outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 transition-all text-white p-4 rounded-2xl"
                    >

                        {
                            loading
                            ? "Loading..."
                            : "Login"
                        }

                    </button>

                </form>

                {/* Demo */}
                <div className="mt-8 text-sm text-gray-500 text-center leading-7">

                    Username :
                    <b> emilys </b>

                    <br />

                    Password :
                    <b> emilyspass </b>

                </div>

            </div>

        </div>

    );

}