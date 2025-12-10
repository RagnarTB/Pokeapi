# 🚀 Guía Rápida de Ejecución

## ✅ Estado Actual
- ✅ Dependencias instaladas en los 3 servicios
- ✅ Código duplicado eliminado
- ✅ Errores de CORS resueltos
- ✅ render.yaml corregido

---

## 🚀 Cómo Ejecutar (PowerShell)

### Paso 1: Iniciar MongoDB
```powershell
mongod --dbpath ./data/db
```

### Paso 2: Iniciar los 3 Servicios

**Opción A: Script Automático**
```powershell
.\start-all.bat
```

**Opción B: Manual (3 terminales separadas)**

**Terminal 1 - Pokemon Service:**
```powershell
cd pokemon-service
npm run dev
```

**Terminal 2 - Stats Service:**
```powershell
cd stats-service
npm run dev
```

**Terminal 3 - Frontend Service:**
```powershell
cd frontend-service
npm run dev
```

### Paso 3: Abrir Navegador
```
http://localhost:3002
```

---

## 📝 Comandos PowerShell vs CMD

| Acción | CMD | PowerShell |
|--------|-----|------------|
| Eliminar carpeta | `rmdir /s /q src` | `Remove-Item -Recurse -Force src` |
| Ejecutar .bat | `start-all.bat` | `.\start-all.bat` |
| Listar archivos | `dir` | `ls` o `dir` |

---

## 🎯 Verificar que Todo Funciona

1. **Pokemon Service (Puerto 3000):**
```powershell
curl http://localhost:3000/api/pokemons?page=1
```

2. **Stats Service (Puerto 3001):**
```powershell
curl http://localhost:3001/api/stats
```

3. **Frontend (Puerto 3002):**
Abrir en navegador: `http://localhost:3002`

---

## ⚡ Inicio Rápido

```powershell
# En la raíz del proyecto
.\start-all.bat
```

Esto abrirá 3 ventanas de CMD automáticamente con cada servicio.

---

## 🐛 Troubleshooting

### Error: "start-all.bat no se reconoce"
**Solución:** Usa `.\start-all.bat` (con el punto y barra)

### Error: MongoDB no conecta
**Solución:** Asegúrate que MongoDB esté corriendo en otra terminal

### Puerto ocupado
**Solución:**
```powershell
# Ver qué usa el puerto 3000
netstat -ano | findstr :3000

# Matar proceso (reemplaza PID)
taskkill /PID <PID> /F
```

---

## 📊 Arquitectura

```
Frontend (3002) → Pokemon Service (3000) → PokeAPI
                ↓
                Stats Service (3001) → MongoDB
```

¡Todo listo para ejecutar! 🚀
