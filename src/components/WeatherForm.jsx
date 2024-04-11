// import React from "react";
// function WeatherForm({ cityInput, handleCityInputChange, handleSubmit }) {
//   return (
//     <>
//       <form onSubmit={handleSubmit} className="weatherForm">
//         <input
//           type="text"
//           value={cityInput}
//           onChange={handleCityInputChange}
//           className="cityInput"
//           placeholder="Enter city name"
//         />
//       </form>
//       <button type="submit">Search</button>
//     </>
//   );
// }

// export default WeatherForm;

// weatherform.jsx
import React from "react";

function WeatherForm({
  cityInput,
  handleCityInputChange,
  handleSubmit,
  children,
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className="weatherForm">
        <div className="Search">
          <input
            type="text"
            value={cityInput}
            onChange={handleCityInputChange}
            className="cityInput"
            placeholder="Enter city name"
          />
          {children} {/* Render children inside WeatherForm */}
        </div>
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default WeatherForm;
