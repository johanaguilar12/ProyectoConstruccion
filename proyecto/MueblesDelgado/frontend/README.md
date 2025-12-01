## Instrucciones para Configurar el Proyecto

### Instalación de Node.js

Primero, es necesario instalar Node.js, que se utiliza principalmente para la administración de paquetes.

### Clonación e Instalación de Paquetes

Una vez que Node.js esté instalado, clona el proyecto desde el repositorio.

En la consola, ejecuta el siguiente comando:
```sh
yarn
```
Esto instalará automáticamente todos los paquetes necesarios.

### Ejecución del Proyecto

Después de instalar los paquetes, ejecuta el siguiente comando para iniciar el proyecto:
```sh
yarn dev
```
Esto iniciará la página en una URL local, donde podrás navegar para acceder a las distintas secciones (login es la raiz y /admin/panel es donde ira lo del admin).

### Estructura de Trabajo

- **Carpeta Auth**: En la carpeta `auth`, ira solo la parte de autenticacion.
- **Carpeta admin**: Todo lo relacionado con el administrados.

### Archivo de Estilos

El archivo `styles.css`, ubicado en la raíz de `src`, es global, por lo que se aplicará a todos los archivos que lo referencien.

Se pueden usar todas las propiedades de estilo que hemos visto, incluyendo `id`, `name` y `class`.

### Nota sobre className

Al usar etiquetas, si deseas aplicar clases CSS, debes utilizar `className` en lugar de `class` en archivos jsx.

### Tailwind

Ya tiene la dependencia de Tailwind  que son los estilos en linea, pueden leer la documentacion para usarlo