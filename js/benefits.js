/**
 * Benefits Section Animation
 * Uses IntersectionObserver for staggered fade-in animations
 */
document.addEventListener('DOMContentLoaded', () => {
    const benefitBlocks = document.querySelectorAll('.benefit-block');
    const footer = document.querySelector('.benefits-footer');
    
    const heroImage = document.querySelector('.benefit-hero-image');
    
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains('benefit-block')) {
                    const index = Array.from(benefitBlocks).indexOf(target);
                    setTimeout(() => {
                        target.classList.add('visible');
                    }, index * 150);
                } else if (target.classList.contains('benefit-hero-image')) {
                    target.classList.add('visible');
                } else if (target === footer) {
                    setTimeout(() => {
                        target.classList.add('visible');
                    }, (benefitBlocks.length + 1) * 150);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    benefitBlocks.forEach(block => observer.observe(block));
    if (heroImage) observer.observe(heroImage);
    if (footer) observer.observe(footer);
});
