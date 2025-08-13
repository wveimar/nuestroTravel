// language-switcher.js
import translations from './translations.js';

class LanguageSwitcher {
  constructor() {
    this.currentLang = 'es';
    this.translateBtn = document.getElementById('translate-btn');
    this.init();
  }

  init() {
    this.loadLanguage();
    this.translateBtn.addEventListener('click', () => this.toggleLanguage());
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    this.applyTranslations();
    localStorage.setItem('preferredLanguage', this.currentLang);
  }

  applyTranslations() {
    const langData = translations[this.currentLang];
    
    // Actualizar elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
      const keys = el.dataset.translate.split('.');
      let value = langData;
      
      keys.forEach(key => {
        value = value[key];
      });

      if (el.tagName === 'INPUT') {
        el.placeholder = value;
      } else {
        el.innerHTML = value;
      }
    });

    // Elementos especiales (como el logo que contiene HTML)
    document.getElementById('nav-logo').innerHTML = langData.nav.logo;
    document.querySelector('.header__content h1').innerHTML = langData.header.title;
  }

  loadLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      this.currentLang = savedLang;
    }
    this.applyTranslations();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new LanguageSwitcher();
});