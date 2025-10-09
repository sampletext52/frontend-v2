class ThemeToggle {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.html = document.documentElement;
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();

    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.bindEvents();
  }

  getStoredTheme() {
    return window.localStorage.getItem('theme');
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.html.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  bindEvents() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

function initThemeToggle() {
  new ThemeToggle();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
}
