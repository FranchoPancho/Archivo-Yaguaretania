# Archivo Yaguaretania

Una bitácora de lectura interactiva para explorar *Yaguaretania*, de Andrea Ferrari Kristeller. Su interfaz futurista presenta la selva como un archivo digital que reconstruye un pasado imaginado, sin fijar un año. Es material de acompañamiento y no reemplaza el cuento. El yaguareté sigue vivo y está amenazado; el marco antiguo no describe una extinción real.

## Contenido

- `index.html`: estructura y contenido de la experiencia.
- `styles.css`: estilos adaptables a dispositivos móviles y de escritorio.
- `script.js`: interacciones de navegación, señales, atlas, minijuego y recorrido.

## Rastreo documentado en Misiones

La sección de rastreo resume un reporte público del Proyecto Yaguareté (CeIBA-CONICET) sobre cámaras trampa y el operativo de colocación de collares satelitales a Pará y Gaucho, realizado el 17 de junio de 2025 en Puerto Península. Incluye un croquis esquemático, no a escala, con zonas generalizadas: no es un mapa en vivo, no muestra rutas individuales y no confirma el estado actual de los collares. Incluye enlaces al reporte original y al Plan Nacional de Conservación del Yaguareté.

## Minijuego

En el apartado **Juego**, encuentra 10 huellas en 30 segundos. Dos trampas de espinas aparecen en cada turno: tocarlas suma un error y resta dos segundos. Si la huella no se encuentra a tiempo, cambia de lugar. Al terminar, el resultado muestra las huellas encontradas, los errores, la precisión, el tiempo restante y el mejor rastreo de la sesión. Se puede jugar tocando las casillas o con teclado. Al completar los cuatro apuntes de lectura aparece una animación de cierre.

## Cómo abrir la página

No requiere instalación de dependencias ni proceso de compilación. Abre `index.html` directamente en un navegador. También puedes iniciar un servidor local desde esta carpeta:

```bash
python -m http.server 8000
```

Luego visita <http://localhost:8000>.

## Recursos externos

La página carga las fuentes desde Google Fonts y la fotografía de referencia del yaguareté desde Wikimedia Commons. La imagen corresponde a un macho fotografiado en el Pantanal brasileño: no es un registro de Misiones. El crédito a Charles J. Sharp y la licencia CC BY-SA 4.0 se muestran junto a la imagen. La sección sobre el yaguareté incluye una referencia informativa a WWF. Estos recursos requieren conexión a Internet.

## Publicación con GitHub Pages

Para publicar el sitio, en el repositorio abre **Settings → Pages** y configura la fuente como la rama `main` y la carpeta `/(root)`. Una vez completado el despliegue, estará disponible en:

<https://franchopancho.github.io/Archivo-Yaguaretania/>
