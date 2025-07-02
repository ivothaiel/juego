# Juego del Ahorcado

Este es el juego del ahorcado migrado desde el proyecto Angular a HTML/CSS/JavaScript puro.

## Características

- **10 palabras diferentes** con pistas descriptivas
- **Sistema de imágenes progresivas** que muestra el ahorcado construyéndose paso a paso
- **9 intentos** antes de perder
- **Interfaz moderna** con Bootstrap
- **Modal de resultado** que muestra victoria o derrota
- **Diseño responsive** para móviles y escritorio

## Cómo jugar

1. Abre el archivo `ahorcado.html` en tu navegador web
2. Lee la pista que se muestra
3. Ingresa una letra en el campo de texto
4. Presiona "Adivinar" o Enter
5. Continúa hasta adivinar la palabra o quedarte sin intentos
6. Presiona "Reiniciar Juego" para jugar de nuevo

## Archivos incluidos

- `ahorcado.html` - Archivo principal del juego
- `ahorcado.css` - Estilos del juego
- `ahorcado.js` - Lógica del juego
- `ahorcado/` - Carpeta con todas las imágenes del ahorcado
  - `base.png` - Base del ahorcado
  - `cabeza.png` - Cabeza
  - `cuerpo.png` - Cuerpo
  - `brazo1.png`, `brazo2.png` - Brazos
  - `pierna1.png`, `pierna2.png` - Piernas
  - `ojo1.png`, `ojo2.png` - Ojos
  - `cuerpofinal.png` - Estado final (derrota)
  - `VICTORIA.png` - Imagen de victoria
  - `BUENA-SUERTE!!.png` - Imagen inicial

## Palabras incluidas

1. **montaña** - Elevación natural del terreno, pero no es un volcán
2. **elefante** - Animal terrestre de gran tamaño con memoria prodigiosa
3. **biblioteca** - Lugar donde los silencios guardan conocimiento
4. **espejismo** - Fenómeno óptico que engaña a los ojos en el desierto
5. **relojero** - Persona que trabaja con el tiempo, pero no lo controla
6. **marinero** - Trabaja en un lugar donde no hay tierra firme
7. **murcielago** - Mamífero que vuela, pero no es un ave
8. **carretera** - Camino largo donde los vehículos corren sin detenerse
9. **paraguas** - Objeto que protege de algo que cae del cielo
10. **cascada** - Corriente de agua que cae desde una altura

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5.1.3 (CDN)

## Migración desde Angular

Este juego fue migrado desde un proyecto Angular que incluía:
- Componente `Punto3Component`
- Servicio `AhorcadoService`
- Estilos CSS del componente
- Imágenes del ahorcado

La migración mantiene toda la funcionalidad original pero ahora funciona como una aplicación web independiente sin dependencias de Angular. 

## Nota

Este juego está diseñado para ser utilizado en GitHub Pages. Por lo tanto, el archivo principal es `index.html`. 