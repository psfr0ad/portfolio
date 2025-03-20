document.addEventListener('DOMContentLoaded', function () {
    // Initialisation de AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true
    });

    // Initialisation de Typed.js
    new Typed('.typed-text', {
        strings: ['Développeur Web', 'Étudiant BTS SIO', 'Passionné d\'informatique'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Gestion de la navbar au scroll
    const navbar = document.querySelector('#mainNav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled', 'navbar-light', 'bg-white');
            navbar.classList.remove('navbar-dark', 'bg-transparent');
        } else {
            navbar.classList.remove('navbar-scrolled', 'navbar-light', 'bg-white');
            navbar.classList.add('navbar-dark', 'bg-transparent');
        }
    });

    // Animation des badges de compétences
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        badge.style.opacity = '0';
    });

    // Animation du texte avec Typed.js
    new Typed('.typed-text', {
        strings: [
            'Développeur Flutter',
            'Expert en Sécurité',
            'Développeur Full Stack',
            'Étudiant BTS SIO'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Animation au scroll avec AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}); 