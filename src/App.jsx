// src/App.jsx
// This will replace planner.html logic using React state

import { useState } from "react";

export default function App() {
  const [temp, setTemp] = useState(null);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  //This will replace the run() function in planner.html
  async function fetchWeather() {
    setLoading(true);
    const res = await fetch(
      "https://api.open-metro.com/v1/forecast?latitude=38.99&longitude=-76.93&hourly=temperature_2m"
    );
    const data = await res.json();
    const tempF = Math.round(data.hourly.temperature_2m[0] * 9/5 + 32);
    setTemp(tempF);

    //Simple outfit logic
    if (tempF < 40) setAdvice("Heavy coat and boats");
    else if (tempF < 60) setAdvice("Light jacket");
    else setAdvice("T-shirt or light layers");
    setLoading(false);
  }

  return (
    <div className = "app-container fade-in">
      <h1>Climate Closet</h1>

      <button className = "btn pulse" onClick = {fetchWeather}>
        Get Outfit Recommendation
      </button>

      {loading && <p className = "loading">Loading weather...</p>

        {temp && (
          <div className = "card slide-up">
            <h2>{temp}°F</h2>
            <p>{advice}</p>
          </div>
        )}
    </div>
    );
}
