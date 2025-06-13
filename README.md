# Dashboard de Soporte de Agentes (User Support Dashboard)

Este proyecto es un dashboard interactivo diseñado para monitorizar los KPIs de un centro de soporte de usuarios. La aplicación permite visualizar la distribución de agentes, gestionar el alta y baja de agentes, y cambiar su estado entre activo e inactivo. Incluye un modo oscuro para mejorar la experiencia de usuario.

![image](https://github.com/AlexBDominguez/user-support-dashboard/assets/132932375/4a5b4858-a590-449e-8c54-7389146522c7)


## ✨ Características Principales

- **Visualización de KPIs:** Tarjetas con el número total de agentes, activos e inactivos.
- **Gráfico Interactivo:** Un gráfico de tarta que muestra la distribución de agentes por estado.
- **Gestión de Agentes:**
  - Añadir nuevos agentes a través de un formulario.
  - Eliminar agentes directamente desde la tabla.
  - Cambiar el estado de un agente (Activo/Inactivo) con un solo clic.
- **Modo Oscuro:** Un interruptor para cambiar entre el tema claro y oscuro de forma global.
- **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla.

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3:** Framework principal para la creación de la API REST.
- **Maven:** Gestor de dependencias del proyecto.
- **JSONPlaceholder:** API externa utilizada para simular la carga inicial de datos de agentes.

### Frontend
- **Angular 17:** Framework principal para la construcción de la interfaz de usuario.
- **TypeScript:** Lenguaje de programación para el frontend.
- **ng2-charts (Chart.js):** Librería para la creación de gráficos interactivos.
- **CSS Moderno:** Uso de variables CSS, Grid Layout y Flexbox para un diseño robusto y personalizable.

---

## 🚀 Cómo Poner en Marcha el Proyecto

Para ejecutar este proyecto, necesitarás tener instalado **Java 17 (o superior)**, **Maven**, **Node.js y Angular CLI**.

### 1. Backend (API de Spring Boot)

El backend se encarga de servir los datos de los agentes.

```bash
# 1. Navega a la carpeta raíz del proyecto
cd ruta/a/ProyectoCAU_CarolinaHP

# 2. Compila el proyecto y ejecuta los tests con Maven
mvn clean install

# 3. Inicia el servidor de Spring Boot
# Puedes hacerlo desde tu IDE (IntelliJ, Eclipse, VSCode) ejecutando la clase `DashboardApplication.java`
# o a través de la línea de comandos:
mvn spring-boot:run
```
El servidor del backend se ejecutará en `http://localhost:8080`.

### 2. Frontend (Aplicación de Angular)

El frontend consume los datos del backend y los presenta en una interfaz interactiva.

```bash
# 1. Navega a la carpeta del frontend
cd ruta/a/ProyectoCAU_CarolinaHP/frontend

# 2. Instala las dependencias de Node.js
npm install

# 3. Inicia el servidor de desarrollo de Angular
ng serve
```
La aplicación frontend estará disponible en `http://localhost:4200` (o en el puerto que se indique si el 4200 está ocupado).

---

## 📋 Endpoints de la API

La API REST del backend expone los siguientes endpoints:

| Método | Ruta                      | Descripción                                     |
|--------|---------------------------|-------------------------------------------------|
| `GET`    | `/api/agents`             | Obtiene la lista completa de agentes.           |
| `POST`   | `/api/agents`             | Añade un nuevo agente a la lista.               |
| `DELETE` | `/api/agents/{id}`        | Elimina un agente por su ID.                    |
| `PUT`    | `/api/agents/{id}/status` | Actualiza el estado de un agente (Active/Inactive). |

