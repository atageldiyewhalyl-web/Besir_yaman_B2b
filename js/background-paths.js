document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.bg-paths-container');
    if (containers.length === 0) return;

    function createPaths(container, position) {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "floating-paths-svg");
        svg.setAttribute("viewBox", "0 0 696 316");
        svg.setAttribute("fill", "none");
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';

        // using darker color for the paths to match ken keiper scheme
        svg.style.color = 'rgba(29, 30, 35, 0.4)';

        // REDUCED: 12 paths instead of 36 to save CPU
        for (let i = 0; i < 12; i++) {
            const path = document.createElementNS(svgNS, "path");
            // Adjusted spacing (i * 15 instead of i * 5) to maintain visual density with fewer paths
            const d = `M-${380 - i * 15 * position} -${189 + i * 18}C-${
                380 - i * 15 * position
            } -${189 + i * 18} -${312 - i * 15 * position} ${216 - i * 18} ${
                152 - i * 15 * position
            } ${343 - i * 18}C${616 - i * 15 * position} ${470 - i * 18} ${
                684 - i * 15 * position
            } ${875 - i * 18} ${684 - i * 15 * position} ${875 - i * 18}`;
            
            path.setAttribute("d", d);
            path.setAttribute("stroke", "currentColor");
            path.setAttribute("stroke-width", 0.5 + i * 0.1);
            path.setAttribute("pathLength", "1");
            
            path.style.strokeOpacity = 0.05 + i * 0.05;
            
            const duration = 15 + Math.random() * 15;
            path.style.animation = `drawPath ${duration}s linear infinite`;
            
            svg.appendChild(path);
        }
        
        container.appendChild(svg);
    }

    // Intersection Observer to pause animations when not in view
    const pathObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const svg = entry.target.querySelector('svg');
            if (svg) {
                if (entry.isIntersecting) {
                    svg.style.display = 'block';
                } else {
                    svg.style.display = 'none'; // Completely stop rendering when hidden
                }
            }
        });
    }, { threshold: 0.01 });

    containers.forEach(container => {
        createPaths(container, 1);
        createPaths(container, -1);
        pathObserver.observe(container);
    });
});
