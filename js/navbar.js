const navbar = document.querySelector('.navbar');
const body = document.body;
let isScrolling = false;
let scrollDirection = 'up';
let lastScrollY = 0;
let navbarState = 'expanded'; // 'expanded' ou 'shrunk'

// Configurações de threshold com hysteresis para evitar oscilação
const SHRINK_THRESHOLD = 150;  // Scroll para baixo para encolher
const EXPAND_THRESHOLD = 80;   // Scroll para cima para expandir
const SCROLL_DELTA_MIN = 5;    // Movimento mínimo para considerar scroll

function updateNavbarState() {
  const currentScrollY = window.pageYOffset;
  const scrollDelta = Math.abs(currentScrollY - lastScrollY);
  
  // Ignora movimentos muito pequenos para evitar tremulação
  if (scrollDelta < SCROLL_DELTA_MIN) {
    return;
  }
  
  // Determina direção do scroll
  scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  
  // Lógica com hysteresis para evitar oscilação
  if (navbarState === 'expanded' && currentScrollY > SHRINK_THRESHOLD && scrollDirection === 'down') {
    // Encolhe quando rola para baixo além do threshold
    navbar.classList.add('shrink');
    body.classList.add('navbar-shrunk');
    navbarState = 'shrunk';
  } else if (navbarState === 'shrunk' && currentScrollY < EXPAND_THRESHOLD && scrollDirection === 'up') {
    // Expande quando rola para cima abaixo do threshold
    navbar.classList.remove('shrink');
    body.classList.remove('navbar-shrunk');
    navbarState = 'expanded';
  }
  
  lastScrollY = currentScrollY;
}

// Throttle otimizado usando requestAnimationFrame
function throttledScrollHandler() {
  if (!isScrolling) {
    requestAnimationFrame(() => {
      updateNavbarState();
      isScrolling = false;
    });
    isScrolling = true;
  }
}

// Event listener com passive para melhor performance
window.addEventListener('scroll', throttledScrollHandler, { passive: true });

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  lastScrollY = window.pageYOffset;
  updateNavbarState();
});

// Tratamento especial para resize da janela
window.addEventListener('resize', () => {
  // Aguarda 100ms após resize para reajustar
  setTimeout(() => {
    lastScrollY = window.pageYOffset;
    updateNavbarState();
  }, 100);
}, { passive: true });