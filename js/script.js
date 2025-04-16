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