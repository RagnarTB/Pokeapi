# 🚀 Desplegar Todo en Un Solo Servicio de Render

## ⚠️ ADVERTENCIA

**NO es recomendado** desplegar microservicios en un solo servicio porque:
- Pierdes los beneficios de escalabilidad independiente
- Si un servicio falla, todos fallan
- No puedes escalar solo el servicio que necesita más recursos
- Va en contra de la arquitectura de microservicios

**Sin embargo**, si es para un proyecto académico o demo, aquí está cómo hacerlo:

---

## 📋 Configuración en Render

### 1. Crear UN SOLO Web Service

**Configuración:**
- **Name:** `pokeapi-all-services`
- **Root Directory:** (dejar vacío - usa la raíz)
- **Build Command:** 
  ```bash
  npm install && npm run install:all && npm run build:all
  ```
- **Start Command:** 
  ```bash
  npm start
  ```

### 2. Variables de Entorno

Agregar en Render:
- `PORT` = `10000` (Render lo asigna automáticamente)
- `MONGODB_URI` = `mongodb+srv://usuario:password@cluster.mongodb.net/pokemonDB`

---

## 🔧 Cómo Funciona

1. **Build Command** instala dependencias de los 3 servicios
2. **Build Command** compila TypeScript de los 3 servicios
3. **Start Command** ejecuta `start-all.js` que inicia los 3 servicios en paralelo

---

## 📝 Archivos Necesarios

Ya he creado:
- ✅ `package.json` (raíz)
- ✅ `start-all.js` (script de inicio)

---

## ⚙️ Puertos Internos

Dentro del contenedor de Render:
- Pokemon Service: Puerto 3000
- Stats Service: Puerto 3001
- Frontend Service: Puerto 3002 (este es el que Render expone)

**Render solo expone el puerto del Frontend (3002)**, que hace las llamadas internas a los otros servicios.

---

## 🌐 URLs en Producción

Como todo está en el mismo contenedor, las URLs internas siguen siendo:
```javascript
fetch('http://localhost:3000/api/pokemons')
fetch('http://localhost:3001/api/stats')
```

**NO necesitas cambiar las URLs del frontend** porque todo está en el mismo servidor.

---

## ✅ Pasos para Desplegar

1. **Hacer commit de los nuevos archivos:**
   ```bash
   git add .
   git commit -m "Add monorepo deployment config"
   git push origin main
   ```

2. **En Render Dashboard:**
   - New → Web Service
   - Conectar repositorio
   - **Build Command:** `npm install && npm run install:all && npm run build:all`
   - **Start Command:** `npm start`
   - Agregar `MONGODB_URI`
   - Create Web Service

3. **Esperar el despliegue** (~5-10 minutos)

4. **Acceder a:** `https://tu-servicio.onrender.com`

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
- Asegúrate que el build command instaló todo
- Verifica que `npm run build:all` compiló los 3 servicios

### Error: "EADDRINUSE"
- Los puertos 3000, 3001, 3002 están hardcodeados
- Render solo expone el puerto principal (3002)

### MongoDB no conecta
- Verifica que `MONGODB_URI` esté configurado
- Usa MongoDB Atlas (no puedes usar MongoDB local en Render)

---

## 📊 Comparación

| Aspecto | 3 Servicios Separados | 1 Servicio Monorepo |
|---------|----------------------|---------------------|
| Escalabilidad | ✅ Independiente | ❌ Todo junto |
| Costo | 💰 Más caro | 💰 Más barato |
| Complejidad | 🔧 Media | 🔧 Baja |
| Recomendado | ✅ Sí | ❌ Solo para demos |

---

## 🎯 Recomendación Final

Para un proyecto académico que quieres mostrar rápido: **Usa 1 servicio** (esta guía)

Para un proyecto real o portafolio profesional: **Usa 3 servicios separados** (ver DEPLOY-RENDER.md)

---

¡Listo! Ahora puedes hacer commit y desplegar todo en un solo servicio de Render. 🚀
