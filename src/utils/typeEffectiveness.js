// Matriz de efectividad de tipos (basada en la mecánica oficial de Pokémon)
// Los valores representan multiplicadores de daño:
// 2 = muy efectivo, 1 = normal, 0.5 = no muy efectivo, 0 = sin efecto

const typeEffectiveness = {
  'normal': {
    'fighting': 2,
    'ghost': 0
  },
  'fire': {
    'fire': 0.5,
    'water': 2,
    'grass': 0.5,
    'ice': 0.5,
    'ground': 2,
    'bug': 0.5,
    'rock': 2,
    'dragon': 0.5,
    'steel': 0.5
  },
  'water': {
    'fire': 0.5,
    'water': 0.5,
    'grass': 2,
    'electric': 2,
    'ice': 0.5,
    'steel': 0.5
  },
  'grass': {
    'fire': 2,
    'water': 0.5,
    'grass': 0.5,
    'electric': 0.5,
    'ice': 2,
    'poison': 2,
    'ground': 0.5,
    'flying': 2,
    'bug': 2,
    'rock': 0.5,
    'dragon': 0.5,
    'steel': 0.5
  },
  'electric': {
    'water': 0.5,
    'electric': 0.5,
    'grass': 0.5,
    'ground': 2,
    'flying': 0.5,
    'dragon': 0.5
  },
  'ice': {
    'fire': 2,
    'water': 0.5,
    'grass': 0.5,
    'ice': 0.5,
    'fighting': 2,
    'rock': 2,
    'steel': 2
  },
  'fighting': {
    'normal': 0.5,
    'ice': 0.5,
    'poison': 0.5,
    'flying': 2,
    'psychic': 2,
    'bug': 0.5,
    'rock': 0.5,
    'ghost': 0,
    'dark': 0.5,
    'steel': 0.5,
    'fairy': 2
  },
  'poison': {
    'grass': 0.5,
    'poison': 0.5,
    'ground': 2,
    'rock': 0.5,
    'ghost': 0.5,
    'steel': 0,
    'fairy': 0.5
  },
  'ground': {
    'fire': 0.5,
    'electric': 0,
    'grass': 2,
    'poison': 0.5,
    'flying': 0,
    'bug': 0.5,
    'rock': 0.5,
    'steel': 0.5
  },
  'flying': {
    'electric': 2,
    'grass': 0.5,
    'ice': 2,
    'fighting': 0.5,
    'bug': 0.5,
    'rock': 2
  },
  'psychic': {
    'fighting': 0.5,
    'poison': 0.5,
    'psychic': 0.5,
    'dark': 2,
    'steel': 0.5
  },
  'bug': {
    'fire': 2,
    'grass': 0.5,
    'fighting': 0.5,
    'poison': 0.5,
    'flying': 2,
    'psychic': 0.5,
    'ghost': 0.5,
    'dark': 0.5,
    'steel': 0.5,
    'fairy': 0.5
  },
  'rock': {
    'fire': 0.5,
    'ice': 0.5,
    'fighting': 2,
    'ground': 2,
    'flying': 0.5,
    'bug': 0.5,
    'steel': 2
  },
  'ghost': {
    'normal': 0,
    'psychic': 0,
    'ghost': 2,
    'dark': 2
  },
  'dragon': {
    'dragon': 2,
    'steel': 0.5,
    'fairy': 0
  },
  'dark': {
    'fighting': 2,
    'psychic': 0,
    'ghost': 0.5,
    'dark': 0.5,
    'fairy': 2
  },
  'steel': {
    'fire': 2,
    'water': 0.5,
    'electric': 0.5,
    'ice': 0.5,
    'fighting': 2,
    'poison': 0,
    'ground': 2,
    'flying': 0.5,
    'psychic': 0.5,
    'bug': 0.5,
    'rock': 0.5,
    'dragon': 0.5,
    'steel': 0.5,
    'fairy': 0.5
  },
  'fairy': {
    'fire': 0.5,
    'fighting': 0.5,
    'poison': 2,
    'dragon': 0,
    'dark': 0.5,
    'steel': 2
  }
};

// Función para calcular las debilidades y resistencias de un Pokémon
export const calculateTypeEffectiveness = (pokemonTypes) => {
  if (!pokemonTypes || pokemonTypes.length === 0) {
    return { 
      superEffective: {}, 
      notVeryEffective: {}, 
      noEffect: [],
      effectiveness: {}
    };
  }

  const effectiveness = {};
  
  // Inicializar todos los tipos con multiplicador 1
  const allTypes = Object.keys(typeEffectiveness);
  allTypes.forEach(type => {
    effectiveness[type] = 1;
  });

  // Calcular efectividad para cada tipo del Pokémon
  pokemonTypes.forEach(pokemonType => {
    const typeName = pokemonType.type.name;
    const typeData = typeEffectiveness[typeName];
    
    if (typeData) {
      Object.entries(typeData).forEach(([attackingType, multiplier]) => {
        effectiveness[attackingType] *= multiplier;
      });
    }
  });

  // Agrupar por multiplicadores
  const superEffective = {};
  const notVeryEffective = {};
  const noEffect = [];

  Object.entries(effectiveness).forEach(([type, multiplier]) => {
    if (multiplier === 0) {
      noEffect.push(type);
    } else if (multiplier > 1) {
      const multiplierKey = multiplier === 4 ? 'x4' : multiplier === 2 ? 'x2' : `x${multiplier}`;
      if (!superEffective[multiplierKey]) {
        superEffective[multiplierKey] = [];
      }
      superEffective[multiplierKey].push(type);
    } else if (multiplier < 1) {
      const multiplierKey = multiplier === 0.25 ? 'x0.25' : multiplier === 0.5 ? 'x0.5' : `x${multiplier}`;
      if (!notVeryEffective[multiplierKey]) {
        notVeryEffective[multiplierKey] = [];
      }
      notVeryEffective[multiplierKey].push(type);
    }
  });

  return { 
    superEffective, 
    notVeryEffective, 
    noEffect,
    effectiveness 
  };
};

// Función para obtener el nombre del tipo en español
export const getTypeNameInSpanish = (typeName) => {
  const typeNames = {
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
  
  return typeNames[typeName] || typeName;
};
