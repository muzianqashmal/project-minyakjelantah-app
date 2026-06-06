import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="p-8">
            {frameworkData.map((item) => (
		            <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
		                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
		                <p className="text-gray-600">{item.description}</p>
                        <p className="text-pink-400">Developed by : {item.details.developer} ({item.details.releaseYear})</p>
                        <a href={item.details.officialWebsite} className="text-cyan-500" target="_blank">View Website</a>
                        <br />
                        {item.tags.map((taq,index)=>(
                            <span key={index} className="bg-blue-300 text-yellow-300 px-2 py-1 text-xs rounded-full mr-2">
                                {taq}
                            </span>
                        ))}
		            </div>
            ))}
        </div>
    )
}