// main.js (Mantén el mismo código de la respuesta anterior)

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('mainMenu');
    const menuLinks = document.querySelectorAll('.menu-link a'); // Todos los enlaces del menú principal
    const submenuToggles = document.querySelectorAll('.submenu-toggle'); // Enlaces que abren submenús

    // Función para abrir/cerrar el menú principal (hamburguesa)
    const toggleMainMenu = () => {
        mainMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');

        const isExpanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        mainMenu.setAttribute('aria-hidden', !isExpanded);

        // Si el menú principal se cierra, asegurarse de que todos los submenús también se cierren
        if (!isExpanded) {
            closeAllSubmenus();
        }
    };

    // Función para cerrar todos los submenús
    const closeAllSubmenus = () => {
        document.querySelectorAll('.menu-link.has-submenu.active').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
            item.querySelector('.submenu').setAttribute('aria-hidden', 'true');
        });
    };

    // 1. Funcionalidad del botón de hamburguesa
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', toggleMainMenu);
    }

    // 2. Funcionalidad de los submenús (para móvil y accesibilidad en escritorio)
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Determinar si estamos en vista móvil (donde el menú-toggle está visible)
            const isMobileView = window.getComputedStyle(menuToggle).display !== 'none';

            if (isMobileView) {
                e.preventDefault(); // Prevenir navegación solo en móvil
                const parentMenuItem = toggle.closest('.menu-link');
                const submenu = parentMenuItem.querySelector('.submenu');

                // Cerrar otros submenús si están abiertos
                document.querySelectorAll('.menu-link.has-submenu.active').forEach(item => {
                    if (item !== parentMenuItem) {
                        item.classList.remove('active');
                        item.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
                        item.querySelector('.submenu').setAttribute('aria-hidden', 'true');
                    }
                });

                // Alternar la clase 'active' en el elemento padre (li.has-submenu)
                parentMenuItem.classList.toggle('active');

                // Accesibilidad: Actualizar aria-expanded y aria-hidden para el submenú
                const isExpanded = parentMenuItem.classList.contains('active');
                toggle.setAttribute('aria-expanded', isExpanded);
                submenu.setAttribute('aria-hidden', !isExpanded);
            }
        });

        // Evento para accesibilidad de teclado en escritorio (Enter/Space para abrir submenú)
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const isMobileView = window.getComputedStyle(menuToggle).display !== 'none';
                if (!isMobileView) { // Solo si NO estamos en vista móvil
                    e.preventDefault(); // Evita el scroll o el seguimiento del enlace
                    const parentMenuItem = toggle.closest('.menu-link');
                    const submenu = parentMenuItem.querySelector('.submenu');

                    // Alternar la clase 'active' (aunque el hover de CSS ya lo hace, esto asegura el estado para ARIA)
                    parentMenuItem.classList.toggle('active');

                    // Actualizar ARIA
                    const isExpanded = parentMenuItem.classList.contains('active');
                    toggle.setAttribute('aria-expanded', isExpanded);
                    submenu.setAttribute('aria-hidden', !isExpanded);

                    // Si el submenú se abrió, enfocar el primer elemento del submenú para accesibilidad
                    if (isExpanded) {
                        submenu.querySelector('a')?.focus();
                    }
                }
            }
        });
    });

    // 3. Cerrar el menú principal y submenús al hacer clic en un enlace (solo en móviles)
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const isMobileView = window.getComputedStyle(menuToggle).display !== 'none';
            if (isMobileView && mainMenu.classList.contains('active')) {
                setTimeout(() => {
                    toggleMainMenu();
                }, 100);
            }
        });
    });

    // 4. Cerrar el menú principal y submenús al hacer clic fuera (solo en móviles)
    document.addEventListener('click', (e) => {
        const isMobileView = window.getComputedStyle(menuToggle).display !== 'none';
        if (
            isMobileView &&
            mainMenu.classList.contains('active') &&
            !mainMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            toggleMainMenu();
            closeAllSubmenus();
        }
    });

    // 5. Cerrar el menú móvil y resetear submenús si se redimensiona a vista de escritorio
    let isMobileView = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
        const currentIsMobileView = window.innerWidth <= 768;
        if (isMobileView && !currentIsMobileView) {
            if (mainMenu.classList.contains('active')) {
                toggleMainMenu();
            }
            closeAllSubmenus();
        }
        isMobileView = currentIsMobileView;
    });

    // 6. Cerrar submenús al hacer clic fuera en DESKTOP (solo si no estás usando CSS :hover)
    document.addEventListener('click', (e) => {
        const isMobileView = window.getComputedStyle(menuToggle).display !== 'none';
        if (!isMobileView) { // Solo en vista de escritorio
            document.querySelectorAll('.menu-link.has-submenu.active').forEach(item => {
                if (!item.contains(e.target)) {
                    item.classList.remove('active');
                    item.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
                    item.querySelector('.submenu').setAttribute('aria-hidden', 'true');
                }
            });
        }
    });
});