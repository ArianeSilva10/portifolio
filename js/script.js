//  tema preferido
function getPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// funcao para aplicar o tema
function setTheme(theme) {
    if (theme === 'auto') {
        // se for auto, segue o sistema
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-bs-theme', theme);
}

// aplicar tema ao carregar
setTheme(getPreferredTheme());

// ouvir mudanças no sistema operacional
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const storedTheme = localStorage.getItem('theme');
    // só muda se não tiver um tema especifico selecionado
    if (!storedTheme || storedTheme === 'auto') {
        setTheme('auto');
    }
});

document.querySelectorAll('[data-bs-theme-value]').forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-bs-theme-value');
        localStorage.setItem('theme', theme);
        setTheme(theme);

        // atualizar estado dos botões
        document.querySelectorAll('[data-bs-theme-value]').forEach(el => {
            el.setAttribute('aria-pressed', 'false');
        });
        button.setAttribute('aria-pressed', 'true');
    });
    
    // marcar o botão ativo inicialmente
    const currentTheme = getPreferredTheme();
    if (button.getAttribute('data-bs-theme-value') === currentTheme) {
        button.setAttribute('aria-pressed', 'true');
    }
});

    // Fixed navbar on scroll
    const fixedNav = document.getElementById('fixedNav');
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > heroSection.offsetHeight - 100) {
        fixedNav.classList.remove('d-none');
      } else {
        fixedNav.classList.add('d-none');
      }
    });

    // Project Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add transition to project items
    projectItems.forEach(item => {
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });