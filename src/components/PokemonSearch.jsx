import React from 'react';

// Este componente ahora es controlado desde el padre
function PokemonSearch({ searchTerm, onSearchTermChange, onSubmit }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    // Llama a la función onSubmit que le pasó el padre
    onSubmit(); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <div className="relative">
        <input
          type="text"
          placeholder="Busca un Pokémon..."
          className="search-input-custom dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          autoComplete="off"
        />
      </div>
      <button type="submit" className="search-button-custom">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Buscar
      </button>
    </form>
  );
}

export default PokemonSearch;