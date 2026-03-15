document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.process-step');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, parseInt(delay));
                
                processObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    steps.forEach(step => {
        processObserver.observe(step);
    });
});
