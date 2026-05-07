document.addEventListener('DOMContentLoaded', () => {
    // Form Handling
    const brevoForm = document.getElementById('brevo-form');
    const formSuccess = document.getElementById('form-success');

    if (brevoForm) {
        brevoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = brevoForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';
            
            const formData = new FormData(brevoForm);
            
            fetch(brevoForm.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Allows submitting the form data across domains without CORS issues
            }).then(() => {
                // Since mode is 'no-cors', we can't read the response properly.
                // We assume success if the fetch completes.
                brevoForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Optional: Smooth scroll to top of form card
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }).catch((error) => {
                console.error('Error submitting form:', error);
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                alert('Es gab einen Fehler bei der Anmeldung. Bitte versuchen Sie es später erneut.');
            });
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
