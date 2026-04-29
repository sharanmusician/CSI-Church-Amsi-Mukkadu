/**
 * SANCTUARY CORE ENGINE v1.0
 * Focus: High-performance interactions, Real-time state, and Cinematic UX.
 */

class SanctuaryEngine {
    constructor() {
        this.state = {
            isLive: false,
            viewerCount: 0,
            theme: 'midnight'
        };
        
        this.init();
    }

    init() {
        console.log("⛪ Sanctuary Engine Initialized...");
        this.handleScrollAnimations();
        this.initLiveStatus();
        this.setupParallax();
        this.bindEvents();
    }

    /**
     * Reveal Elements on Scroll
     * High-end websites don't just show content; they 'introduce' it.
     */
    handleScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target); // Performance: only animate once
                }
            });
        }, observerOptions);

        // Apply to all cards and hero text
        document.querySelectorAll('.card, .hero-content').forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
            observer.observe(el);
        });
    }

    /**
     * Real-time Data Simulation
     * For 3Cr, the site should feel "Alive". This simulates checking 
     * a backend API for live service status.
     */
    async initLiveStatus() {
        // In production, this would be a WebSocket or fetch() to your AWS/GCP backend
        setInterval(() => {
            const now = new Date();
            const isSunday = now.getDay() === 0;
            const statusTag = document.querySelector('.hero-content span');
            
            if (isSunday) {
                statusTag.innerHTML = "• LIVE NOW";
                statusTag.style.color = "#ff4b2b"; // Alert Red for Live
            }
        }, 5000);
    }

    /**
     * Cinematic Parallax
     * Smoothly moves the background video at a different speed than the text.
     */
    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const video = document.querySelector('.hero-video-container video');
            if (video) {
                video.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    bindEvents() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Interactive "Give" Button Feedback
        const giveBtn = document.querySelector('.btn');
        if (giveBtn) {
            giveBtn.addEventListener('mousedown', () => giveBtn.style.transform = 'scale(0.95)');
            giveBtn.addEventListener('mouseup', () => giveBtn.style.transform = 'scale(1.05)');
        }
    }
}

// Launch the Engine
document.addEventListener('DOMContentLoaded', () => {
    window.App = new SanctuaryEngine();
});
