document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation on scroll
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Unobserve after revealing
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Simple Navbar scroll effect
    const nav = document.querySelector('.nav-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = "1rem 40px";
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
        } else {
            nav.style.padding = "1.5rem 40px";
            nav.style.boxShadow = "none";
        }
    });

    // Stagger reveal for pillars if needed
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
});
