export default function TailwindCSS(){
    return(
        <div>
            <p className="border text-green-300 m-4 p-2 ">Belajar Tailwind CSS</p>
            <button className="px-4 py-4 mx-4 bg-pink-400 text-green-300 rounded-lg">Click Me</button>
        
        <Spacing/>
        <Typography/>
        <BorderRadius/>
        <BackgroundColors/>
        <FlexboxGrid/>
        <ShadowEffects/>
        
        </div>
    );
}

function Spacing(){
    return(
        <div className="p-6 m-4 shadow-lg bg-pink-200 rounded-lg">
            <h2 className="text-yellow-400 font-bold">Card Title</h2>
            <p className="mt-2 text-purple-400">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}

function Typography(){
    return (
        <div>
            <h1 className="text-3xl font-bold text-red-600">Tailwind Typography</h1>
            <p className="text-brown-800 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <button className="border-2 border-orange-300 text-orange-600 px-4 py-2 rounded-lg"> Klik Saya </button>
    )
}

function BackgroundColors(){
    return(
        <div className="bg-red-500 text-yellow-300 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-blue-800 p-4 text-white">
            <h1 className="text-lg text-pink-400 font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li className="text-red-500"><a href="#">Home</a></li>
                <li className="text-yellow-300"><a href="#">About</a></li>
                <li className="text-green-500"><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-purple-300 shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
            <h3 className="text-xl text-yellow-300 font-semibold">Hover me!</h3>
            <p className="text-yellow-100 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}