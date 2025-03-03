# Car Fleet API - Backend en Node.js con Express y MongoDB

Este es un backend desarrollado en **Node.js** con **Express** y **MongoDB**, utilizando **JWT** para autenticación y estructurado bajo los principios de **Clean Architecture**.  
El sistema permite la gestión de una flota de vehículos, asignándolos automáticamente a una categoría según su marca, modelo y año.

## Tecnologías

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** para autenticación
- **Docker** para despliegue rápido
- **Estructura modular basada en Clean Architecture**

## Cómo ejecutar

Este backend está **dockerizado**, lo que significa que puede levantarse rápidamente sin preocuparse por dependencias.  

### 1. Clonar el repositorio
```sh
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
```

### 2. Levantar el contenedor con docker-compose
```sh
docker-compose up --build -d
```

Esto iniciará la API en el puerto **3000**.

### 3. Verificar que el servidor esté corriendo
Puede probarse con cURL o el navegador:
```sh
curl http://localhost:3000
```

## Endpoints Disponibles

### Autenticación
| Método | Endpoint      | Descripción |
|--------|-------------|-------------|
| `POST` | `/login`    | Iniciar sesión y obtener un token JWT |
| `POST` | `/login/refresh` | Refrescar el token JWT |
| `POST` | `/users`    | Crear un nuevo usuario (admin) |

### Vehículos
| Método | Endpoint               | Descripción |
|--------|------------------------|-------------|
| `POST` | `/vehiculos`            | Crea un nuevo vehículo |
| `GET`  | `/vehiculos`            | Lista todos los vehículos (paginado) |
| `GET`  | `/vehiculos/fleet/:flota` | Lista vehículos por flota (paginado) |
| `GET`  | `/vehiculos/brand/:marca` | Lista vehículos por marca (paginado) |
| `GET`  | `/vehiculos/:id`        | Obtiene un vehículo por ID |
| `PATCH`  | `/vehiculos/:id`      | Actualiza parcialmente un vehículo |
| `DELETE` | `/vehiculos/:id`      | Elimina un vehículo |

### Usuarios
| Método | Endpoint               | Descripción |
|--------|------------------------|-------------|
| `POST` | `/user`                | Crea un nuevo usuario |
| `GET`  | `/user`                | Lista todos los usuarios |
| `GET`  | `/user/:id`            | Obtiene un usuario por ID |
| `PATCH` | `/user/:id`           | Actualiza parcialmente un usuario |

### Public (Health Check)
| Método | Endpoint      | Descripción |
|--------|-------------|-------------|
| `GET`  | `/`         | Verifica si el servicio está activo |

## Variables de Entorno

Si se ejecuta la API sin Docker, es necesario un archivo `.env` con:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/carfleet
JWT_SECRET=supersecreto
```

## Colección de Postman

Una colección de **Postman** con ejemplos de requests se encuentra disponible.  