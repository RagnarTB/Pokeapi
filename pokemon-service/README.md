# Pokemon Service

Servicio de catálogo de Pokémon que consulta la API externa de PokeAPI.

## Puerto
3000

## Endpoints

### GET /api/pokemons?page=1
Obtiene una lista paginada de 20 Pokémon.

**Parámetros:**
- `page` (query): Número de página (default: 1)

**Respuesta:**
```json
[
  {
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "abilities": ["overgrow", "chlorophyll"],
    "types": ["grass", "poison"],
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  }
]
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

- `PORT` - Puerto del servicio (default: 3000)

## Dependencias

- express
- axios
- cors
- typescript
- ts-node
