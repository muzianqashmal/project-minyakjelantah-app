import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
    const [searchTerm, setSearchTerm] = useState("");
	const [selectedTag, setSelectedTag] = useState("");

    const _searchTerm = searchTerm.toLowerCase();
    const _selectedTag = selectedTag.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name
				.toLowerCase()
				.includes(_searchTerm) ||
      framework.description
				.toLowerCase()
				.includes(_searchTerm);

    const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

    return (
        <div className="p-8 text-rose-200">
            <input
                type="text"
                name="searchTerm"
                placeholder="Search framework..."
                className="w-full p-2 border border-sky-400 text-yellow-400 outline-cyan-400 rounded mb-4"

                onChange={(e)=> setSearchTerm(e.target.value)}
            />

            <select
                name="selectedTag"
                className="w-full p-2 border border-green-400 text-violet-600 outline-green-400 rounded mb-4"
                onChange={(e)=> setSelectedTag(e.target.value)}
            >
                
                <option value="">All Tags</option>
            </select>

            {filteredFrameworks.map((item) => (
		            <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
		                <h2 className="text-lg font-bold text-rose-300">{item.name}</h2>
		                <p className="text-violet-500">{item.description}</p>
                        <p className="text-teal-400">Developed by : {item.details.developer} ({item.details.releaseYear})</p>
                        <a href={item.details.officialWebsite} className="text-cyan-500" target="_blank">View Website</a>
                        <br />
                        {item.tags.map((taq,index)=>(
                            <span key={index} className="bg-rose-200 text-white px-2 py-1 text-xs rounded-full mr-2">
                                {taq}
                            </span>
                        ))}
		            </div>
            ))}
        </div>
    )
}