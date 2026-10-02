/**
 * Ashenlight - Lógica de Interfaz y Comportamiento
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Control del Menú Móvil
    const mobileToggle = document.querySelector('.al-mobile-toggle');
    const navWrapper = document.querySelector('.al-nav-wrapper');

    if (mobileToggle && navWrapper) {
        mobileToggle.addEventListener('click', (e) => {
            const isOpen = navWrapper.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
            e.stopPropagation();
        });

        // Cerrar menú al hacer clic en un enlace de navegación
        document.querySelectorAll('.al-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navWrapper.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Cerrar al pulsar Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navWrapper.classList.contains('open')) {
                navWrapper.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Cerrar al hacer clic fuera del menú
        document.addEventListener('click', (e) => {
            if (!navWrapper.contains(e.target) && !mobileToggle.contains(e.target)) {
                navWrapper.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // 2. Gestión de Redes Sociales Verificadas
    // Si no hay URL configurada en ASHENLIGHT_CONFIG, se oculta el botón correspondiente
    if (typeof ASHENLIGHT_CONFIG !== 'undefined' && ASHENLIGHT_CONFIG.social) {
        const socialLinks = document.querySelectorAll('.al-social-link[data-network]');
        socialLinks.forEach(link => {
            const network = link.getAttribute('data-network');
            const url = ASHENLIGHT_CONFIG.social[network];
            if (!url || url.trim() === '') {
                link.style.display = 'none';
            } else {
                link.setAttribute('href', url);
            }
        });

        // Si todos los enlaces están vacíos, ocultar el contenedor de botones para evitar espacios vacíos
        const activeLinks = Array.from(socialLinks).filter(link => link.style.display !== 'none');
        const container = document.querySelector('.al-social-channels');
        if (container && activeLinks.length === 0) {
            container.style.display = 'none';
        }
    }

    // 3. Gestión de Enlaces de Compra Verificados
    const purchaseContainer = document.getElementById('purchaseActionContainer');
    if (purchaseContainer && purchaseContainer.children.length === 0 && typeof ASHENLIGHT_CONFIG !== 'undefined' && ASHENLIGHT_CONFIG.books && ASHENLIGHT_CONFIG.books[0]) {
        const book = ASHENLIGHT_CONFIG.books[0];
        const pageLang = document.documentElement.lang === 'en' ? 'en' : 'es';
        const spanishEdition = book.editions && book.editions.es;

        // Solo se muestra el botón de compra si existe una URL verificada en la configuración
        if (spanishEdition && spanishEdition.buyUrl && spanishEdition.buyUrl.trim() !== '') {
            const buyBtn = document.createElement('a');
            buyBtn.href = spanishEdition.buyUrl;
            buyBtn.target = '_blank';
            buyBtn.rel = 'noopener noreferrer';
            buyBtn.className = 'al-btn al-btn-amazon';
            
            if (pageLang === 'en') {
                buyBtn.innerHTML = '<i class="fa-brands fa-amazon"></i> Buy the Spanish edition on Amazon';
            } else {
                buyBtn.innerHTML = '<i class="fa-brands fa-amazon"></i> Comprar en Amazon';
            }
            purchaseContainer.appendChild(buyBtn);
            
            if (pageLang === 'es' && spanishEdition.buyNote) {
                const note = document.createElement('span');
                note.className = 'al-buy-note';
                note.textContent = spanishEdition.buyNote;
                purchaseContainer.appendChild(note);
            }
        }
    }

    // 4. Gestión del Fragmento de Lectura Autorizado
    const excerptSection = document.getElementById('reading-sample') || document.getElementById('fragmento-lectura');
    if (excerptSection && typeof ASHENLIGHT_CONFIG !== 'undefined' && ASHENLIGHT_CONFIG.books && ASHENLIGHT_CONFIG.books[0]) {
        const book = ASHENLIGHT_CONFIG.books[0];
        const pageLang = document.documentElement.lang === 'en' ? 'en' : 'es';
        
        if (book.excerpt && book.excerpt.hasExcerpt && book.excerpt.content && book.excerpt.content[pageLang]) {
            const container = excerptSection.querySelector('.al-excerpt-container');
            if (container) {
                container.innerHTML = book.excerpt.content[pageLang];
                excerptSection.style.display = 'block';
            }
        }
    }
});

