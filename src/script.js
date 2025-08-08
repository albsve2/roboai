// script.js
console.log('script.js är laddad');

document.addEventListener('DOMContentLoaded', () => {
    /* 1. SMOOTH SCROLLING (befintlig kod) */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* 2. HEADER-EFFEKT VID SCROLL (befintlig kod) */
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    /* 3. TYPEWRITER-EFFEKT I HERO-SECTION */
    const typeText = (el, text, delay = 100) => {
        let i = 0;
        el.textContent = '';
        const ticker = setInterval(() => {
            el.textContent += text[i++];
            if (i >= text.length) clearInterval(ticker);
        }, delay);
    };
    const heroHeading = document.querySelector('.hero h2');
    if (heroHeading) {
        typeText(heroHeading, heroHeading.textContent, 100);
    }

    /* 4. REVEAL ON SCROLL FÖR SEKCIONER */
    const reveals = document.querySelectorAll('.features, .about, .contact');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    reveals.forEach(sec => obs.observe(sec));

    /* 5. ANIMERADE COUNTERS */
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.dataset.target;
            const count = +counter.innerText;
            const inc = Math.ceil(target / 200);
            if (count < target) {
                counter.innerText = count + inc;
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        const cObs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCount();
                cObs.unobserve(counter);
            }
        }, { threshold: 1 });
        cObs.observe(counter);
    });

    /* 6. BACK TO TOP-BUTTON */
    const backBtn = document.createElement('button');
    backBtn.textContent = '↑';
    backBtn.className = 'back-to-top';
    document.body.append(backBtn);
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
        backBtn.classList.toggle('show', window.scrollY > 300);
    });

    /* 7. LJUS/MÖRK TEMA-VÄXLARE */
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙';
    themeToggle.className = 'theme-toggle';
    document.body.append(themeToggle);
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });
});
