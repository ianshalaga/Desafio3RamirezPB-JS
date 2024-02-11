# Desafio3RamirezPB-JS

Tercer desafío entregable del curso de Programación Backend de CoderHouse.

## Consigna

- Desarrollar un servidor basado en **express** donde podamos hacer consultas a nuestro archivo de productos.
- Se deberá utilizar la clase **ProductManager** que actualmente utilizamos con persistencia de archivos ([Desafío 2](https://github.com/ianshalaga/Desafio2RamirezPB)).
- Desarrollar un servidor **express** que, en su archivo **app.js** importe el archivo de **ProductManager.js** que actualmente tenemos.
- El servidor debe contar con los siguientes **endpoints**:

  - Ruta **/products**, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por **query param** el valor **?limit=** el cual recibirá un límite de resultados. Si no se recibe query de límite, se devolverán todos los productos. Si se recibe un límite, sólo devolver el número de productos solicitados.
  - Ruta **/products/:pid**, la cual debe recibir por **req.params** el **pid** (**product Id**), y devolver sólo el producto solicitado, en lugar de todos los productos.

- Tu clase lee archivos con promesas. Recuerda usar **async** / **await** en tus **endpoints**.
- Utiliza un archivo que ya tenga productos, pues el desafío sólo es para **gets**.

## Entrega

Link al repositorio de **GitHub** con el proyecto completo, el cual debe incluir:

- Una carpeta **src** que contenga el archivo **app.js** y tu archivo **ProductManager.js**.
- Un **package.json** con la **info** del proyecto.
- **No incluir los node_modules generados**.

## Prueba

- Se instalarán las dependencias a partir del comando **npm install**.
- Se echará a andar el servidor.
- Se revisará que el archivo **ya cuente con al menos diez productos creados** al momento de su entrega. Es importante para que los tutores no tengan que crear los productos por sí mismos, y así agilizar el proceso de tu evaluación.
- Se corroborará que el servidor esté corriendo en el **puerto 8080**.
- Se mandará a llamar desde el navegador a la url **`http://localhost:8080/products`** sin **query**. Eso debe devolver todos los **10** productos.
- Se mandará a llamar desde el navegador a la url **`http://localhost:8080/products?limit=5`**. Eso debe devolver sólo los primeros **5** de los **10** productos.
- Se mandará a llamar desde el navegador a la url **`http://localhost:8080/products/2`**. Eso debe devolver sólo el producto con **id = 2**.
- Se mandará a llamar desde el navegador a la url **`http://localhost:8080/products/34123123`**. Al no existir el **id** del producto, debe devolver un objeto con un **error** indicando que el producto no existe.

## Nodemon

Nodemon reinicia automáticamente el servidor en cuanto detecta que hay cambios en el código.

- `npm install --save-dev nodemon`

## Express.js

**Express.js** es un **framework** minimalista y flexible para **Node.js** que simplifica el desarrollo de aplicaciones web y **APIs** al proporcionar características esenciales como enrutamiento, manejo de **middleware**, integración con motores de plantillas, gestión de errores, y más. Su enfoque modular y su extensibilidad permiten a los desarrolladores construir aplicaciones de manera rápida y eficiente, adaptándose a las necesidades específicas de sus proyectos. Express.js es ampliamente utilizado en la comunidad de **Node.js** debido a su facilidad de uso y su capacidad para construir aplicaciones web escalables y robustas.

- `npm install express`

## JSON Formatter

Extensión para navegadores basados en Chromium.

- [JSON Formatter](https://chromewebstore.google.com/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa)

## TypeScript version

- [Desafio3RamirezPB-TS](https://github.com/ianshalaga/Desafio3RamirezPB-TS)
