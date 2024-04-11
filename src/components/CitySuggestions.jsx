import React from "react";

function CitySuggestions({ suggestions, handleSuggestionClick }) {
  return (
    <ul className="suggestionList">
      {suggestions.map((city) => (
        <li key={city.id} onClick={() => handleSuggestionClick(city.name)}>
          {city.name}
        </li>
      ))}
    </ul>
  );
}

export default CitySuggestions;
