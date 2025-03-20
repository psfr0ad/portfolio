document.addEventListener('DOMContentLoaded', function () {
    // Configuration de Particles.js avec des couleurs adaptées
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false,
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2
            }
        },
        interactivity: {
            detectsOn: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Animation du texte avec Typed.js
    new Typed('.typed-text', {
        strings: [
            'PHP et ses frameworks',
            'Laravel et Symfony',
            'les bonnes pratiques',
            'la sécurité web'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Initialisation des animations AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Configuration de la pagination
    const articlesPerPage = 6;
    let currentPage = 1;

    // Sélection des éléments
    const categoryButtons = document.querySelectorAll('.category-btn');
    const articles = document.querySelectorAll('.article-card');

    // Fonction de filtrage des articles
    function filterArticles(category) {
        const container = document.querySelector('.articles .row');

        articles.forEach(article => {
            const parent = article.parentElement;
            if (category === 'all' || article.dataset.category === category) {
                parent.style.display = 'block';
                article.classList.remove('hidden');
            } else {
                parent.style.display = 'none';
                article.classList.add('hidden');
            }
        });

        // Réinitialiser la pagination
        currentPage = 1;
        updatePagination();
        showPage(currentPage);
    }

    // Fonction pour afficher une page spécifique
    function showPage(pageNumber) {
        const visibleArticles = Array.from(articles).filter(article =>
            !article.classList.contains('hidden')
        ).map(article => article.parentElement);

        const start = (pageNumber - 1) * articlesPerPage;
        const end = start + articlesPerPage;

        visibleArticles.forEach((articleParent, index) => {
            if (index >= start && index < end) {
                articleParent.style.display = 'block';
            } else {
                articleParent.style.display = 'none';
            }
        });
    }

    // Fonction de mise à jour de la pagination
    function updatePagination() {
        const visibleArticles = Array.from(articles).filter(article =>
            !article.classList.contains('hidden')
        );
        const pageCount = Math.ceil(visibleArticles.length / articlesPerPage);
        const pagination = document.getElementById('pagination');

        pagination.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
            pagination.appendChild(li);
        }

        // Gestionnaire d'événements pour les liens de pagination
        pagination.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = parseInt(e.target.dataset.page);
                showPage(currentPage);

                pagination.querySelectorAll('.page-item').forEach(item => {
                    item.classList.remove('active');
                });
                e.target.parentElement.classList.add('active');
            });
        });
    }

    // Gestionnaire d'événements pour les boutons de catégorie
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');
            filterArticles(selectedCategory);
        });
    });

    // Initialisation
    updatePagination();
    showPage(currentPage);

    // Animation des cartes d'articles au scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    articles.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Ajout de Prism.js pour la coloration syntaxique du code
    document.querySelectorAll('pre code').forEach((block) => {
        Prism.highlightElement(block);
    });
});