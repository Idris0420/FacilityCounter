import { useState } from "react";
import './App.css';  // Add custom CSS for animation

function App() {
  const [comments, setComments] = useState("");
  const [facilityCounts, setFacilityCounts] = useState({});
  const [unmatchedComments, setUnmatchedComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [scaleAnimation, setScaleAnimation] = useState(false); // To trigger scale animation

  const hospitals = ["Riley Hosp at IUH", "Methodist Hosp", "Saxony Hosp"];

  const countFacilities = () => {
    setIsLoading(true); // Set loading to true when button is clicked

    // Split the comments by two or more equal signs (== or more)
    const commentEntries = comments.split(/={2,}/).map(c => c.trim()).filter(c => c);
    setCommentCount(commentEntries.length); // Update the comment count
    const counts = {};
    const unmatched = [];

    // Initialize counts to zero
    hospitals.forEach(hospital => counts[hospital] = 0);

    // Process each comment
    commentEntries.forEach(comment => {
      let matched = false;
      hospitals.forEach(hospital => {
        if (comment.includes(hospital)) {
          counts[hospital] += 1;
          matched = true;
        }
      });

      if (!matched) unmatched.push(comment);
    });

    setFacilityCounts(counts);
    setUnmatchedComments(unmatched);
    setIsLoading(false); // Set loading to false once processing is done

    // Trigger the scale animation
    setScaleAnimation(true);

    // Reset the scale animation after a short delay
    setTimeout(() => {
      setScaleAnimation(false);
    }, 500); // Match the animation duration
  };

  return (
    <div className="min-w-screen min-h-screen p-6 flex justify-center items-start">
      {/* Parent Flex Container with Centered Content */}
      <div className="flex w-full max-w-6xl">
        {/* Input Section (Left side) */}
        <div className="w-1/2 mr-4">
          <div className="h-[61vh]">
            <h1 className="font-bold text-xl mb-[10px]">Input all your comments here</h1>
            <textarea
              className="px-[20px] pt-[10px] bg-[#D9D9D9] w-full h-[40vh] rounded-[20px]"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
            <div className="w-full flex justify-center mt-4">
              <button
                className="bg-[#EA526F] h-[50px] px-[20px] rounded hover:scale-110 hover:bg-[#E385FD] transition-all duration-300"
                onClick={countFacilities}
              >
                Count Facility
              </button>
            </div>
          </div>
        </div>

        {/* Facility Results Section (Right side) */}
        <div className="w-1/2">
          {/* Loading Spinner */}
          {isLoading && (
            <div className="flex justify-center items-center mt-6">
              <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}

          {/* Results Table */}
          {!isLoading && (
            <div className="flex flex-col items-center justify-center mt-6 p-4">
              <div className={`bg-blue-500 w-[90%] p-4 rounded-lg shadow-lg ${scaleAnimation ? 'animate-scale' : ''}`}>
                <h1 className="font-bold text-2xl mb-4">Results: {commentCount} </h1>
                <table className="w-full border-collapse border border-gray-300 text-white">
                  <thead>
                    <tr className="bg-blue-700">
                      <th className="border border-gray-400 p-2">Facility</th>
                      <th className="border border-gray-400 p-2">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map(hospital => (
                      <tr key={hospital} className="bg-blue-600">
                        <td className="border border-gray-400 p-2">{hospital}</td>
                        <td className="border border-gray-400 p-2 text-center">{facilityCounts[hospital] || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!isLoading && unmatchedComments.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
