import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    // Handle Input
    const handleChange = (evt) => {

        const { name, value } = evt.target;

        setDataForm({
            ...dataForm,
            [name]: value,
        });

    };

    // Handle Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        axios
            .post("https://dummyjson.com/auth/login", {

                username: dataForm.email,
                password: dataForm.password,

            })

            .then((response) => {

                console.log(response.data);

                navigate("/dashboard");

            })

            .catch((err) => {

                if (err.response) {

                    setError(
                        err.response.data.message
                    );

                } else {

                    setError(
                        "Terjadi kesalahan"
                    );

                }

            })

            .finally(() => {

                setLoading(false);

            });

    };

    // Error
    const errorInfo = error ? (

        <div className="bg-red-200 mb-5 p-4 rounded-xl text-red-700 text-sm">
            {error}
        </div>

    ) : null;

    // Loading
    const loadingInfo = loading ? (

        <div className="bg-gray-200 mb-5 p-4 rounded-xl text-sm">
            Mohon Tunggu...
        </div>

    ) : null;

    return (

        <div>

            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                Login Petugas
            </h2>

            {errorInfo}

            {loadingInfo}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
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
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl"
                >
                    Login
                </button>

            </form>

            <div className="mt-8 text-sm text-gray-500 text-center">

                Username :
                <b> emilys </b>

                <br />

                Password :
                <b> emilyspass </b>

            </div>

        </div>

    );

}