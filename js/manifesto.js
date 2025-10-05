function toggleManifesto() {
  const content = document.getElementById('manifestoContent');
  const button = document.querySelector('.manifesto-expand-btn');
  const buttonText = button.querySelector('.btn-text');
  
  if (content.classList.contains('expanded')) {
    content.classList.remove('expanded');
    button.classList.remove('expanded');
    buttonText.textContent = 'Ler Manifesto Completo';
    
    // Smooth scroll para o topo da seção
    document.getElementById('manifesto').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    content.classList.add('expanded');
    button.classList.add('expanded');
    buttonText.textContent = 'Recolher Manifesto';
  }
}