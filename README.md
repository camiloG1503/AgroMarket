# AgroMarket

Aplicación de comercio agrícola con frontend React/Vite y API Express/Sequelize sobre MySQL.

## Requisitos

- Node.js 18 o superior
- MySQL 8

## Configuración

1. Copia `backend/.env.example` como `backend/.env`.
2. Completa las credenciales de MySQL, `JWT_SECRET` y, si vas a ejecutar el seed, las variables `SEED_*`.
3. Instala dependencias:

```powershell
npm install
cd backend; npm install
cd ..\frontend; npm install
```

## Ejecución

Desde la raíz:

```powershell
npm run dev
```

La API queda disponible en `http://localhost:5000` y el frontend en `http://localhost:5173`.

```powershell
cd backend
npm start
```

El endpoint `GET /api/health` permite comprobar que la API está disponible. El servidor no inicia si no puede conectar con MySQL.

## Validación frontend

```powershell
cd frontend
npm run build
```