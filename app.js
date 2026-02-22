/**
 * CV Srikarya Mandiri - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger to X (optional simple animation)
            const bars = menuToggle.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // 2. Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // 3. Update Active Link on Scroll
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for navbar height
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-links a[href*=' + sectionId + ']');

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // 4. Scroll Reveal Animations
    // Set up the Intersection Observer
    const revealElements = document.querySelectorAll('.about-content, .about-images, .info-content, .info-images, .service-card, .menu-item, .vm-box, .alasan-card, .layanan-row, .cakupan-card, .k3-text, .k3-images-container, .contact-info, .contact-form-wrapper');

    // Add initial fade-in class
    revealElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add staggered delay for lists like service cards or menu items
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 5. Update Footer Year dynamically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
