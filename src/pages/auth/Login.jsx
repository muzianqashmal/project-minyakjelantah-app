import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {

        const { name, value } = evt.target;

        setDataForm({
            ...dataForm,
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
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
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-2xl outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-2xl outline-none"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
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

                    <p>
                        Login menggunakan akun yang terdaftar
                        di Supabase Authentication.
                    </p>

                </div>

            </div>

        </div>

    );

}