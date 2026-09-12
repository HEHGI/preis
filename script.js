/**
 * Engineering Research Slide Controller & Animation Driver
 */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const slideCounter = document.getElementById('slide-counter');
    const currentTitle = document.getElementById('current-slide-title');

    let currentIndex = 0;
    const totalSlides = slides.length;

    const slideTitles = [
        "1. Title & Abstract",
        "2. Research Objectives",
        "3. Experimental Variables",
        "4. Methodology & Flowchart",
        "5. Fishbone Problem Analysis",
        "6. Lean ECRS Framework",
        "7. Significance of Research",
        "8. Technical Strengths",
        "9. System Weaknesses",
        "10. Experimental Data & Charts",
        "11. Conclusion",
        "12. Q&A / Thank You"
    ];

    function updateSlide(index) {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });

        // Update Nav UI
        slideCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
        currentTitle.textContent = slideTitles[index] || '';

        // Button disabled states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalSlides - 1;
        prevBtn.style.opacity = index === 0 ? '0.5' : '1';
        nextBtn.style.opacity = index === totalSlides - 1 ? '0.5' : '1';
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlide(currentIndex);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide(currentIndex);
        }
    }

    // Toggle Fullscreen Presentation Mode
    function toggleFullscreen() {
        const elem = document.documentElement;
        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            }
            fullscreenBtn.textContent = "✕ Exit Fullscreen";
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            fullscreenBtn.textContent = "⛶ Fullscreen";
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard Shortcuts (Arrow Left, Arrow Right, Spacebar, F-key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleFullscreen();
        }
    });

    // Initialize slide deck
    updateSlide(0);
});