## Uso

1. Descargar o clonar el repositorio desde: https://github.com/gtoribio89/zara-web-challenge.git
2. Una vez ubicado en nuestro sistema debemos abrir un entorno de desarrollo o algún terminal y ejecutar "npm star" (por supuesto debemos asegurarnos primero de tener todas las herramientas necesarias para arracancar este proceso. Mas info en: https://nodejs.org/)
3. Tras ejecutar el comando anterior debemos esperar a que se compile el código, tras esto podremos acceder a "http://localhost:3000/" atraves de nuestro navegador web (recuerda que el puerto puede variar según tu configuración).
4. Con todo esto ya tenemos lo necesario para navegar por la aplicación.

## Estructura

Si deseas contribuir a este proyecto, sigue estos pasos:

1. El proyecto guarda el grueso de su código en el directorio "/src" ubicado en la raíz del proyecto.
2. Ahora vamos a explicar las diferentes partes relevantes
   index.js => archivo principal desde el que arranca la aplicación y el cual alberga el contexto del sistema de favoritos
   /api => directorio que recoge los ficheros con las diferentes llamadas a la api de Marvel utilizadas en el proyecto
   /aseets => directorio que recoge los elementos visuales del proyecto
   /components => directorio que recoge los componentes del proyecto los cuales explicaremos en el siguiente apartado
   /fonts => directorio que recoge las fuentes usadas en el proyecto
   /styles => directorio que recoge los diferentes archivos scss así como la estructura de estos dividida por componentes y utilidades
   /utils => directorio creado para albergar diferentes funcionalidades genericas, que en nuestro caso se limitan al archivo routes.js por el momento
3. Componentes principales (Vistas): El proyecto se compone de dos vistas las cuales son:
   Home.js => Componente que genera la raiz de la aplicación "/" y muestra el listado de personajes
   ProductDetails.js => Componente que muestra la vista detallada del elemento selecionado
4. Componentes de apoyo: los encontraremos en el directorio /commons
   Card.js => Renderiza cada uno de los elementos redenderizados en el listado de Home.js
   ComicItem.js => Renderiza cada uno de los comics del personaje selecionado en ProductDetails.js
   FavoritesContext.js => Proporciona el contexto del sistema de favoritos
   Header.js => Renderiza la cabecera de nuestra aplicación web, se llama en cada una de las vistas
   SearchBar.js => Renderiza la barra de busqueda ubicada en Home.js

## Errores conocidos y margen de mejora

1. Sería buena idea implementar funcionalidad al componente SearchBar para que realice búsquedas cuando el filtro de favoritos esté activo.
2. Existe un Bug que ocasiona que el filtro de favoritos no se active si nos encontramos en "/character/:id. Se ha reemplazado por la redirección a "/" únicamente, en espera de solucionar el problema.
3. Restan por agregar herramientas de testing
4. Los dots del carousel de ProductDetails deben mostrar una barra de scroll en lugar de dicho componente.
5. Se podría implementar una funcionalidad para agregar una barra de "loading" para mostrar el progreso mientras llegan los datos.
6. De obtener más elementos en el futuro en lugar de la limitación de 50 quizás se pudiera incluir un sistema de paginación.
7. Quizás se podría implementar un sistema de login.
8. Con el sistema de login se podría mostrar el listado de favoritos en una nueva vista independiente.
