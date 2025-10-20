import React from 'react';
import { calculateTypeEffectiveness, getTypeNameInSpanish } from '../utils/typeEffectiveness';
import { useApp } from '../context/AppContext';

function PokemonCard({ data, loading, error }) {
  const { isFavorite, addFavorite, removeFavorite, addToHistory } = useApp();

  // Agregar a historial cuando se carga un Pokémon
  React.useEffect(() => {
    if (data) {
      addToHistory(data);
    }
  }, [data, addToHistory]);

  if (loading) {
    return (
      <div className="pokemon-card-custom">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pokemon-blue mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-card-custom">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="pokemon-card-custom">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">¡Comienza tu búsqueda!</h3>
          <p className="text-gray-500">Escribe el nombre de un Pokémon para ver su información</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-card-custom fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* COLUMNA IZQUIERDA - Información básica del Pokémon */}
        <div className="space-y-6">
          {/* Header con nombre y ID */}
          <div className="text-center relative">
            <button
              onClick={() => isFavorite(data.id) ? removeFavorite(data.id) : addFavorite(data)}
              className={`absolute -top-2 -right-2 p-2 rounded-full transition-all duration-200 ${
                isFavorite(data.id)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-500'
              }`}
              title={isFavorite(data.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {isFavorite(data.id) ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white capitalize mb-2">
              {data.name}
            </h2>
            <span className="inline-block bg-pokemon-blue text-white px-3 py-1 rounded-full text-sm font-medium">
              #{data.id}
            </span>
          </div>
          
          {/* Imagen del Pokémon */}
          <div className="flex justify-center">
      <img 
        src={data.sprites?.front_default} 
        alt={`Imagen de ${data.name}`} 
              className="w-48 h-48 bg-gray-100 rounded-full border-4 border-white shadow-md object-contain"
            />
          </div>
          
          {/* Información básica del Pokémon */}
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-gray-600 dark:text-gray-300">Altura:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{(data.height / 10).toFixed(1)} m</span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-gray-600 dark:text-gray-300">Peso:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{(data.weight / 10).toFixed(1)} kg</span>
            </div>
            
            {/* Tipos del Pokémon */}
            {data.types && data.types.length > 0 && (
              <div className="pt-3">
                <span className="font-medium text-gray-600 dark:text-gray-300 block mb-3 text-center">Tipos:</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {data.types.map((type, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-pokemon-yellow text-white rounded-full text-sm font-medium capitalize"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades del Pokémon */}
            {data.abilities && data.abilities.length > 0 && (
              <div className="pt-3">
                <span className="font-medium text-gray-600 dark:text-gray-300 block mb-3 text-center">Habilidades:</span>
                <div className="space-y-2">
                  {data.abilities.map((ability, index) => (
                    <div 
                      key={index}
                      className={`px-3 py-2 rounded-lg text-sm text-center ${
                        ability.is_hidden 
                          ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      <span className="font-medium capitalize">
                        {ability.ability.name.replace('-', ' ')}
                      </span>
                      {ability.is_hidden && (
                        <span className="block text-xs text-purple-600 mt-1">
                          ✨ Habilidad Oculta
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA - Estadísticas y efectividades */}
        <div className="space-y-6">
          {/* Estadísticas del Pokémon */}
          {data.stats && data.stats.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">Estadísticas Base</h3>
              <div className="space-y-3">
                {data.stats.map((stat, index) => {
                  const statName = stat.stat.name;
                  const statValue = stat.base_stat;
                  const maxStat = 255; // Valor máximo típico para las estadísticas
                  const percentage = (statValue / maxStat) * 100;
                  
                  // Mapeo de nombres de estadísticas en español
                  const statNames = {
                    'hp': 'PS',
                    'attack': 'Ataque',
                    'defense': 'Defensa',
                    'special-attack': 'At. Esp.',
                    'special-defense': 'Def. Esp.',
                    'speed': 'Velocidad'
                  };
                  
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                      {statNames[statName] || statName}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white text-sm">
                      {statValue}
                    </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            statName === 'hp' ? 'bg-green-500' :
                            statName === 'attack' ? 'bg-red-500' :
                            statName === 'defense' ? 'bg-blue-500' :
                            statName === 'special-attack' ? 'bg-purple-500' :
                            statName === 'special-defense' ? 'bg-indigo-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Efectividad de Tipos con Multiplicadores */}
          {data.types && data.types.length > 0 && (() => {
            const { superEffective, notVeryEffective, noEffect } = calculateTypeEffectiveness(data.types);
            
            return (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">Efectividad de Tipos</h3>
                <div className="space-y-4">
                  
                  {/* Muy Efectivo (x4, x2) */}
                  {Object.keys(superEffective).length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-red-800 dark:text-red-400 flex items-center">
                        💥 Muy Efectivo
                      </h4>
                      {Object.entries(superEffective).map(([multiplier, types]) => (
                        <div key={multiplier} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium effectiveness-multiplier ${
                              multiplier === 'x4' ? 'multiplier-x4' : 'multiplier-x2'
                            }`}>
                              {multiplier} de daño
                            </span>
                            <span className="bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full">
                              {types.length}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {types.map((type, index) => (
                              <span key={index} className="px-2 py-1 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded text-xs">
                                {getTypeNameInSpanish(type)}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No Muy Efectivo (x0.5, x0.25) */}
                  {Object.keys(notVeryEffective).length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-green-800 dark:text-green-400 flex items-center">
                        🛡️ Resistente
                      </h4>
                      {Object.entries(notVeryEffective).map(([multiplier, types]) => (
                        <div key={multiplier} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium effectiveness-multiplier ${
                              multiplier === 'x0.25' ? 'multiplier-x025' : 'multiplier-x05'
                            }`}>
                              {multiplier} de daño
                            </span>
                            <span className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                              {types.length}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {types.map((type, index) => (
                              <span key={index} className="px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded text-xs">
                                {getTypeNameInSpanish(type)}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sin Efecto (x0) */}
                  {noEffect.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-300 flex items-center">
                        ⚡ Sin Efecto
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium effectiveness-multiplier multiplier-x0">
                            x0 de daño
                          </span>
                          <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
                            {noEffect.length}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {noEffect.map((type, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">
                              {getTypeNameInSpanish(type)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mensaje si no hay debilidades ni resistencias */}
                  {Object.keys(superEffective).length === 0 && Object.keys(notVeryEffective).length === 0 && noEffect.length === 0 && (
                    <div className="text-center py-4">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Este Pokémon no tiene debilidades ni resistencias especiales
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                  * Basado en la mecánica oficial de tipos de Pokémon
                </p>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
export default PokemonCard;