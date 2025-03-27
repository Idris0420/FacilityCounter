import { useState } from "react";
import './App.css';  

function App() {
  const [comments, setComments] = useState("");
  const [facilityCounts, setFacilityCounts] = useState({});
  const [unmatchedComments, setUnmatchedComments] = useState([]);
  const [multipleFacilityComments, setMultipleFacilityComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [scaleAnimation, setScaleAnimation] = useState(false);
  const [separator, setSeparator] = useState("==");

  const hospitals = [
    { keyword: ["west hosp"], name: "IUH West Hosp" },
    { keyword: ["methodist hosp"], name: "IUH Methodist Hosp" },
    { keyword: ["univ hosp"], name: "IUH Univ Hosp" },
    { keyword: ["arnett hosp"], name: "IUH Arnett Hosp" },
    { keyword: ["north hosp"], name: "IUH North Hosp" },
    { keyword: ["frankfort hosp", "iuh frankfort"], name: "IUH Frankfort Hosp" },
    { keyword: ["wcr rad westside"], name: "WCR Rad Westside" },
    { keyword: ["white memorial hosp"], name: "IUH White Memorial Hosp" },
    { keyword: ["riley hosp"], name: "Riley Hosp at IUH" },
    { keyword: ["mh external sites", "iuh mh ext"], name: "IUH MH External Sites" },
    { keyword: ["saxony hosp", "iuh saxony"], name: "IUH Saxony Hosp" },
    { keyword: ["bloomington hosp", "iuh bloomington"], name: "IUH Bloomington Hosp" },
    { keyword: ["bedford hosp", "iuh bedford"], name: "IUH Bedford Hosp" },
    { keyword: ["ball mem", "iuh ball"], name: "IUH Ball Memorial Hosp" },
    { keyword: ["avon hosp","iuh avon"], name: "IUH Avon Hosp" },
    { keyword: ["tipton hosp", "iuh tipton"], name: "IUH Tipton Hosp" },
    { keyword: ["morgan hosp", "iuh morgan"], name: "IUH Morgan Hosp" },
    { keyword: ["paoli hosp", "iuh paoli"], name: "IUH Paoli Hosp" },
    { keyword: ["iuh blm", "blm rahc"], name: "IUH BLM RAHC" },
    { keyword: ["imr cardio", "cardio east"], name: "IMR Cardio East"},
    { keyword: ["multi-d south", "imr multi"], name: "IMR Multi-D South"},
    { keyword: ["BLK Radiology", "Radiology Blackford"], name: "BLK Radiology Blackford"},
  ];

  const countFacilities = () => {
    const commentEntries = comments.split(new RegExp(`${separator}{2,}`))
      .map(c => c.trim())
      .filter(c => c);

    setCommentCount(commentEntries.length);
    const counts = {};
    const unmatched = [];
    const multipleMatched = [];

    hospitals.forEach(({ name }) => counts[name] = 0);

    commentEntries.forEach(comment => {
      let matchedFacilities = [];
      const lowerComment = comment.toLowerCase();

      hospitals.forEach(({ keyword, name }) => {
        if (keyword.some(kw => lowerComment.includes(kw))) {
          counts[name] += 1;
          matchedFacilities.push(name);
        }
      });

      if (matchedFacilities.length === 0) {
        unmatched.push(comment);
      } else if (matchedFacilities.length > 1) {
        multipleMatched.push(comment);
      }
    });

    setFacilityCounts(counts);
    setUnmatchedComments(unmatched);
    setMultipleFacilityComments(multipleMatched);

    setScaleAnimation(true);
    setTimeout(() => setScaleAnimation(false), 500);
  };

  const changeSeparator = (e) => {
    setSeparator(e.target.value);
  };

  const copyTableToClipboard = () => {
    const table = document.getElementById("results-table");

    if (!table) {
      alert("No table found to copy!");
      return;
    }

    // Convert table to HTML string
    const tableHtml = table.outerHTML;

    // Wrap it in a proper clipboard format for HTML
    const blob = new Blob([tableHtml], { type: "text/html" });
    const clipboardItem = new ClipboardItem({ "text/html": blob });

    navigator.clipboard.write([clipboardItem])
      .then(() => alert("Table copied to clipboard! Paste it in MS Teams."))
      .catch(err => console.error("Failed to copy table: ", err));
  };

  return (
    <div className="min-w-screen min-h-screen p-6 pt-0 flex justify-center items-start">
      <div className="fixed bg-[#279AF1] w-screen flex items-center justify-center h-[70px] z-[999]">
        <h1 className="text-4xl font-bold text-center">Facility Counter</h1>
      </div>
      <div className="flex w-full max-w-6xl mt-[110px]">
        <div className="w-1/2 mr-4">
          <div className="h-[61vh]">
            <h1 className="font-bold text-xl mb-[10px]">Input all your comments here</h1>
            <textarea
              className="px-[20px] pt-[10px] bg-[#D9D9D9] w-full h-[40vh] rounded-[20px]"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
            <div className="w-full flex justify-around mt-4">
              <button
                className="box bg-[#EA526F] h-[50px] px-[20px] rounded hover:scale-110 hover:bg-[#E385FD] transition-all duration-300"
                onClick={countFacilities}
              >
                Count Facility
              </button>
              <div className="flex flex-row items-center gap-3">
                <h1 className="text-xl">Separator:</h1>
                <select name="" id="" onChange={e => changeSeparator(e)} className="h-[40px] w-[90px] rounded border border-black box">
                  <option value="==">==</option>
                  <option value="--">--</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className={`bg-blue-500 w-[90%] p-4 rounded-lg shadow-lg ${scaleAnimation ? 'animate-scale' : ''}`}>
            <h1 className="font-bold text-2xl mb-4">Results: {commentCount} </h1>
            <table id="results-table" className="w-full border-collapse border border-gray-300 text-white">
              <thead>
                <tr className="bg-blue-700">
                  <th className="border border-gray-400 p-2">Facility</th>
                  <th className="border border-gray-400 p-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map(({ name }) => (
                  <tr key={name} className="bg-blue-600">
                    <td className="border border-gray-400 p-2">{name}</td>
                    <td className="border border-gray-400 p-2 text-center">{facilityCounts[name] || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={copyTableToClipboard}
              className="bg-[#4CAF50] px-4 py-2 text-white rounded hover:bg-[#45a049] transition-all duration-300"
            >
              Copy Results
            </button>
          </div>

          {/* Display comments with multiple facilities */}
          {multipleFacilityComments.length > 0 && (
            <div className="w-[90%] mt-6 p-4 bg-yellow-200 rounded-lg shadow-lg">
              <h2 className="font-bold text-xl mb-2">Multiple Facilities:</h2>
              <ul className="list-disc pl-6 text-gray-800">
                {multipleFacilityComments.map((comment, index) => (
                  <li key={index} className="mb-2">{comment}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Display unmatched comments */}
          {unmatchedComments.length > 0 && (
            <div className="w-[90%] mt-6 p-4 bg-gray-200 rounded-lg shadow-lg">
              <h2 className="font-bold text-xl mb-2">Unmatched Comments:</h2>
              <ul className="list-disc pl-6 text-gray-800">
                {unmatchedComments.map((comment, index) => (
                  <li key={index} className="mb-2">{comment}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
