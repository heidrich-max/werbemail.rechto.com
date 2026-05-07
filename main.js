document.addEventListener('DOMContentLoaded', () => {
    // Form Handling - Proxy to hidden Brevo Form
    const customForm = document.getElementById('custom-form');
    if (customForm) {
        customForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Sync values to hidden Brevo form
            document.getElementById('EMAIL').value = document.getElementById('custom-email').value;
            document.getElementById('OPT_IN').checked = document.getElementById('custom-privacy').checked;
            
            // Trigger Brevo JS submission
            const brevoBtn = document.querySelector('#sib-form button[type="submit"]');
            if (brevoBtn) brevoBtn.click();
            
            // Update UI
            const submitBtn = customForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';
            
            // Poll for success or error from Brevo
            const checkStatus = setInterval(() => {
                const brevoSuccess = document.getElementById('success-message');
                const brevoError = document.getElementById('error-message');
                
                // Brevo changes inline display when active, or adds inner text
                if (brevoSuccess && brevoSuccess.style.display !== 'none' && !brevoSuccess.classList.contains('hidden')) {
                    clearInterval(checkStatus);
                    customForm.classList.add('hidden');
                    document.getElementById('custom-success').classList.remove('hidden');
                } else if (brevoError && brevoError.style.display !== 'none' && !brevoError.classList.contains('hidden')) {
                    clearInterval(checkStatus);
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'PDF jetzt anfordern';
                    document.getElementById('custom-error').classList.remove('hidden');
                }
            }, 500);
            
            // Timeout safety (10 seconds)
            setTimeout(() => clearInterval(checkStatus), 10000);
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
