# Referencias de imágenes para dibujo - SketchMuse

Aplicación web para buscar y organizar galerías de imágenes con sesiones cronometradas.

---

## Índice

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Tecnologías](#tecnologías)
- [Funcionalidades](#funcionalidades)
- [Seguridad](#seguridad)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Estado y Roadmap](#estado-y-roadmap)

---

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

- **.NET 8 SDK**
- **Node.js 18+**
- **MySQL 8+**
- **Angular CLI** (instalar con: `npm install -g @angular/cli`)

---

## Instalación

### Backend

```bash
cd <ruta-del-proyecto-backend>
dotnet restore
dotnet build
dotnet run
```

> La base de datos y tablas se crean automáticamente

### Frontend

```bash
cd <ruta-del-proyecto-frontend>
npm install
ng serve
```

> Accesible en **http://localhost:4200**

---

## Tecnologías

| Componente | Tecnología |
|-----------|-----------|
| **Frontend** | Angular 21 |
| **Backend** | .NET 8 con arquitectura por capas |
| **Base de Datos** | MySQL |
| **Autenticación** | JWT + BCrypt |

---

## Funcionalidades Implementadas

**Búsqueda de Imágenes**
- Búsqueda por texto llamando a APIs externas (Unsplash + Pixabay)
- Sistema de fallback automático: si Unsplash falla, usa Pixabay automáticamente

**Gestión de Álbumes**
- Creación automática de álbumes al buscar
- Álbumes vinculados al usuario registrado
- Vista de álbumes con preview de imágenes
- Vista detallada con todas las imágenes del álbum

**Navegación**
- Navegación fluida entre vistas con Angular Routes

---

## Seguridad

- **Usuario registrado con email y contraseña segura**, hay partes de la web a la que se accede sin necesidad de tener un usuario
- **Autenticación JWT** (JSON Web Tokens)
- **Hasheo de contraseñas** con BCrypt
- **Rutas protegidas** en frontend con Guards
- **Endpoints protegidos** en backend con `[Authorize]`
- **APIs ocultas**: Las claves de APIs externas nunca se exponen al frontend (almacenadas solo en backend)
- **Diferenciación de funcionalidades** entre usuarios registrados y no registrados
- **Uso de .env y DotNetEnv**  para facilitar el uso de las variables y ocultar información importante

---

## Estructura del Proyecto

```
Proyecto
├── Frontend (Angular 21)
│   ├── features/      (módulos funcionales)
│   ├── core/          (servicios y guards)
│   └── components/    (componentes reutilizables)
│
└── Backend (.NET 8)
    ├── Controllers/   (API endpoints)
    ├── Services/      (lógica de negocio)
    ├── Infrastructure/(acceso a datos)
    └── Domain/        (modelos)
```


---

## Endpoints

| Método | Ruta | Autenticación | Descripción |
|--------|------|:-------------:|-------------|
| `POST` | `/api/auth/register` | NO | Registrar nuevo usuario |
| `POST` | `/api/auth/login` | NO | Iniciar sesión |
| `GET` | `/api/imagenes` | NO | Buscar imágenes |
| `GET` | `/api/albumes/user-albumes` | SI | Ver álbumes del usuario |
| `GET` | `/api/albumes/{id}/imagenes` | SI | Ver imágenes de un álbum |
| `POST` | `/api/albumes/{id}/ampliar` | SI | Agregar imágenes a un álbum |

---

## Estado actual

### Completado
- Búsqueda de imágenes
- Gestión de álbumes
- Autenticación y seguridad
- API funcional

### En Progreso
- Despliegue con Docker y docker-compose

### Por Implementar
- Sesión cronometrada de dibujo
- Sistema de valoración de imágenes (aceptar/rechazar)
- Mejoras de estilos y experiencia de usuario
