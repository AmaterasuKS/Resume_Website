const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => observer.observe(el));

const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const max = Number(target.dataset.count || 0);
            let current = 0;
            const step = Math.max(1, Math.floor(max / 40));
            const timer = setInterval(() => {
                current += step;
                if (current >= max) {
                    current = max;
                    clearInterval(timer);
                }
                target.textContent = `${current}+`;
            }, 30);
            statObserver.unobserve(target);
        }
    });
});

document.querySelectorAll('.stat-value').forEach(stat => statObserver.observe(stat));

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const offset = section.offsetTop - 120;
        if (pageYOffset >= offset) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = contactForm.elements['name'].value;
        alert(`Thank you, ${name}! I will get back to you soon.`);
        contactForm.reset();
    });
}
