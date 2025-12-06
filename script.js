// ===== VARIABLES GLOBALES =====
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const currentYear = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');

// ===== MENÚ HAMBURGUESA =====
menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== BOTÓN VOLVER ARRIBA =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Actualizar enlace activo en navegación
    updateActiveNavLink();
});

// ===== ACTUALIZAR AÑO ACTUAL =====
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ===== ACTUALIZAR ENLACE ACTIVO EN NAVEGACIÓN =====
function updateActiveNavLink() {
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
function animateSkills() {
    const skillBars = document.querySelectorAll('.habilidad-progreso');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Ejecutar animación cuando la sección de habilidades es visible
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('habilidades');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===== FORMULARIO DE CONTACTO =====
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Simular envío (reemplazar con Formspree o emailJS)
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Aquí iría la lógica real de envío
        setTimeout(() => {
            alert('¡Mensaje enviado con éxito! Te responderé en menos de 24 horas.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio cargado correctamente');
    
    // Actualizar enlace activo al cargar
    updateActiveNavLink();
});

