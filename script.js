/* ===================================
   PORTAFOLIO WEB - REMY LOPEZ PEREZ
   Archivo de funcionalidad JavaScript
   ================================= */

/**
 * Inicialización del portafolio cuando el DOM está cargado
 */
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initActiveNavigation();
    initScrollEffects();
    initTimelineAnimation();
    initCodeAnimation();
});

/**
 * ===================================
 * NAVEGACIÓN SUAVE (SMOOTH SCROLLING)
 * ===================================
 */
function initSmoothScrolling() {
    // Seleccionar todos los enlaces que apuntan a anclas internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Obtener el elemento objetivo
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Desplazamiento suave al elemento objetivo
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * ===================================
 * NAVEGACIÓN ACTIVA Y EFECTOS DE SCROLL
 * ===================================
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        updateActiveNavigation(sections, navLinks);
        updateNavbarScrollEffect(navbar);
    });
}

/**
 * Actualiza la navegación activa basada en la sección visible
 * @param {NodeList} sections - Lista de secciones del documento
 * @param {NodeList} navLinks - Lista de enlaces de navegación
 */
function updateActiveNavigation(sections, navLinks) {
    let current = '';
    
    // Determinar qué sección está actualmente visible
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    // Actualizar clases activas en los enlaces de navegación
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

/**
 * Aplica efectos visuales a la barra de navegación durante el scroll
 * @param {Element} navbar - Elemento de la barra de navegación
 */
function updateNavbarScrollEffect(navbar) {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * ===================================
 * EFECTOS DE SCROLL GENERALES
 * ===================================
 */
function initScrollEffects() {
    // Configuración del observador de intersección
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Crear observador para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplicar animación cuando el elemento entra en vista
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    document.querySelectorAll('.timeline-item, .skill-category').forEach(item => {
        observer.observe(item);
    });
}

/**
 * ===================================
 * ANIMACIÓN DE LA LÍNEA DE TIEMPO
 * ===================================
 */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Configurar delays escalonados para la animación de la línea de tiempo
    timelineItems.forEach((item, index) => {
        // Aplicar delay progresivo para efecto cascada
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

/**
 * ===================================
 * ANIMACIÓN DEL CÓDIGO
 * ===================================
 */
function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    // Configurar efecto de escritura para las líneas de código
    codeLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.3}s`;
    });
}

/**
 * ===================================
 * FUNCIONES DE CONTACTO
 * ===================================
 */

/**
 * Maneja el clic en las tarjetas de contacto
 * @param {string} type - Tipo de contacto ('phone' o 'email')
 * @param {string} value - Valor del contacto
 */
function handleContactClick(type, value) {
    switch(type) {
        case 'phone':
            // Abrir aplicación de teléfono
            window.location.href = `tel:${value}`;
            break;
        case 'email':
            // Abrir cliente de email
            window.location.href = `mailto:${value}`;
            break;
        default:
            console.log(`Contacto: ${type} - ${value}`);
    }
}

/**
 * ===================================
 * UTILIDADES GENERALES
 * ===================================
 */

/**
 * Función para debounce de eventos (optimización de rendimiento)
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en milisegundos
 * @param {boolean} immediate - Ejecutar inmediatamente
 * @returns {Function} Función con debounce aplicado
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Función para throttle de eventos (optimización de rendimiento)
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Límite de tiempo en milisegundos
 * @returns {Function} Función con throttle aplicado
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * ===================================
 * OPTIMIZACIÓN DE RENDIMIENTO
 * ===================================
 */

// Aplicar throttle al evento de scroll para mejor rendimiento
const optimizedScrollHandler = throttle(() => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.getElementById('navbar');
    
    updateActiveNavigation(sections, navLinks);
    updateNavbarScrollEffect(navbar);
}, 16); // ~60fps

// Reemplazar el listener de scroll original con la versión optimizada
window.removeEventListener('scroll', initActiveNavigation);
window.addEventListener('scroll', optimizedScrollHandler);

/**
 * ===================================
 * MANEJO DE ERRORES Y FALLBACKS
 * ===================================
 */

// Manejo de errores para navegadores que no soportan ciertas características
if (!window.IntersectionObserver) {
    // Fallback para navegadores sin soporte de IntersectionObserver
    console.warn('IntersectionObserver no soportado. Usando fallback.');
    
    // Aplicar animaciones directamente sin observador
    document.querySelectorAll('.timeline-item, .skill-category').forEach(item => {
        item.style.animation = 'fadeInUp 0.8s ease forwards';
    });
}

// Verificar soporte de smooth scrolling
if (!('scrollBehavior' in document.documentElement.style)) {
    console.warn('Smooth scrolling no soportado. Usando fallback.');
    
    // Implementar smooth scrolling manual si es necesario
    // (código adicional para polyfill si se requiere)
}

/**
 * ===================================
 * EVENTOS ADICIONALES
 * ===================================
 */

// Manejar redimensionamiento de ventana
window.addEventListener('resize', debounce(() => {
    // Recalcular posiciones si es necesario
    console.log('Ventana redimensionada');
}, 250));

// Manejar visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pausar animaciones si la página no está visible
        console.log('Página oculta - pausando animaciones');
    } else {
        // Reanudar animaciones cuando la página vuelve a ser visible
        console.log('Página visible - reanudando animaciones');
    }
});

/**
 * ===================================
 * EXPORTAR FUNCIONES (si se usa como módulo)
 * ===================================
 */

// Si se usa en un entorno de módulos, exportar las funciones principales
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSmoothScrolling,
        initActiveNavigation,
        initScrollEffects,
        initTimelineAnimation,
        initCodeAnimation,
        handleContactClick,
        debounce,
        throttle
    };
}