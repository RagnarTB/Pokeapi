# Frontend Service

Servicio frontend que sirve la interfaz web de Pokémon Explorer.

## Puerto
3002

## Características

- Interfaz web responsive
- Modelo 3D interactivo de Pikachu (Three.js)
- Listado de Pokémon con paginación
- Panel de estadísticas con tabs
- Diseño moderno con gradientes

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

- `PORT` - Puerto del servicio (default: 3002)

## Dependencias

- express
- typescript
- ts-node

## Servicios Externos

Este servicio hace llamadas a:
- Pokemon Service: `http://localhost:3000`
- Stats Service: `http://localhost:3001`

## Archivos Estáticos

- `public/index.html` - Página principal
- `public/style.css` - Estilos (opcional)
- `public/models/` - Modelos 3D
