import { useState } from "react";
export default function HitungGajiForm() {
    const [gaji, setGaji] = useState("");
    const pajak = 0.11;
    const totalGaji = gaji-(gaji*pajak);
	return (
		<div className="flex flex-col items-center justify-center m-5 p-5 bg-pink-200">
			<div className="bg-pink-100 p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-semibold text-center mb-4 text-yellow-400">Hitung Gaji Bersih</h2>

				<div className="mb-4">
					<label className="block text-yellow-300 font-medium mb-1">
						Gaji Pokok
					</label>
					<input
						type="number"
						placeholder="Masukkan jumlah gaji"
						className="w-full p-2 border border-purple-300 rounded focus:ring-2 focus:ring-purple-500"
                        onChange={(e) => setGaji(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-yellow-300 font-medium mb-1">
						Pajak: <b class="text-red-500">11%</b>
					</label>
				</div>
            {!gaji ? (
                <div className="mt-4 p-3 bg-pink-400 border-l-4 border-purple-500 text-pink-600">
					<p className="font-semibold">
                        Silahkan Masukkan Gaji yang Valid (Tidak Boleh Kosong atau Negatif).
					</p>
				</div>
            ) : (
				<div className="mt-4 p-3 bg-pink-400 border-l-4 border-purple-500 text-pink-600">
					<p className="font-semibold">
						Total Take Home Pay (THP): Rp {totalGaji.toLocaleString()}
					</p>
				</div>
            )}
			</div>
		</div>
	);
}
