// Тема (светлая/тёмная)
const toggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    if (theme === 'light') {
        document.documentElement.style.setProperty('--bg', '#f8f9ff');
        document.documentElement.style.setProperty('--bg-soft', '#edf0ff');
        document.documentElement.style.setProperty('--card', '#ffffff');
        document.documentElement.style.setProperty('--text', '#0c1430');
        document.documentElement.style.setProperty('--muted', '#4e5876');
        document.documentElement.style.setProperty('--shadow', '0 10px 30px rgba(0,0,0,.08)');
    } else {
        document.documentElement.style.cssText = ''; // вернём тёмные значения из CSS
    }
}
applyTheme(savedTheme || (prefersDark ? 'dark' : 'dark'));

toggle?.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
    toggle.textContent = next === 'dark' ? '☾' : '☀';
});

// Кнопка «Наверх»
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
    toTop.style.display = window.scrollY > 500 ? 'inline-flex' : 'none';
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Даты
document.getElementById('year').textContent = new Date().getFullYear();
const fmt = new Intl.DateTimeFormat('ru', { month: 'long', year: 'numeric' });
document.getElementById('lastUpdated').textContent = fmt.format(new Date());

// Безопасность внешних ссылок (перестраховка)
document.querySelectorAll('a[target="_blank"]').forEach(a => {
    a.rel = 'noopener';
});
