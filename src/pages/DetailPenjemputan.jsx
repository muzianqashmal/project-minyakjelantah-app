import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailPenjemputan() {

    const { id } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        axios
            .get(`https://dummyjson.com/users/${id}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err.message);
            });

    }, [id]);

    if (error) {
        return (
            <div className="bg-red-100 text-red-600 p-4 rounded-xl">
                {error}
            </div>
        );
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm">

            <h1 className="text-3xl font-bold mb-6">
                Detail Penjemputan
            </h1>

            <div className="space-y-3">

                <p>
                    <b>Nama :</b> {data.firstName} {data.lastName}
                </p>

                <p>
                    <b>Email :</b> {data.email}
                </p>

                <p>
                    <b>No HP :</b> {data.phone}
                </p>

                <p>
                    <b>Kota :</b> {data?.address?.city}
                </p>

                <p>
                    <b>Alamat :</b> {data?.address?.address}
                </p>

            </div>

        </div>
    );
}