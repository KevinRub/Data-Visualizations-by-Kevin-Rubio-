// ===== ANIMACIÓN DE ESTADÍSTICAS AL HACER SCROLL =====
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const isPercentage = text.includes('%');
                const isPlus = text.includes('+');
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(number)) {
                    animateNumber(el, number, isPercentage, isPlus);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
});

function animateNumber(el, target, isPercentage, isPlus) {
    let current = 0;
    const increment = Math.ceil(target / 40);
    const duration = 800;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        let display = current;
        if (isPercentage) display = display + '%';
        if (isPlus && !isPercentage) display = display + '+';
        el.textContent = display;
    }, stepTime);
}

// ===== SUAVIZAR SCROLL EN ENLACES INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('🚀 Data Visualizations by Kevin Rubio - Portfolio');