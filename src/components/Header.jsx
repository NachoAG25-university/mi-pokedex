import React from 'react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { theme, toggleTheme, typeFilter, setTypeFilter, searchHistory, clearHistory } = useApp();

  const pokemonTypes = [
    'all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon',
    'dark', 'steel', 'fairy'
  ];

  const getTypeNameInSpanish = (type) => {
    const typeNames = {
      'all': 'Todos',
      'normal': 'Normal',
      'fire': 'Fuego',
      'water': 'Agua',
      'grass': 'Planta',
      'electric': 'Eléctrico',
      'ice': 'Hielo',
      'fighting': 'Lucha',
      'poison': 'Veneno',
      'ground': 'Tierra',
      'flying': 'Volador',
      'psychic': 'Psíquico',
      'bug': 'Bicho',
      'rock': 'Roca',
      'ghost': 'Fantasma',
      'dragon': 'Dragón',
      'dark': 'Siniestro',
      'steel': 'Acero',
      'fairy': 'Hada'
    };
    return typeNames[type] || type;
  };

  return (
    <div className="w-full">
      {/* Header principal */}
      <div className="text-center mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1"></div>
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-2 flex-1">
            <span className="text-pokemon-blue">Poké</span>
            <span className="text-pokemon-red">dex</span>
          </h1>
          <div className="flex-1 flex justify-end">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Descubre información sobre tus Pokémon favoritos</p>
      </div>

      {/* Filtros por tipo */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {pokemonTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                typeFilter === type
                  ? 'bg-pokemon-blue text-white shadow-lg transform scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {getTypeNameInSpanish(type)}
            </button>
          ))}
        </div>
      </div>

      {/* Historial de búsquedas */}
      {searchHistory.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Búsquedas recientes</h3>
            <button
              onClick={clearHistory}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              Limpiar historial
            </button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {searchHistory.slice(0, 5).map((pokemon) => (
              <span
                key={pokemon.id}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm capitalize hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
              >
                {pokemon.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

