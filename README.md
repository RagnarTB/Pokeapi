# Documentación del Proyecto Pokemon API

## ¿Qué es este proyecto?

Este es un proyecto web que te permite explorar Pokémon de una forma interactiva. Básicamente, consulta información de la API pública de Pokémon (PokeAPI), la guarda en una base de datos MongoDB local, y te muestra todo en una página web bonita con un modelo 3D que puedes rotar con el mouse.

## ¿Qué tecnologías usa?

### Node.js
Es como el motor que hace que JavaScript funcione fuera del navegador. Normalmente JavaScript solo funciona en páginas web, pero Node.js te permite usarlo para crear servidores y aplicaciones backend.

**¿Para qué lo usamos?** Para crear el servidor que maneja todas las peticiones.

### TypeScript
Es JavaScript pero con "superpoderes". Te obliga a decir qué tipo de dato es cada cosa (número, texto, etc.), lo que ayuda a evitar errores tontos.

**Ejemplo:**
```typescript
const nombre: string = "Pikachu";  // Esto es un texto
const nivel: number = 25;          // Esto es un número
```

### Express
Es un framework (como una caja de herramientas) que hace súper fácil crear servidores web con Node.js. Sin Express tendrías que escribir un montón de código complicado.

**¿Qué hace?** Maneja las rutas (URLs) y las peticiones HTTP.

### MongoDB
Es una base de datos NoSQL. A diferencia de las bases de datos tradicionales (como MySQL), MongoDB guarda la información en formato JSON, que es mucho más flexible.

**¿Qué guardamos?**
- Información completa de cada Pokémon (nombre, peso, altura, tipos, etc.)
- Un registro cada vez que alguien visita un Pokémon

### Mongoose
Es como un traductor entre Node.js y MongoDB. Te permite definir cómo se ven tus datos y facilita guardar y buscar información.

### Three.js
Librería para hacer gráficos 3D en el navegador. Es lo que hace que el modelo de Pikachu (o el Pokémon que hayas puesto) se vea en 3D y puedas rotarlo.

### Axios
Cliente HTTP que hace peticiones a otras APIs. Lo usamos para consultar PokeAPI y traer la información de los Pokémon.

## ¿Cómo está organizado el proyecto?

```
pokemon-api/
├── Public/                    # Todo lo que ve el usuario
│   ├── index.html            # La página web
│   ├── style.css             # Estilos
│   └── models/               # Modelos 3D
│
├── src/                      # El código del servidor
│   ├── index.ts             # Archivo principal que inicia todo
│   ├── routes/              # Define las URLs de la API
│   ├── controllers/         # Maneja las peticiones
│   ├── service/             # Lógica de negocio
│   ├── entities/            # Interfaces de TypeScript
│   └── types/               # Más tipos de TypeScript
│
├── package.json             # Lista de dependencias
└── tsconfig.json            # Configuración de TypeScript
```

## ¿Cómo funciona todo?

### Cuando abres la página

1. **Navegador pide la página**
   - Tú abres `http://localhost:3000`
   - El servidor te envía `index.html`

2. **JavaScript carga los Pokémon**
   - La página hace una petición: `GET /pokemons?page=1`
   - El servidor consulta PokeAPI
   - Por cada Pokémon:
     - Guarda la info completa en MongoDB (colección `pokemons`)
     - Registra la visita (colección `visits`)
   - Te devuelve la lista de 20 Pokémon

3. **Se muestran en pantalla**
   - JavaScript crea las tarjetas de cada Pokémon
   - Carga el modelo 3D
   - Carga las estadísticas

### El modelo 3D

Usamos Three.js para mostrar un modelo 3D interactivo:

- **Escena:** Es como el "mundo" donde vive el modelo 3D
- **Cámara:** Es desde donde miras el modelo
- **Renderer:** Es el que dibuja todo en el canvas
- **Luces:** Iluminan el modelo para que se vea bien
- **Controles:** Te permiten rotar y hacer zoom con el mouse

## Base de Datos MongoDB

Tenemos 2 colecciones (como tablas en SQL):

### Colección `pokemons`

Guarda la información completa de cada Pokémon. Es como un caché para no tener que consultar PokeAPI cada vez.

**Ejemplo de documento:**
```json
{
  "name": "pikachu",
  "pokedexId": 25,
  "height": 4,
  "weight": 60,
  "types": ["electric"],
  "abilities": ["static", "lightning-rod"],
  "image": "https://...",
  "stats": {
    "hp": 35,
    "attack": 55,
    "defense": 40
  },
  "viewCount": 15,
  "firstSeen": "2025-12-05T10:00:00Z",
  "lastSeen": "2025-12-05T16:00:00Z"
}
```

**¿Por qué guardamos esto?**
- Si PokeAPI está lento o caído, tenemos los datos
- Podemos hacer búsquedas más rápidas
- Llevamos la cuenta de cuántas veces se ha visto cada Pokémon

### Colección `visits`

Registra cada vez que alguien ve un Pokémon.

**Ejemplo de documento:**
```json
{
  "pokemonName": "pikachu",
  "page": 1,
  "visitDate": "2025-12-05T16:23:45Z"
}
```

**¿Para qué sirve?**
- Saber qué Pokémon son más populares
- Saber qué páginas se visitan más
- Hacer estadísticas

## Las Capas del Backend

### 1. Rutas (Routes)

Define qué URLs existen y qué hacen.

**Archivo:** `src/routes/pokemon.route.ts`

```typescript
router.get('/pokemons', getAllPokemons);        // Lista de Pokémon
router.get('/stats', getStats);                 // Top visitados
router.get('/stats/by-type', getStatsByType);   // Por tipo
```

### 2. Controladores (Controllers)

Reciben las peticiones HTTP y llaman a los servicios.

**Archivo:** `src/controllers/pokemon-controller.ts`

```typescript
export const getAllPokemons = async (req, res) => {
    const page = Number(req.query.page) || 1;  // Obtiene el número de página
    const pokemons = await findAllPokemons(page);  // Llama al servicio
    res.json(pokemons);  // Devuelve JSON
};
```

### 3. Servicios (Services)

Aquí está la lógica de negocio y el acceso a datos.

**Archivo:** `src/service/stats.service.ts`

Tiene métodos como:
- `savePokemon()` - Guarda un Pokémon en MongoDB
- `saveVisit()` - Registra una visita
- `getTopPokemons()` - Obtiene los más visitados
- `getStatsByType()` - Agrupa por tipo

**Archivo:** `src/service/pokeapi-service.ts`

- `findAllPokemons()` - Consulta PokeAPI y guarda en MongoDB

## Endpoints de la API

### GET /pokemons?page=1

Obtiene 20 Pokémon de la página especificada.

**Respuesta:**
```json
[
  {
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "abilities": ["overgrow", "chlorophyll"],
    "types": ["grass", "poison"],
    "image": "https://..."
  }
]
```

### GET /stats

Top 5 Pokémon más visitados.

**Respuesta:**
```json
{
  "success": true,
  "topPokemons": [
    { "name": "pikachu", "visits": 45 },
    { "name": "charizard", "visits": 38 }
  ]
}
```

### GET /stats/by-type

Cuántos Pokémon hay de cada tipo.

**Respuesta:**
```json
{
  "success": true,
  "stats": [
    { "type": "water", "count": 32 },
    { "type": "fire", "count": 28 }
  ]
}
```

### GET /stats/heaviest

Los 5 Pokémon más pesados.

### GET /stats/tallest

Los 5 Pokémon más altos.

### GET /stats/by-page

Cuántas visitas tiene cada página.

## Frontend

### HTML + CSS + JavaScript

La página web está hecha con tecnologías básicas:
- **HTML:** Estructura de la página
- **CSS:** Estilos y colores
- **JavaScript:** Lógica e interactividad

### Sistema de Tabs

Tiene 3 pestañas para ver diferentes estadísticas:
- **Top Vistos:** Los Pokémon más populares
- **Por Tipo:** Distribución por tipos (agua, fuego, etc.)
- **Más Pesados:** Los Pokémon más gorditos

Cuando haces click en una pestaña, se ocultan las demás y se muestra la que seleccionaste.

### Visualizador 3D

El modelo 3D se carga con Three.js:

1. **Crea una escena** (el mundo 3D)
2. **Configura la cámara** (desde donde miras)
3. **Agrega luces** (para que se vea bien)
4. **Carga el modelo GLTF** (el archivo del Pokémon)
5. **Permite controles** (rotar con mouse, zoom con rueda)

## ¿Cómo ejecutar el proyecto?

### Requisitos

- Node.js instalado
- MongoDB instalado y corriendo

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. En una terminal, iniciar MongoDB
mongod --dbpath ./data/db

# 3. En otra terminal, iniciar el servidor
npm run dev

# 4. Abrir navegador
http://localhost:3000
```

## Scripts disponibles

```bash
npm run dev        # Modo desarrollo (con TypeScript directo)
npm run build      # Compilar TypeScript a JavaScript
npm start          # Ejecutar versión compilada
npm run mongo:start # Iniciar MongoDB
```

## ¿Cómo se conecta a MongoDB?

En el archivo `src/service/stats.service.ts`:

```typescript
await mongoose.connect('mongodb://localhost:27017/pokemonDB');
```

Esto significa:
- **mongodb://**: Protocolo de MongoDB
- **localhost**: Tu computadora
- **27017**: Puerto por defecto de MongoDB
- **pokemonDB**: Nombre de la base de datos

## Consultas útiles en MongoDB

Puedes usar DBeaver o MongoDB Compass para ver los datos:

```javascript
// Ver todos los Pokémon guardados
db.pokemons.find()

// Contar cuántos Pokémon hay
db.pokemons.countDocuments()

// Ver las visitas
db.visits.find()

// Top Pokémon (igual que la app)
db.visits.aggregate([
  { $group: { _id: "$pokemonName", visits: { $sum: 1 } } },
  { $sort: { visits: -1 } },
  { $limit: 5 }
])
```

## Flujo completo (paso a paso)

1. Usuario abre `http://localhost:3000`
2. Navegador carga `index.html`
3. JavaScript hace `fetch('/pokemons?page=1')`
4. Express recibe la petición
5. Controlador extrae el parámetro `page=1`
6. Servicio consulta PokeAPI
7. Por cada Pokémon:
   - Guarda en colección `pokemons` (upsert)
   - Registra visita en colección `visits`
8. Retorna JSON al navegador
9. JavaScript renderiza las tarjetas
10. Carga el modelo 3D
11. Carga las estadísticas (3 peticiones paralelas)

## Características cool del proyecto

### Sistema de Caché

En lugar de consultar PokeAPI cada vez, guardamos los datos en MongoDB. Así:
- Es más rápido
- No dependemos 100% de PokeAPI
- Podemos hacer estadísticas

### Upsert en MongoDB

Cuando guardamos un Pokémon, usamos `findOneAndUpdate` con `upsert: true`:
- Si el Pokémon ya existe: actualiza `viewCount` y `lastSeen`
- Si es nuevo: lo crea con `firstSeen`

### Agregaciones

MongoDB tiene un sistema de "pipelines" para hacer consultas complejas:

```javascript
// Agrupar por tipo
db.pokemons.aggregate([
  { $unwind: '$types' },           // Descompone el array
  { $group: { _id: '$types', count: { $sum: 1 } } },  // Agrupa y cuenta
  { $sort: { count: -1 } }         // Ordena
])
```

### Peticiones Paralelas

Cuando cargamos 20 Pokémon, no esperamos uno por uno. Usamos `Promise.all()` para hacerlo todo en paralelo:

```typescript
const pokemons = await Promise.all(
    data.results.map(async (pokemon) => {
        // Procesa cada Pokémon en paralelo
    })
);
```

## Posibles mejoras

- Agregar sistema de favoritos
- Búsqueda de Pokémon por nombre
- Filtros por tipo
- Más gráficas y estadísticas
- Sistema de usuarios
- Modo oscuro

## Troubleshooting

### MongoDB no conecta

**Error:** `MongoDB no conectado`

**Solución:** Asegúrate que MongoDB esté corriendo:
```bash
mongod --dbpath ./data/db
```

### Puerto 3000 ocupado

**Error:** `Port 3000 is already in use`

**Solución:** Mata el proceso o cambia el puerto en `src/index.ts`

### Modelo 3D no carga

**Solución:** Verifica que los archivos estén en `Public/models/pokemon/`

## Conclusión

Este proyecto combina varias tecnologías modernas para crear una aplicación web completa:
- Backend con Node.js + TypeScript + Express
- Base de datos MongoDB con Mongoose
- Frontend con JavaScript vanilla + Three.js
- Integración con API externa (PokeAPI)

Es un buen ejemplo de arquitectura en capas, separación de responsabilidades, y uso de tecnologías actuales del ecosistema JavaScript.
