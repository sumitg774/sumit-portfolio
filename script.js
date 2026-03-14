/**
 * Sumit Kumar Gupta - Portfolio Interactivity Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Mobile Menu Toggle */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });

    /* 2. Sticky Navbar Styling */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(226, 232, 240, 0.85)'; // Frosted glass
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.15)';
            navbar.style.padding = '0.8rem 5%';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 5%'; // Larger padding at top
        }
    });

    /* 3. Typing Effect for Hero Subtitle */
    const typeWriterElement = document.querySelector('.typing-effect');
    const words = ['iOS Developer', 'Swift Enthusiast', 'Mobile Architect', 'UI/UX Builder'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
            typingSpeed = 50;
        } else {
            charIndex++;
            typingSpeed = 100;
        }

        typeWriterElement.innerText = currentWord.substring(0, charIndex);
        typeWriterElement.innerHTML += '<span class="cursor">|</span>';

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Initialize typing effect
    setTimeout(typeEffect, 1000);

    // CSS for cursor via JS injection for neatness
    const style = document.createElement('style');
    style.innerHTML = `
        .cursor {
            color: var(--accent-primary);
            animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
    `;
    document.head.appendChild(style);

    /* 4. Scroll Reveal Animations (Intersection Observer) */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.section-reveal');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
