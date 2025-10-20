# 🎮 Mi Pokédex

Una aplicación web moderna y completa para explorar el mundo de los Pokémon, construida con React y Tailwind CSS. Permite buscar, visualizar y gestionar información detallada de más de 1300 Pokémon.

## 🚀 Características Principales

- **🔍 Búsqueda Avanzada**: Autocompletado inteligente con más de 1300 Pokémon
- **📊 Información Detallada**: Estadísticas, tipos, habilidades y efectividad
- **⭐ Sistema de Favoritos**: Guarda tus Pokémon preferidos
- **📚 Historial de Búsquedas**: Acceso rápido a búsquedas recientes
- **🎨 Modo Oscuro/Claro**: Interfaz adaptable a tus preferencias
- **📱 Diseño Responsivo**: Optimizado para todos los dispositivos
- **⚡ Cálculo de Efectividad**: Sistema completo de tipos y debilidades

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19.1.1 con Vite 7.1.7
- **Estilos**: Tailwind CSS 3.4.18
- **Linting**: ESLint 9.36.0
- **API**: PokeAPI (https://pokeapi.co/api/v2/)
- **Gestión de Estado**: Context API con useReducer
- **Persistencia**: localStorage

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Header.jsx       # Cabecera con filtros y tema
│   ├── PokemonCard.jsx  # Tarjeta detallada del Pokémon
│   ├── PokemonSearch.jsx # Componente de búsqueda
│   └── SuggestionList.jsx # Lista de sugerencias
├── context/             # Gestión de estado global
│   └── AppContext.jsx  # Context API con useReducer
├── services/           # Servicios de API
│   └── pokemonService.js # Llamadas a PokeAPI
├── utils/              # Utilidades
│   └── typeEffectiveness.js # Cálculo de efectividad
├── App.jsx            # Componente principal
└── main.jsx           # Punto de entrada
```

## 🔌 Documentación Técnica de la API

### Autenticación

La **PokeAPI** es una API pública que **no requiere autenticación**. Todos los endpoints están abiertos y disponibles sin necesidad de claves de API o tokens de autenticación.

### Endpoints Utilizados

#### 1. Obtener Pokémon por Nombre/ID
- **Endpoint**: `GET https://pokeapi.co/api/v2/pokemon/{name_or_id}/`
- **Descripción**: Obtiene información completa de un Pokémon específico
- **Parámetros**:
  - `name_or_id`: Nombre (string) o ID (número) del Pokémon
- **Ejemplo**: `GET https://pokeapi.co/api/v2/pokemon/pikachu/`

#### 2. Lista de Pokémon
- **Endpoint**: `GET https://pokeapi.co/api/v2/pokemon/`
- **Descripción**: Obtiene lista paginada de todos los Pokémon
- **Parámetros**:
  - `limit`: Número de resultados (máximo 1302)
  - `offset`: Número de resultados a omitir
- **Ejemplo**: `GET https://pokeapi.co/api/v2/pokemon?limit=1302`

### Ejemplo de Request/Response

**Request:**
```http
GET https://pokeapi.co/api/v2/pokemon/pikachu/
```

**Response:**
```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
      }
    }
  ],
  "abilities": [
    {
      "ability": {
        "name": "static",
        "url": "https://pokeapi.co/api/v2/ability/9/"
      },
      "is_hidden": false
    }
  ],
  "stats": [
    {
      "base_stat": 35,
      "stat": {
        "name": "hp"
      }
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  }
}
```

### Manejo de Errores

El proyecto implementa un manejo robusto de errores:

```javascript
// Ejemplo de manejo de errores en pokemonService.js
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
```

### Estados de Carga y Datos Vacíos

**Estados de Carga:**
- Spinner animado durante las llamadas a la API
- Mensajes informativos para el usuario
- Estados de carga separados para diferentes operaciones

**Manejo de Datos Vacíos:**
- Validación de datos antes de renderizar
- Mensajes informativos cuando no hay datos
- Fallbacks para imágenes y contenido

### Consideraciones de CORS y Límites

**CORS:**
- ✅ La PokeAPI permite solicitudes desde cualquier origen
- ✅ Incluye `Access-Control-Allow-Origin: *`
- ✅ No hay restricciones de CORS

**Límites de Uso:**
- ⚠️ **Sin límites estrictos** pero se recomienda uso responsable
- ⚠️ **Rate limiting**: Evitar más de 100 requests/minuto
- ⚠️ **Caché**: Implementar caché para reducir llamadas repetitivas
- ⚠️ **Optimización**: Cargar solo datos necesarios

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/mi-pokedex.git
cd mi-pokedex
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

4. **Construir para producción:**
```bash
npm run build
```

5. **Previsualizar build:**
```bash
npm run preview
```

## 🎯 Funcionalidades Técnicas

### Gestión de Estado
- **Context API** con `useReducer` para estado global
- **Persistencia** en localStorage para favoritos e historial
- **Estados locales** para componentes específicos

### Optimizaciones
- **Lazy loading** de imágenes
- **Debouncing** en búsquedas
- **Memoización** de cálculos costosos
- **Caché** de datos de API

### Responsive Design
- **Mobile-first** approach
- **Breakpoints** optimizados
- **Touch-friendly** interfaces
- **Adaptive** layouts

## 🧪 Testing

```bash
# Ejecutar linter
npm run lint

# Ejecutar tests (cuando se implementen)
npm run test
```

## 📊 Métricas del Proyecto

- **Archivos**: 12 archivos principales
- **Líneas de código**: ~1000+ líneas
- **Componentes React**: 5 componentes
- **Hooks personalizados**: 1 (useApp)
- **Servicios**: 2 funciones principales
- **Utilidades**: 1 archivo con lógica compleja

## 🔧 Scripts Disponibles

```json
{
  "dev": "vite",           // Servidor de desarrollo
  "build": "vite build",   // Construcción para producción
  "lint": "eslint .",      // Linting del código
  "preview": "vite preview" // Previsualización del build
}
```

## 🚀 Despliegue

El proyecto está optimizado para desplegarse en:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Implementar tests unitarios
- [ ] Añadir PWA capabilities
- [ ] Implementar comparación de Pokémon
- [ ] Añadir información de evoluciones
- [ ] Implementar modo offline
- [ ] Añadir más filtros avanzados

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Ignacio** - [@tu-usuario](https://github.com/tu-usuario)

---

⭐ **¡Dale una estrella al proyecto si te gusta!** ⭐