import React from 'react';

function SuggestionList({ suggestions, onSuggestionClick }) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto slide-up">
      {suggestions.map((pokemon) => (
        <li 
          key={pokemon.id}
          className="suggestion-item-custom dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          onClick={() => onSuggestionClick(pokemon.name)} 
        >
          <img 
            src={pokemon.imageUrl} 
            alt={pokemon.name}
            className="w-8 h-8 object-contain"
          />
          <span className="font-medium">{pokemon.name}</span>
          <span className="text-gray-400 dark:text-gray-500 text-sm ml-auto">#{pokemon.id}</span>
        </li>
      ))}
    </ul>
  );
}

export default SuggestionList;

