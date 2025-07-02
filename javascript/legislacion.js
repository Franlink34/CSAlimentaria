document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para la aparición de los temas ---
    const temas = document.querySelectorAll('.tema');
    temas.forEach((tema, index) => {
        const delay = index * 40; 
        setTimeout(() => {
            tema.classList.add('aparecer');
        }, delay);
    });

    // --- Lógica para la aparición de los temas ---
    const temaservicios = document.querySelectorAll('.temaservicio');
    temaservicios.forEach((temaservicio, index) => {
        const delay = index * 40; 
        setTimeout(() => {
            temaservicio.classList.add('aparecer');
        }, delay);
    });
    
    // Objeto para almacenar los temporizadores de cada popup
    const popupTimers = {};
    const DURACION_POPUP = 20; // Duración en segundos para el cierre automático

    // --- Lógica para los Popups ---

    const popupTriggers = document.querySelectorAll('.popup-trigger');
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const popupId = this.dataset.popupTarget;
            const popup = document.getElementById(popupId);

            if (popup) {
                // Primero, limpia cualquier temporizador existente para este popup
                if (popupTimers[popupId]) {
                    clearInterval(popupTimers[popupId].intervalId);
                }

                popup.classList.add('active'); // Muestra el popup
                document.body.style.overflow = 'hidden'; // Evita el scroll del fondo

                // Inicia el contador para este popup
                iniciarContadorPopup(popupId);
            }
        });
    });

    // Función para iniciar el contador en un popup específico
    function iniciarContadorPopup(popupId) {
        let tiempoRestante = DURACION_POPUP;
        const contadorSpan = document.querySelector(`#${popupId} .contador-tiempo`);
        
        if (contadorSpan) {
            contadorSpan.textContent = tiempoRestante; // Muestra el tiempo inicial
            
            const intervalId = setInterval(() => {
                tiempoRestante--;
                contadorSpan.textContent = tiempoRestante;

                if (tiempoRestante <= 0) {
                    clearInterval(intervalId); // Detiene el contador
                    cerrarPopup(popupId); // Cierra el popup
                }
            }, 1000); // Actualiza cada 1 segundo (1000 ms)

            // Guarda el ID del intervalo y el tiempo restante para este popup
            popupTimers[popupId] = {
                intervalId: intervalId,
                tiempoRestante: tiempoRestante // Opcional, para llevar un registro
            };
        }
    }

    // Función modificada para cerrar un popup
    function cerrarPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove('active'); // Oculta el popup
            document.body.style.overflow = ''; // Restaura el scroll del fondo

            // Limpia el temporizador asociado a este popup si existe
            if (popupTimers[popupId]) {
                clearInterval(popupTimers[popupId].intervalId);
                delete popupTimers[popupId]; // Elimina la entrada del objeto
            }
        }
    }

    // Selecciona todos los botones de cerrar dentro de los popups
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Usa el atributo data-popup-id para cerrar el popup correcto
            const popupId = this.dataset.popupId;
            cerrarPopup(popupId); 
        });
    });

    // Cierra el popup al hacer clic fuera del contenido (en el overlay)
    document.querySelectorAll('.popup-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            if (event.target === this) {
                const popupId = this.id; // El ID del overlay es el ID del popup
                cerrarPopup(popupId); 
            }
        });
    });
});