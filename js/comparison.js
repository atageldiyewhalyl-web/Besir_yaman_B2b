document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.split-panel');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const comparisonObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, parseInt(delay));
                comparisonObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    panels.forEach(panel => {
        comparisonObserver.observe(panel);
    });
});
