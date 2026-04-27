// Smooth, lightweight interactions for the synthwave portfolio.

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('[data-nav-links]');
  const typingTarget = document.querySelector('[data-typing]');
  const resumeButtons = document.querySelectorAll('[data-resume-download]');
  const contactForm = document.querySelector('.contact-form');
  const formStatus = document.querySelector('[data-form-status]');
  const revealItems = document.querySelectorAll('.reveal');
  const resumeFile = encodeURI('assets/Sakshi RESUME (1).pdf');

  const typingPhrases = [
    'responsive interfaces',
    'modern web apps',
    'intuitive product journeys'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeLoop = () => {
    const currentPhrase = typingPhrases[phraseIndex];
    const visibleText = currentPhrase.slice(0, charIndex);

    if (typingTarget) {
      typingTarget.textContent = visibleText;
    }

    if (!deleting && charIndex < currentPhrase.length) {
      charIndex += 1;
    } else if (deleting && charIndex > 0) {
      charIndex -= 1;
    } else {
      deleting = !deleting;
      if (!deleting) {
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      }
    }

    const delay = deleting ? 55 : 95;
    setTimeout(typeLoop, deleting && charIndex === 0 ? 700 : delay);
  };

  typeLoop();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));

  const triggerResumeDownload = () => {
    const anchor = document.createElement('a');

    anchor.href = resumeFile;
    anchor.download = 'Sakshi_Wadikar_Resume.pdf';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  resumeButtons.forEach((button) => {
    button.addEventListener('click', triggerResumeDownload);
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();

      if (formStatus) {
        formStatus.textContent = name
          ? `Thanks ${name}. Your message is ready to be sent.`
          : 'Thanks. Your message is ready to be sent.';
      }

      contactForm.reset();
    });
  }
});
