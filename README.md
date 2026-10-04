# Archivo Yaguaretania

Una bitácora de lectura interactiva para explorar *Yaguaretania*, de Andrea Ferrari Kristeller. La página propone observar el territorio, seguir sus señales y construir una interpretación propia. Es material de acompañamiento y no reemplaza el cuento ni presenta una recreación imaginada como argumento literal.

## Contenido

- `index.html`: estructura y contenido de la experiencia.
- `styles.css`: estilos adaptables a dispositivos móviles y de escritorio.
- `script.js`: interacciones de navegación, señales, atlas, minijuego y recorrido.

## Minijuego

En el apartado **Juego**, encuentra 10 huellas en 30 segundos. Cada pista dura unos segundos y los toques fallidos cuentan como errores. Al terminar, el resultado muestra si ganaste o perdiste, las huellas encontradas, los errores, la precisión, el tiempo restante y tu mejor rastreo de la sesión. Se puede jugar tocando las casillas o con teclado.

## Cómo abrir la página

No requiere instalación de dependencias ni proceso de compilación. Abre `index.html` directamente en un navegador. También puedes iniciar un servidor local desde esta carpeta:

```bash
python -m http.server 8000
```

Luego visita <http://localhost:8000>.

## Recursos externos

La página carga las fuentes desde Google Fonts y las imágenes desde Unsplash. La sección sobre el yaguareté incluye una referencia informativa a WWF. Estos recursos requieren conexión a Internet.

## Publicación con GitHub Pages

Para publicar el sitio, en el repositorio abre **Settings → Pages** y configura la fuente como la rama `main` y la carpeta `/(root)`. Una vez completado el despliegue, estará disponible en:

<https://franchopancho.github.io/Archivo-Yaguaretania/>
