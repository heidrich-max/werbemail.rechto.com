document.addEventListener('DOMContentLoaded', () => {
    // Form Handling - Pure HTML hidden iframe submit
    const customForm = document.getElementById('custom-form');
    if (customForm) {
        let isSubmitted = false;
        
        customForm.addEventListener('submit', () => {
            isSubmitted = true;
            
            // Update UI
            const submitBtn = customForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';
            
            // The browser natively posts the form data to the hidden iframe.
            // Since we can't reliably read cross-origin iframe load events in all browsers 
            // without errors, we simply wait 1.5 seconds and show success.
            // Brevo is very fast at processing standard POSTs.
            setTimeout(() => {
                if (isSubmitted) {
                    customForm.classList.add('hidden');
                    document.getElementById('custom-success').classList.remove('hidden');
                    
                    // Smooth scroll to top of form card
                    document.getElementById('custom-success').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 1500);
        });
    }

    // Scroll Reveal Animation (Simulated without external libs)
    const revealElements = document.querySelectorAll('.benefit-card, .trust__content, .trust__image, .section-header');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
