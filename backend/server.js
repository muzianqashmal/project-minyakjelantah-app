const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Dashboard API
|--------------------------------------------------------------------------
*/

app.get("/dashboard", (req, res) => {

    res.json({
        totalPenjemputan: 120,
        totalLiter: 2450,
        totalPelanggan: 35,
        pendapatan: "12 Jt"
    });

});

/*
|--------------------------------------------------------------------------
| Penjemputan API
|--------------------------------------------------------------------------
*/

app.get("/penjemputan", (req, res) => {

    res.json([
        {
            nama: "Warung Bu Siti",
            tanggal: "12 Mei 2026",
            jumlah: 25
        },
        {
            nama: "RM Barokah",
            tanggal: "13 Mei 2026",
            jumlah: 40
        },
        {
            nama: "Cafe Senja",
            tanggal: "14 Mei 2026",
            jumlah: 30
        }
    ]);

});

/*
|--------------------------------------------------------------------------
| Root API
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.send("Backend berjalan");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});