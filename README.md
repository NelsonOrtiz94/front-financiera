# Proyecto React - Entidad Financiera

Este proyecto es una aplicación de gestión de clientes y productos para una entidad financiera. Fue desarrollado utilizando React con Vite y Material-UI para la interfaz de usuario.

## Descripción

La aplicación permite gestionar clientes y productos financieros. Los usuarios pueden añadir, editar y eliminar clientes y productos, así como ver listas actualizadas de ambos.

## Tecnologías

- **React** - Biblioteca para construir interfaces de usuario.
- **Vite** - Herramienta de construcción rápida para aplicaciones modernas.
- **Material-UI** - Biblioteca de componentes React que implementa Material Design.
- **Axios** - Cliente HTTP para hacer solicitudes a la API.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de carpetas:


## Instalación

1. Clona el repositorio:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Navega a la carpeta del proyecto:

    ```bash
    cd nombre-del-proyecto
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

## Uso

1. **Navegación**: Utiliza la barra de navegación superior para acceder a las diferentes secciones de la aplicación: Clientes, Productos, y Crear Transacciones.
2. **Clientes**: 
   - Ver, editar y eliminar clientes desde la lista.
   - Agregar nuevos clientes mediante el formulario que aparece al hacer clic en "Añadir Cliente".
3. **Productos**:
   - Ver, editar y eliminar productos desde la lista.
   - Agregar nuevos productos mediante el formulario que aparece al hacer clic en "Añadir Producto".
4. **Inicio**: La página de inicio proporciona una visión general de los servicios ofrecidos.

## Componentes Principales

### `ClienteForm.jsx`

Formulario para agregar o editar clientes. Incluye validaciones para los campos del formulario.

### `ClientesList.jsx`

Lista de clientes con opciones para editar y eliminar. Incluye un botón para agregar nuevos clientes.

### `Home.jsx`

Página de inicio que muestra un mensaje de bienvenida y una breve descripción de los servicios.

### `Navbar.jsx`

Barra de navegación superior para acceder a las diferentes secciones de la aplicación.

### `ProductoForm.jsx`

Formulario para agregar o editar productos. Incluye validaciones y generación automática de números de cuenta.

### `ProductosList.jsx`

Lista de productos con opciones para editar y eliminar. Incluye un botón para agregar nuevos productos.

## API

La aplicación interactúa con las siguientes rutas de la API:

- **Clientes**
  - `GET /api/clientes` - Obtener lista de clientes
  - `POST /api/clientes` - Crear un nuevo cliente
  - `PUT /api/clientes/:id` - Actualizar un cliente existente
  - `DELETE /api/clientes/:id` - Eliminar un cliente

- **Productos**
  - `GET /productos` - Obtener lista de productos
  - `POST /productos` - Crear un nuevo producto
  - `PUT /productos/:id` - Actualizar un producto existente
  - `DELETE /productos/:id` - Eliminar un producto

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.


