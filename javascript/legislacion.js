document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para la aparición de los temas ---
    const temas = document.querySelectorAll('.tema');
    temas.forEach((tema, index) => {
        const delay = index * 50; 
        setTimeout(() => {
            tema.classList.add('aparecer');
        }, delay);
    });

    // --- Lógica para los Popups ---

    // Selecciona todos los elementos que activarán un popup (los párrafos con la clase 'popup-trigger')
    const popupTriggers = document.querySelectorAll('.popup-trigger');

    // Itera sobre cada disparador y añade un listener para el clic
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            // Obtiene el ID del popup asociado a este disparador del atributo 'data-popup-target'
            const popupId = this.dataset.popupTarget;
            const popup = document.getElementById(popupId);

            if (popup) {
                popup.classList.add('active'); // Añade la clase 'active' para mostrar el popup
                document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
            }
        });
    });

    // Selecciona todos los botones de cerrar dentro de los popups
    const closeButtons = document.querySelectorAll('.close-button');

    // Itera sobre cada botón de cerrar y añade un listener para el clic
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Encuentra el 'popup-overlay' más cercano (su padre)
            const popup = this.closest('.popup-overlay');
            if (popup) {
                popup.classList.remove('active'); // Elimina la clase 'active' para ocultar el popup
                document.body.style.overflow = ''; // Restaura el scroll del fondo
            }
        });
    });

    // Cierra el popup al hacer clic fuera del contenido (en el overlay)
    document.querySelectorAll('.popup-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            // Si el clic ocurrió directamente en el overlay y no en su contenido
            if (event.target === this) {
                this.classList.remove('active'); // Oculta el popup
                document.body.style.overflow = ''; // Restaura el scroll del fondo
            }
        });
    });
});S