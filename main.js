document.addEventListener('DOMContentLoaded', () => {
    // Form Handling
    const brevoForm = document.getElementById('brevo-form');
    const formSuccess = document.getElementById('form-success');

    if (brevoForm) {
        brevoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real Brevo integration, you would either:
            // 1. Let the form post to the Brevo URL (standard)
            // 2. Use fetch to send data to Brevo API via a backend
            
            // For this demo, we simulate success
            const submitBtn = brevoForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';
            
            setTimeout(() => {
                brevoForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Optional: Smooth scroll to top of form card
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
