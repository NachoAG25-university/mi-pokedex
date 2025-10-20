import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial
const initialState = {
  theme: 'light',
  favorites: [],
  searchHistory: [],
  typeFilter: 'all',
  isLoading: false
};

// Tipos de acciones
const ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
  SET_TYPE_FILTER: 'SET_TYPE_FILTER',
  SET_LOADING: 'SET_LOADING'
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    
    case ACTIONS.ADD_FAVORITE:
      const newFavorites = [...state.favorites, action.payload];
      return {
        ...state,
        favorites: newFavorites
      };
    
    case ACTIONS.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(pokemon => pokemon.id !== action.payload)
      };
    
    case ACTIONS.ADD_TO_HISTORY:
      const newHistory = [action.payload, ...state.searchHistory.filter(item => item.id !== action.payload.id)].slice(0, 10);
      return {
        ...state,
        searchHistory: newHistory
      };
    
    case ACTIONS.CLEAR_HISTORY:
      return {
        ...state,
        searchHistory: []
      };
    
    case ACTIONS.SET_TYPE_FILTER:
      return {
        ...state,
        typeFilter: action.payload
      };
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    default:
      return state;
  }
}

// Crear el contexto
const AppContext = createContext();

// Hook personalizado para usar el contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

// Provider del contexto
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const savedTheme = localStorage.getItem('pokemon-theme');
    const savedFavorites = localStorage.getItem('pokemon-favorites');
    const savedHistory = localStorage.getItem('pokemon-history');

    if (savedTheme === 'dark') {
      dispatch({ type: ACTIONS.TOGGLE_THEME });
    }
    
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        favorites.forEach(pokemon => {
          dispatch({ type: ACTIONS.ADD_FAVORITE, payload: pokemon });
        });
      } catch (error) {
        console.error('Error cargando favoritos:', error);
      }
    }
    
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        history.forEach(pokemon => {
          dispatch({ type: ACTIONS.ADD_TO_HISTORY, payload: pokemon });
        });
      } catch (error) {
        console.error('Error cargando historial:', error);
      }
    }
  }, []);

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem('pokemon-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('pokemon-favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem('pokemon-history', JSON.stringify(state.searchHistory));
  }, [state.searchHistory]);

  // Funciones helper
  const toggleTheme = () => {
    dispatch({ type: ACTIONS.TOGGLE_THEME });
    // Aplicar tema al HTML
    document.documentElement.classList.toggle('dark');
  };

  const addFavorite = (pokemon) => {
    dispatch({ type: ACTIONS.ADD_FAVORITE, payload: pokemon });
  };

  const removeFavorite = (pokemonId) => {
    dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: pokemonId });
  };

  const addToHistory = (pokemon) => {
    dispatch({ type: ACTIONS.ADD_TO_HISTORY, payload: pokemon });
  };

  const clearHistory = () => {
    dispatch({ type: ACTIONS.CLEAR_HISTORY });
  };

  const setTypeFilter = (type) => {
    dispatch({ type: ACTIONS.SET_TYPE_FILTER, payload: type });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  };

  const isFavorite = (pokemonId) => {
    return state.favorites.some(pokemon => pokemon.id === pokemonId);
  };

  const value = {
    ...state,
    toggleTheme,
    addFavorite,
    removeFavorite,
    addToHistory,
    clearHistory,
    setTypeFilter,
    setLoading,
    isFavorite
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
