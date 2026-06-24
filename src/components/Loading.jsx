export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white">

            <div className="h-16 w-16 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>

            <h1 className="mt-5 text-2xl font-bold text-green-700">
                Zathra Prima Energi
            </h1>

            <p className="text-gray-500">
                Memuat dashboard minyak jelantah...
            </p>

        </div>
    );
}