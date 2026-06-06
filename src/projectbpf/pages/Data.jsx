import MainLayout from "./layouts/MainLayout.jsx";

export default function Data() {
  const data = [
    { nama: "Andi", alamat: "Jl Mawar", status: "Menunggu" },
    { nama: "Budi", alamat: "Jl Melati", status: "Dijemput" },
  ];

  return (
    <MainLayout>
      <h1>Data Penjemputan</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.nama}</td>
              <td>{d.alamat}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}