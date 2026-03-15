document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.pain-points-section');
    const rows = document.querySelectorAll('.pain-row');
    const closing = document.querySelector('.pain-closing');

    if (!section || rows.length === 0) return;

    function updatePainStage() {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Is the section in the "sticky" zone?
        if (rect.top <= 0 && rect.bottom >= viewportHeight) {
            // Calculate progress through the section (0 to 1)
            const totalScrollable = sectionHeight - viewportHeight;
            const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
            
            // Adjust divisor for more dwell time and room for the closing section
            // A lower number here spreads the rows across less of the total scroll, 
            // but increasing the section height in CSS is what really slows it down.
            const activeThreshold = 0.8; 
            const rowProgress = progress / activeThreshold;
            
            // Use a small buffer to prevent flickering at the very edge of thresholds
            const activeIndex = Math.floor(rowProgress * rows.length);

            rows.forEach((row, index) => {
                row.classList.remove('active', 'past', 'upcoming');
                
                if (index === activeIndex && progress < activeThreshold) {
                    row.classList.add('active');
                } else if (index < activeIndex || progress >= activeThreshold) {
                    row.classList.add('past');
                } else {
                    row.classList.add('upcoming');
                }
            });

            // Show closing at the very end
            if (progress > 0.88) {
                closing.classList.add('visible');
            } else {
                closing.classList.remove('visible');
            }
        } 
else if (rect.top > 0) {
            // Before section: all are upcoming
            rows.forEach(row => {
                row.classList.remove('active', 'past');
                row.classList.add('upcoming');
            });
            closing.classList.remove('visible');
        } else if (rect.bottom < viewportHeight) {
            // After section: all are past
            rows.forEach(row => {
                row.classList.remove('active', 'upcoming');
                row.classList.add('past');
            });
            closing.classList.add('visible');
        }
    }

    // PERFORMANCE OPTIMIZATION: Use requestAnimationFrame for scroll events
    let isScrolling = false;

    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updatePainStage();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    // Only apply for desktop
    function init() {
        if (window.innerWidth > 992) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            updatePainStage(); // Init
        } else {
            // Ensure classes are cleared on mobile if user resized
            rows.forEach(row => {
                row.classList.remove('active', 'past', 'upcoming');
            });
            closing.classList.remove('visible');
        }
    }

    init();
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 992) {
            window.removeEventListener('scroll', handleScroll);
            rows.forEach(row => {
                row.classList.remove('active', 'past', 'upcoming');
            });
            closing.classList.remove('visible');
        } else {
            window.addEventListener('scroll', handleScroll, { passive: true });
            updatePainStage();
        }
    });
});
