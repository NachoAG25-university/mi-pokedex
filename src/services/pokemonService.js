// URL base de la API de Pokémon
const BASE_URL = 'https://pokeapi.co/api/v2/';

// Definimos cuántos Pokémon cargar. 1302 es el total de Gen 9.
const POKE_LIMIT = 1302;

// Función para buscar un Pokémon específico por su nombre (para la tarjeta)
export const getPokemonByName = async (name) => {
  
  if (!name) {
    throw new Error('El nombre del Pokémon es requerido.');
  }

  const lowerName = name.toLowerCase();
  const fullUrl = `${BASE_URL}pokemon/${lowerName}`;
  
  try {
    const response = await fetch(fullUrl);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`No se encontró ningún Pokémon llamado "${name}"`);
      }
      throw new Error('Hubo un problema al conectar con la API');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error en el servicio de Pokémon:', error);
    throw error;
  }
};


// VERSIÓN MEJORADA: Obtiene la lista y la procesa para incluir imágenes
export const getPokemonList = async () => {
  console.log('Buscando la lista completa de Pokémon...');
  const fullUrl = `${BASE_URL}pokemon?limit=${POKE_LIMIT}`;
  
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error('No se pudo cargar la lista de Pokémon');
    }
    const data = await response.json();
    
    // --- EL TRUCO ESTÁ AQUÍ ---
    // Mapeamos sobre los resultados para crear un nuevo array de objetos
    const pokemonWithImages = data.results.map(pokemon => {
      // Extraemos el ID de la URL. ej: ".../pokemon/25/" -> "25"
      const id = pokemon.url.split('/').filter(Boolean).pop();
      // Construimos la URL de la imagen
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      
      // Devolvemos un objeto con los datos que necesitamos
      return {
        name: pokemon.name,
        id: id,
        imageUrl: imageUrl,
      };
    });

    return pokemonWithImages;

  } catch (error) {
    console.error('Error en el servicio de lista:', error);
    throw error;
  }
};

