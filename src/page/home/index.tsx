import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [number, setNumber] = useState<string>();
  const [error, setError] = useState<string>("");

  const buttonHandler = () => {
    if (number && +number < 1) {
      setError("Entered value should be greater then 1.");
    } else if (number && +number % 2 !== 0) {
      setError("Entered value should be even.");
    } else {
      navigate(`/play-screen/${number}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-extrabold text-transparent text-4xl sm:text-5xl xl:text-9xl bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-transparent h-full">
        Memory Game
      </p>
      <div className="flex flex-col gap-2 w-96 mt-48 px-6">
        <label className="mb-2 text-sm font-medium text-gray-900 w-48 flex items-center">
          Enter Grid Size
        </label>
        <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => {
            setError("");
            setNumber(e.target.value);
          }}
          value={number}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className={`bg-blue-400 rounded p-2 ${
            (error || !number) &&
            "pointer-events-none cursor-not-allowed bg-gray-300"
          }`}
          onClick={buttonHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
}
