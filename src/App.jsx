import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Importamos la NUEVA función y el NUEVO componente
import { getPokemonByName, getPokemonList } from './services/pokemonService';
import PokemonSearch from './components/PokemonSearch';
import PokemonCard from './components/PokemonCard';
import SuggestionList from './components/SuggestionList';
import Header from './components/Header';

function AppContent() {
  const { typeFilter } = useApp();
  
  // --- ESTADOS PARA LA TARJETA ---
  const [cardData, setCardData] = useState(null);
  const [cardLoading, setCardLoading] = useState(false);
  const [cardError, setCardError] = useState(null);

  // --- NUEVOS ESTADOS PARA LA LISTA Y BÚSQUEDA ---
  const [masterList, setMasterList] = useState([]); // Lista con los 1300+ pokémon
  const [listLoading, setListLoading] = useState(true); // Estado de carga para esa lista
  const [searchTerm, setSearchTerm] = useState(''); // El texto del input
  const [filteredList, setFilteredList] = useState([]); // La lista de sugerencias

  // --- EFECTO 1: Cargar la lista maestra UNA SOLA VEZ ---
  useEffect(() => {
    // Función async autoejecutable
    (async () => {
      try {
        setListLoading(true);
        const list = await getPokemonList();
        setMasterList(list);
      } catch (err) {
        setCardError('No se pudo cargar la lista de Pokémon. Intenta recargar.');
      } finally {
        setListLoading(false);
      }
    })();
  }, []); // El array vacío [] asegura que solo se ejecute al montar

  // --- EFECTO 2: Filtrar la lista cada vez que el usuario escribe ---
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredList([]); // Si no hay texto, no hay sugerencias
      return;
    }

    // Filtramos la lista maestra y tomamos solo los 10 primeros
    const filtered = masterList
      .filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 10); // Mostramos solo 10 sugerencias
    
    setFilteredList(filtered);
  }, [searchTerm, masterList]); // Se ejecuta si cambia searchTerm o masterList

  // --- EFECTO 3: Filtrar por tipo ---
  useEffect(() => {
    if (typeFilter === 'all') {
      setFilteredList([]);
      return;
    }

    // Filtrar por tipo (esto requeriría datos adicionales de la API)
    // Por ahora, solo mostramos mensaje informativo
    setFilteredList([]);
  }, [typeFilter]);

  // --- FUNCIÓN: Buscar el Pokémon (para la tarjeta) ---
  const fetchPokemonCard = async (pokemonName) => {
    setCardLoading(true);
    setCardError(null);
    setCardData(null);
    
    try {
      const pokemonData = await getPokemonByName(pokemonName);
      setCardData(pokemonData);
    } catch (err) {
      setCardError(err.message);
    } finally {
      setCardLoading(false);
    }
  };

  // --- MANEJADOR: Cuando el usuario envía el formulario (Enter) ---
  const handleFormSubmit = () => {
    if (searchTerm === '') return;
    fetchPokemonCard(searchTerm);
    setFilteredList([]); // Ocultamos las sugerencias
  };

  // --- MANEJADOR: Cuando el usuario hace CLIC en una sugerencia ---
  const handleSuggestionClick = (pokemonName) => {
    setSearchTerm(pokemonName); // Pone el nombre completo en el input
    setFilteredList([]); // Oculta la lista de sugerencias
    fetchPokemonCard(pokemonName); // Busca el pokémon
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header con tema y filtros */}
        <Header />
        
        {/* Search Section */}
        <div className="flex justify-center mb-8">
          <PokemonSearch 
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onSubmit={handleFormSubmit}
          />
        </div>
        
        {/* Loading State */}
        {listLoading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Cargando todos los Pokémon...
            </div>
          </div>
        )}

        {/* Content Wrapper */}
        <div className="relative flex justify-center">
          <SuggestionList 
            suggestions={filteredList}
            onSuggestionClick={handleSuggestionClick}
          />
          
          <PokemonCard 
            data={cardData} 
            loading={cardLoading} 
            error={cardError} 
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;