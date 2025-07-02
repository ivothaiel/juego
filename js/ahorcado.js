// Clase AhorcadoService - Migrada desde Angular
class AhorcadoService {
    constructor() {
        // Palabras con sus pistas (definiciones exactas de psicología)
        this.palabras = [
            { palabra: 'depresion', pista: 'Trastorno mental caracterizado por un estado de ánimo bajo, pérdida de interés o placer, y una disminución de la energía.' },
            { palabra: 'ansiedad', pista: 'Estado emocional de inquietud, nerviosismo y preocupación excesiva ante situaciones percibidas como amenazantes.' },
            { palabra: 'resiliencia', pista: 'Capacidad de una persona para superar circunstancias traumáticas o adversas.' },
            { palabra: 'psicoterapia', pista: 'Tratamiento de problemas emocionales y de conducta mediante técnicas psicológicas.' },
            { palabra: 'autoconcepto', pista: 'Conjunto de percepciones y creencias que una persona tiene sobre sí misma.' },
            { palabra: 'motivacion', pista: 'Proceso que inicia, guía y mantiene el comportamiento orientado a un objetivo.' },
            { palabra: 'cognicion', pista: 'Conjunto de procesos mentales relacionados con el conocimiento, como la percepción, la memoria y el razonamiento.' },
            { palabra: 'trauma', pista: 'Respuesta emocional a un evento profundamente perturbador o angustiante.' },
            { palabra: 'empatía', pista: 'Capacidad de comprender y compartir los sentimientos de otra persona.' },
            { palabra: 'autoestima', pista: 'Valoración positiva o negativa que una persona tiene de sí misma.' }
        ];

        this.palabraSecreta = '';
        this.pista = '';
        this.intentosRestantes = 9;
        this.errores = 0;
        this.letrasAdivinadas = [];
        this.estadoPalabra = [];
    }

    iniciarJuego() {
        const palabraAleatoria = this.elegirPalabraAleatoria();
        this.palabraSecreta = palabraAleatoria.palabra;
        this.pista = palabraAleatoria.pista;
        this.intentosRestantes = 9;
        this.errores = 0;
        this.letrasAdivinadas = [];
        this.estadoPalabra = Array(this.palabraSecreta.length).fill('_');
    }

    elegirPalabraAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
        return this.palabras[indiceAleatorio];
    }

    procesarLetra(letra) {
        letra = letra.toLowerCase();
        let acierto = false;
        
        for (let i = 0; i < this.palabraSecreta.length; i++) {
            if (this.palabraSecreta[i] === letra) {
                this.estadoPalabra[i] = letra;
                acierto = true;
            }
        }
        
        if (!acierto) {
            this.errores++;
            this.intentosRestantes--;
        }
        
        const victoria = this.estadoPalabra.join('') === this.palabraSecreta;
        const juegoTerminado = this.intentosRestantes === 0 || victoria;
        
        return { acierto, juegoTerminado, victoria };
    }

    mostrarEstadoPalabra() {
        return this.estadoPalabra.join(' ');
    }

    verificarVictoria() {
        return this.estadoPalabra.join('') === this.palabraSecreta;
    }

    verificarDerrota() {
        return this.intentosRestantes === 0;
    }
}

// Variables globales para contadores
let contadorVictorias = parseInt(localStorage.getItem('contadorVictorias') || '0');
let contadorDerrotas = parseInt(localStorage.getItem('contadorDerrotas') || '0');

function actualizarContadores() {
    document.getElementById('contadorVictorias').textContent = contadorVictorias;
    document.getElementById('contadorDerrotas').textContent = contadorDerrotas;
    localStorage.setItem('contadorVictorias', contadorVictorias);
    localStorage.setItem('contadorDerrotas', contadorDerrotas);
}

// Confetti animation
function lanzarConfetti() {
    const colors = ['#f7ca18', '#27ae60', '#e74c3c', '#2980b9', '#f39c12', '#8e44ad'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-20px';
        piece.style.transform = `rotate(${Math.random()*360}deg)`;
        piece.style.animation = `confetti-fall 1.5s ${Math.random()}s linear forwards`;
        confetti.appendChild(piece);
    }
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
}

// Confetti keyframes
const style = document.createElement('style');
style.innerHTML = `@keyframes confetti-fall { to { top: 100vh; transform: translateY(100vh) rotate(360deg); } }`;
document.head.appendChild(style);

// Clase principal del juego
class AhorcadoGame {
    constructor() {
        this.ahorcadoService = new AhorcadoService();
        this.intentosHechos = 0;
        this.previosErrores = 0;
        this.juegoTerminado = false;
        this.victoria = false;
        this.reinicioTimeoutId = null;
        
        // Imágenes progresivas del ahorcado
        this.imagenesProgresivas = [
            "ahorcado/base.png",      // Primera imagen al primer error (0 errores)
            "ahorcado/cabeza.png",    // Error 1
            "ahorcado/cuerpo.png",    // Error 2
            "ahorcado/brazo1.png",    // Error 3
            "ahorcado/brazo2.png",    // Error 4
            "ahorcado/pierna1.png",   // Error 5
            "ahorcado/pierna2.png",   // Error 6
            "ahorcado/ojo1.png",      // Error 7
            "ahorcado/ojo2.png",      // Error 8
            "ahorcado/cuerpofinal.png" // Error 9 (mueca triste)
        ];

        this.inicializarElementos();
        this.iniciarJuego();
    }

    inicializarElementos() {
        // Elementos del DOM
        this.pistaElement = document.getElementById('pista');
        this.estadoPalabraElement = document.getElementById('estadoPalabra');
        this.intentosRestantesElement = document.getElementById('intentosRestantes');
        this.imagenAhorcadoElement = document.getElementById('imagenAhorcado');
        this.tecladoVirtualElement = document.getElementById('tecladoVirtual');
        this.reiniciarBtnElement = document.getElementById('reiniciarBtn');
        this.resultadoModalElement = document.getElementById('resultadoModal');
        this.modalTitleElement = document.getElementById('modalTitle');
        this.modalMensajeElement = document.getElementById('modalMensaje');
        this.jugarNuevoBtnElement = document.getElementById('jugarNuevoBtn');
        this.modalBackdropElement = document.getElementById('modalBackdrop');
        this.letrasUsadasElement = document.getElementById('letrasUsadas');
        this.inputFeedbackElement = document.getElementById('inputFeedback');
        this.verPistaBtnElement = document.getElementById('verPistaBtn');

        // Event listeners
        this.reiniciarBtnElement.addEventListener('click', () => this.reiniciarJuego());
        this.jugarNuevoBtnElement.addEventListener('click', () => this.reiniciarJuego());
        this.verPistaBtnElement.addEventListener('click', () => this.mostrarPistaPenalizando());
        // Permitir uso de teclado físico
        document.addEventListener('keydown', (e) => this.manejarTeclaFisica(e));
    }

    iniciarJuego() {
        this.ahorcadoService.iniciarJuego();
        this.juegoTerminado = false;
        this.victoria = false;
        this.intentosHechos = 0;
        this.previosErrores = 0;
        this.ahorcadoService.letrasAdivinadas = [];
        this.actualizarEstado();
        this.mostrarBuenaSuerte();
        this.ocultarModal();
        this.mostrarLetrasUsadas();
        this.inputFeedback('');
        this.generarTecladoVirtual();
        this.verPistaBtnElement.disabled = false;
        actualizarContadores();
    }

    generarTecladoVirtual() {
        if (!this.tecladoVirtualElement) return;
        const letras = [
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            'Á','É','Í','Ó','Ú','Ü'
        ];
        this.tecladoVirtualElement.innerHTML = '';
        letras.forEach(letra => {
            const btn = document.createElement('button');
            btn.textContent = letra;
            btn.className = 'btn btn-outline-primary m-1';
            btn.style.width = '38px';
            btn.style.padding = '6px';
            btn.disabled = this.ahorcadoService.letrasAdivinadas.includes(letra.toLowerCase()) || this.juegoTerminado;
            btn.setAttribute('data-letra', letra);
            btn.addEventListener('click', () => this.procesarLetraVirtual(letra));
            this.tecladoVirtualElement.appendChild(btn);
        });
    }

    procesarLetraVirtual(letra) {
        letra = letra.toLowerCase();
        if (this.juegoTerminado) return;
        if (!/^[a-záéíóúüñ]$/i.test(letra)) {
            this.inputFeedback('Por favor, ingresa una letra válida.');
            return;
        }
        if (this.ahorcadoService.letrasAdivinadas.includes(letra)) {
            this.inputFeedback('¡Ya usaste esa letra! Prueba con otra.');
            return;
        }
        this.inputFeedback('');
        this.ahorcadoService.letrasAdivinadas.push(letra);
        this.intentosHechos++;
        const resultado = this.ahorcadoService.procesarLetra(letra);
        this.mostrarEstadoPalabraAnimado(letra, resultado.acierto);
        this.mostrarLetrasUsadas();
        // Deshabilitar botón de la letra usada y aplicar clase
        const btn = this.tecladoVirtualElement.querySelector(`button[data-letra="${letra.toUpperCase()}"]`);
        if (btn) {
            btn.disabled = true;
            btn.classList.add(resultado.acierto ? 'acertada' : 'fallida');
        }
        const erroresActuales = this.ahorcadoService.errores;
        if (this.intentosHechos === 1) {
            this.imagenAhorcadoElement.src = this.imagenesProgresivas[0];
        }
        if (erroresActuales > this.previosErrores) {
            this.imagenAhorcadoElement.src = this.imagenesProgresivas[erroresActuales];
            this.previosErrores = erroresActuales;
        }
        if (resultado.juegoTerminado) {
            this.juegoTerminado = true;
            this.victoria = resultado.victoria;
            if (this.victoria) {
                contadorVictorias++;
                lanzarConfetti();
            } else {
                contadorDerrotas++;
            }
            actualizarContadores();
            const mensaje = resultado.victoria
                ? '¡Excelente! Has adivinado la palabra: ' + this.ahorcadoService.palabraSecreta + '. ¡Sigue aprendiendo psicología!'
                : 'No te desanimes. La palabra era: ' + this.ahorcadoService.palabraSecreta + '. ¡Inténtalo de nuevo!';
            this.imagenAhorcadoElement.src = this.victoria
                ? "ahorcado/VICTORIA.png"
                : "ahorcado/cuerpofinal.png";
            this.mostrarModal(resultado.victoria, mensaje);
            // Deshabilitar todo el teclado
            this.tecladoVirtualElement.querySelectorAll('button').forEach(b => b.disabled = true);
            // Reiniciar el juego automáticamente después de 2.5 segundos
            if (this.reinicioTimeoutId) clearTimeout(this.reinicioTimeoutId);
            this.reinicioTimeoutId = setTimeout(() => this.reiniciarJuego(), 2500);
        }
    }

    reiniciarJuego() {
        if (this.reinicioTimeoutId) {
            clearTimeout(this.reinicioTimeoutId);
            this.reinicioTimeoutId = null;
        }
        this.iniciarJuego();
        this.tecladoVirtualElement.querySelectorAll('button').forEach(b => b.disabled = false);
        this.ocultarModal();
        if (this.tecladoVirtualElement) {
            this.tecladoVirtualElement.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
        // Limpiar pista visual
        this.pistaElement.innerHTML = '';
        this.pistaElement.classList.remove('pista-visible');
    }

    actualizarEstado() {
        this.estadoPalabraElement.innerHTML = '';
        for (let i = 0; i < this.ahorcadoService.estadoPalabra.length; i++) {
            const span = document.createElement('span');
            span.textContent = this.ahorcadoService.estadoPalabra[i] === '_' ? '_' : this.ahorcadoService.estadoPalabra[i];
            this.estadoPalabraElement.appendChild(span);
        }
        this.intentosRestantesElement.textContent = this.ahorcadoService.intentosRestantes;
    }

    mostrarBuenaSuerte() {
        this.imagenAhorcadoElement.src = "ahorcado/BUENA-SUERTE!!.png";
    }

    mostrarModal(victoria, mensaje) {
        this.modalTitleElement.textContent = victoria ? '¡Victoria!' : 'Fin del Juego';
        this.modalMensajeElement.textContent = mensaje;
        // Icono
        this.resultadoModalElement.querySelector('#modalIcon').innerHTML = victoria ? '🎉' : '😢';
        // Palabra revelada si derrota
        this.resultadoModalElement.querySelector('#modalPalabraRevelada').textContent = victoria ? '' : 'Palabra: ' + this.ahorcadoService.palabraSecreta;
        this.resultadoModalElement.classList.add('show');
        this.modalBackdropElement.classList.add('show');
        this.resultadoModalElement.querySelector('.modal-content').classList.remove('victoria', 'derrota');
        this.resultadoModalElement.querySelector('.modal-content').classList.add(victoria ? 'victoria' : 'derrota');
    }

    ocultarModal() {
        this.resultadoModalElement.classList.remove('show');
        this.modalBackdropElement.classList.remove('show');
    }

    mostrarLetrasUsadas() {
        if (this.letrasUsadasElement) {
            this.letrasUsadasElement.textContent = this.ahorcadoService.letrasAdivinadas.join(', ');
        }
    }

    inputFeedback(msg) {
        if (this.inputFeedbackElement) {
            this.inputFeedbackElement.textContent = msg;
            this.inputFeedbackElement.style.color = msg ? '#e74c3c' : '#34495e';
        }
    }

    manejarTeclaFisica(event) {
        if (this.juegoTerminado) return;
        let letra = event.key;
        // Normalizar letras especiales
        if (letra.length === 1) {
            letra = letra.normalize('NFD').replace(/\p{Diacritic}/gu, '');
        }
        // Permitir letras a-z, ñ, áéíóúü
        if (/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]$/.test(letra)) {
            this.procesarLetraVirtual(letra);
        }
    }

    mostrarEstadoPalabraAnimado(letra, acierto) {
        // Renderiza la palabra con <span> por letra, resaltando la última jugada
        const estado = this.ahorcadoService.estadoPalabra;
        this.estadoPalabraElement.innerHTML = '';
        for (let i = 0; i < estado.length; i++) {
            const span = document.createElement('span');
            span.textContent = estado[i] === '_' ? '_' : estado[i];
            if (letra && this.ahorcadoService.palabraSecreta[i] === letra) {
                span.classList.add(acierto ? 'acertada' : 'fallida');
            }
            this.estadoPalabraElement.appendChild(span);
        }
    }

    mostrarPistaPenalizando() {
        if (this.juegoTerminado || this.verPistaBtnElement.disabled) return;
        this.pistaElement.innerHTML = `<span class='icono-pista'>💡</span>${this.ahorcadoService.pista}`;
        this.pistaElement.classList.add('pista-visible');
        this.ahorcadoService.intentosRestantes--;
        this.ahorcadoService.errores++;
        this.actualizarEstado();
        this.verPistaBtnElement.disabled = true;
        // Actualizar imagen del ahorcado
        this.imagenAhorcadoElement.src = this.imagenesProgresivas[this.ahorcadoService.errores];
        if (this.ahorcadoService.intentosRestantes <= 0) {
            this.juegoTerminado = true;
            contadorDerrotas++;
            actualizarContadores();
            this.mostrarModal(false, 'No te desanimes. La palabra era: ' + this.ahorcadoService.palabraSecreta + '. ¡Inténtalo de nuevo!');
            this.imagenAhorcadoElement.src = "ahorcado/cuerpofinal.png";
            this.tecladoVirtualElement.querySelectorAll('button').forEach(b => b.disabled = true);
            if (this.reinicioTimeoutId) clearTimeout(this.reinicioTimeoutId);
            this.reinicioTimeoutId = setTimeout(() => this.reiniciarJuego(), 2500);
        }
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadores();
    new AhorcadoGame();
}); 