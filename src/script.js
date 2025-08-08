console.log('script.js är laddad');
// script.js
document.addEventListener('DOMContentLoaded', () => {
    /* Smooth scrolling */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* Formulärhantering */
    const form = document.querySelector('.contact form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const { name, email, message } = form;
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            alert('Vänligen fyll i alla fält.');
            return;
        }
        alert(`Tack, ${name.value.trim()}! Vi återkommer till ${email.value.trim()} snart.`);
        form.reset();
    });

    /* Header-effekt vid scroll */
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
});


});
