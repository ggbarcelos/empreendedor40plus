const navbar = document.querySelector('.navbar');
let lastUpdate = 0;
let currentState = 'expanded';

function updateNavbar() {
  const now = Date.now();
  if (now - lastUpdate < 100) return;
  
  const scrollY = window.scrollY;
  
  if (currentState === 'expanded' && scrollY > 200) {
    navbar.classList.add('shrink');
    currentState = 'shrunk';
    lastUpdate = now;
  } else if (currentState === 'shrunk' && scrollY < 50) {
    navbar.classList.remove('shrink');
    currentState = 'expanded';
    lastUpdate = now;
  }
}

let throttleTimer = null;
window.addEventListener('scroll', () => {
  if (throttleTimer) return;
  
  throttleTimer = setTimeout(() => {
    updateNavbar();
    throttleTimer = null;
  }, 50);
});