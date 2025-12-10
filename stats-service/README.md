# Stats Service

Servicio de estadísticas y analytics con MongoDB.

## Puerto
3001

## Endpoints

### GET /api/stats
Top 5 Pokémon más visitados.

### GET /api/stats/by-type
Estadísticas agrupadas por tipo de Pokémon.

### GET /api/stats/heaviest
Los 5 Pokémon más pesados.

### GET /api/stats/tallest
Los 5 Pokémon más altos.

### GET /api/stats/by-page
Visitas agrupadas por número de página.

### POST /api/stats/visit
Registra una visita de un Pokémon.

**Body:**
```json
{
  "pokemonName": "pikachu",
  "page": 1
}
```

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## Variables de Entorno

- `PORT` - Puerto del servicio (default: 3001)
- `MONGODB_URI` - URI de conexión a MongoDB (default: mongodb://localhost:27017/pokemonDB)

## Dependencias

- express
- mongoose
- cors
- typescript
- ts-node

## Base de Datos

### Colecciones

**pokemons:**
- Caché de Pokémon completos
- Índice en `name`

**visits:**
- Registro de visitas
- Índices en `pokemonName` y `visitDate`
