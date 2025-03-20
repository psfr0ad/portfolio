/**
 * Portfolio BTS SIO - Script principal
 */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {

    // Animation de chargement
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    window.addEventListener('load', function () {
        // Supprime l'animation de chargement après le chargement complet
        setTimeout(function () {
            loader.style.opacity = '0';
            setTimeout(function () {
                loader.remove();
            }, 500);
        }, 500);
    });

    // Navigation active
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.navbar-nav .nav-link');

    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });

    // Bouton retour en haut
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Animation des éléments au scroll
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .veille-card');

    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();

            // Vérifier si l'élément est visible dans la fenêtre
            if (elementPosition.top < window.innerHeight - 100) {
                element.classList.add('animate-fade-in');
            }
        });
    }

    // Vérifier au chargement initial et au scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // Filtres pour les projets (page projets)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.getAttribute('data-category').includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Validation du formulaire de contact
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Vérification simple
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            // Validation de l'email
            const emailField = document.getElementById('email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                }
            }

            if (isValid) {
                // Afficher le message de succès
                document.getElementById('formSuccess').classList.remove('d-none');
                contactForm.reset();

                // Cacher le message après 5 secondes
                setTimeout(function () {
                    document.getElementById('formSuccess').classList.add('d-none');
                }, 5000);
            }
        });

        // Supprimer la classe is-invalid lors de la saisie
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function () {
                this.classList.remove('is-invalid');
            });
        });
    }

    // Animation de la barre de navigation au scroll
    const navbar = document.querySelector('#mainNav');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Effet de parallaxe simple pour les headers
    const parallaxHeaders = document.querySelectorAll('.hero-section, .veille-header, .projects-header, .contact-header');

    if (parallaxHeaders.length > 0) {
        window.addEventListener('scroll', function () {
            const scrollPosition = window.pageYOffset;

            parallaxHeaders.forEach(header => {
                // Créer un effet de parallaxe léger
                header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            });
        });
    }

    // Initialisation des tooltips Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (tooltipTriggerList.length > 0) {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Effet de compteur pour les statistiques (si présentes)
    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 16ms = ~60fps

            let current = 0;

            const updateCounter = () => {
                current += increment;

                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Déclencher l'animation lorsque l'élément entre dans la vue
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    }

    // Animation du texte avec Typed.js
    new Typed('.typed-text', {
        strings: [
            'Développeur Flutter',
            'Full Stack Developer',
            'Mobile App Developer',
            'Web Developer'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Initialisation AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}); 