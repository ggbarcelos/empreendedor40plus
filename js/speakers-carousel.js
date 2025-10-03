/**
 * Sistema de Carrossel Aleatório para Palestrantes
 * Troca as posições das fotos dos palestrantes aleatoriamente a cada 10 segundos
 */

class SpeakersCarousel {
  constructor() {
    this.speakers = [
      {
        image: 'img/palestrantes/pedro_janot.jpeg',
        name: 'Pedro Janot',
        title: 'Especialista em Liderança'
      },
      {
        image: 'img/palestrantes/danielle_cosme.jpeg',
        name: 'Danielle Cosme',
        title: 'Especialista em Inovação'
      },
      {
        image: 'img/palestrantes/luciano_potter.jpeg',
        name: 'Luciano Potter',
        title: 'Especialista em Comunicação'
      },
      {
        image: 'img/palestrantes/rodrigo_sabiah.jpeg',
        name: 'Rodrigo Sabiah',
        title: 'Especialista em Impacto Social'
      },
      {
        image: 'img/palestrantes/alice_urbim.jpg',
        name: 'Alice Urbim',
        title: 'Especialista em Audiovisual'
      },
      {
        image: 'img/palestrantes/fatima_torri.jpeg',
        name: 'Fátima Torri',
        title: 'Especialista em Empreendedorismo'
      },
      {
        image: 'img/palestrantes/cesar_dias.jpeg',
        name: 'César Dias',
        title: 'Especialista em Jornalismo'
      },
      {
        image: 'img/palestrantes/fabio_bernardi.webp',
        name: 'Fabio Bernardi',
        title: 'Especialista em Criatividade'
      },
      {
        image: 'img/palestrantes/tulio_milman.jpeg',
        name: 'Tulio Milman',
        title: 'Especialista em Propósito'
      },
      {
        image: 'img/palestrantes/alexandre_maio.jpeg',
        name: 'Alexandre Maio',
        title: 'Especialista em IA & Games'
      },
      {
        image: 'img/palestrantes/jair_kobe.jpeg',
        name: 'Jair Kobe',
        title: 'Especialista em Humor'
      },
      {
        image: 'img/palestrantes/fabinho_vargas.png',
        name: 'Fabinho Vargas',
        title: 'Especialista em Empreendedorismo'
      },
      {
        image: 'img/palestrantes/cris_paz.jpeg',
        name: 'Cris Paz',
        title: 'Especialista em Longevidade'
      },
      {
        image: 'img/palestrantes/aod_cunha.jpg',
        name: 'Aod Cunha',
        title: 'Especialista em Finanças'
      },
      {
        image: 'img/palestrantes/michel_couto.jpeg',
        name: 'Michel Couto',
        title: 'Especialista em Periferia'
      },
      {
        image: 'img/palestrantes/andre_foresti.jpeg',
        name: 'André Foresti',
        title: 'Especialista em Inovação'
      },
      {
        image: 'img/palestrantes/vinicius_mendes.jpeg',
        name: 'Vinicius Mendes',
        title: 'Especialista em Inovação Social'
      }
    ];

    this.currentSpeakers = [...this.speakers];
    this.intervalId = null;
    this.isInitialized = false;
  }

  /**
   * Inicializa o carrossel
   */
  init() {
    if (this.isInitialized) return;

    // Aguarda o DOM estar completamente carregado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  /**
   * Inicia o sistema de rotação
   */
  start() {
    if (this.isInitialized) return;

    // Verifica se os elementos existem na página
    const speakersGrid = document.querySelector('.speakers-creative-grid');
    if (!speakersGrid) {
      console.warn('Grid de palestrantes não encontrado. Carrossel não será iniciado.');
      return;
    }

    this.isInitialized = true;
    console.log('🎯 Carrossel de palestrantes inicializado');

    // Faz a primeira troca após 10 segundos
    this.intervalId = setInterval(() => {
      this.shuffleSpeakers();
    }, 10000); // 10 segundos
  }

  /**
   * Embaralha e troca as posições dos palestrantes
   */
  shuffleSpeakers() {
    try {
      // Cria uma cópia embaralhada do array de palestrantes
      const shuffledSpeakers = this.shuffleArray([...this.speakers]);
      
      // Atualiza palestrante em destaque
      this.updateFeaturedSpeaker(shuffledSpeakers[0]);
      
      // Atualiza grid de palestrantes pequenos (agora 13 palestrantes)
      this.updateSmallSpeakers(shuffledSpeakers.slice(1, 14));
      
      // Atualiza palestrantes em círculo (agora 3 palestrantes)
      this.updateCircleSpeakers(shuffledSpeakers.slice(14, 17));

      console.log('🔄 Posições dos palestrantes alteradas');
      
    } catch (error) {
      console.error('Erro ao embaralhar palestrantes:', error);
    }
  }

  /**
   * Atualiza o palestrante em destaque
   */
  updateFeaturedSpeaker(speaker) {
    const featuredElement = document.querySelector('.speaker-featured');
    if (!featuredElement) return;

    const img = featuredElement.querySelector('img');
    const nameElement = featuredElement.querySelector('.speaker-name');
    const titleElement = featuredElement.querySelector('.speaker-title');

    if (img && nameElement && titleElement) {
      // Adiciona transição suave
      featuredElement.style.transition = 'opacity 0.5s ease-in-out';
      featuredElement.style.opacity = '0';

      setTimeout(() => {
        img.src = speaker.image;
        img.alt = speaker.name;
        nameElement.textContent = speaker.name;
        titleElement.textContent = speaker.title;
        featuredElement.style.opacity = '1';
      }, 250);
    }
  }

  /**
   * Atualiza os palestrantes pequenos
   */
  updateSmallSpeakers(speakers) {
    const smallSpeakers = document.querySelectorAll('.speaker-small');
    
    smallSpeakers.forEach((element, index) => {
      if (index < speakers.length) {
        const speaker = speakers[index];
        const img = element.querySelector('img');
        const nameElement = element.querySelector('.speaker-mini-info span');

        if (img && nameElement) {
          // Adiciona transição suave
          element.style.transition = 'opacity 0.5s ease-in-out';
          element.style.opacity = '0';

          setTimeout(() => {
            img.src = speaker.image;
            img.alt = speaker.name;
            nameElement.textContent = speaker.name;
            element.style.opacity = '1';
          }, 250 + (index * 50)); // Escalonamento da animação
        }
      }
    });
  }

  /**
   * Atualiza os palestrantes em círculo
   */
  updateCircleSpeakers(speakers) {
    const circleSpeakers = document.querySelectorAll('.circle-speaker');
    
    circleSpeakers.forEach((element, index) => {
      if (index < speakers.length) {
        const speaker = speakers[index];
        const img = element.querySelector('img');
        const tooltip = element.querySelector('.speaker-tooltip');

        if (img && tooltip) {
          // Adiciona transição suave
          element.style.transition = 'opacity 0.5s ease-in-out';
          element.style.opacity = '0';

          setTimeout(() => {
            img.src = speaker.image;
            img.alt = speaker.name;
            tooltip.textContent = speaker.name;
            element.setAttribute('data-name', speaker.name);
            element.style.opacity = '1';
          }, 300 + (index * 75)); // Escalonamento da animação
        }
      }
    });
  }

  /**
   * Embaralha um array usando o algoritmo Fisher-Yates
   */
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  /**
   * Para o carrossel
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('⏸️ Carrossel de palestrantes pausado');
    }
  }

  /**
   * Reinicia o carrossel
   */
  restart() {
    this.stop();
    this.isInitialized = false;
    this.start();
  }

  /**
   * Destroi o carrossel e limpa recursos
   */
  destroy() {
    this.stop();
    this.isInitialized = false;
    console.log('🗑️ Carrossel de palestrantes destruído');
  }
}

// Instância global do carrossel
const speakersCarousel = new SpeakersCarousel();

// Inicializa automaticamente quando o script é carregado
speakersCarousel.init();

// Expõe métodos globalmente para controle manual (opcional)
window.SpeakersCarousel = {
  start: () => speakersCarousel.start(),
  stop: () => speakersCarousel.stop(),
  restart: () => speakersCarousel.restart(),
  shuffleNow: () => speakersCarousel.shuffleSpeakers()
};