// Dados dos inimigos do jogo Stellar Void
const ENEMIES_DATA = [
  {
    id: 'basic-machine',
    name: 'Basic MachineV.1',
    gif: 'media/gifs/basic_machine.gif',
    description: 'Unidade estática. Programa simples. Nunca falha.',
    life: 1,
    move: 'Estático',
    location: 'Fase 1',
    type: 'Ofensivo'
  },
  {
    id: 'kamikaze',
    name: 'Kamikaze2000',
    gif: 'media/gifs/kamikaze.gif',
    description: 'Surge silencioso e posiciona-se. Dispara 3 tiros na direção do jogador — depois não há regresso. Transforma-se num projétil e avança sem hesitar.',
    life: 3,
    move: 'Perseguição',
    location: 'Fase 1',
    type: 'Suicida'
  },
  {
    id: 'strong-machine',
    name: 'Strong Machine',
    gif: 'media/gifs/strong_machine.gif',
    description: 'Não recua, não persegue. Fica no seu posto e descarrega tudo o que tem — tiros direcionados, rajadas em leque. Quando termina, desaparece como se nunca tivesse estado lá.',
    life: 8,
    move: 'Estático',
    location: 'Fase 1',
    type: 'Defensivo'
  },
  {
    id: 'mk1',
    name: 'MK1',
    gif: 'media/gifs/mk1.gif',
    description: 'O primeiro guardião. Imóvel, implacável. Invoca reforços, satura o espaço de projéteis e acelera à medida que enfraquece. Destruí-lo não é o fim — é apenas o começo.',
    life: 80,
    move: 'Estático',
    location: 'Fase 1',
    type: 'Boss'
  },
  {
    id: 'warrior-x',
    name: 'Warrior X',
    gif: 'media/gifs/warrior_x.gif',
    description: 'Não precisa de se aproximar. Lança mísseis que te seguem controlando seus movimentos',
    life: 8,
    move: 'Estático',
    location: 'Fase 2',
    type: 'Controle'
  },
  {
    id: 'space-ranger',
    name: 'Space Ranger',
    gif: 'media/gifs/space_ranger.gif',
    description: 'Patrulha. Dispara. Repete. Além de ter alta movimentação.',
    life: 6,
    move: 'ZigZag',
    location: 'Fase 2',
    type: 'Ofensivo'
  },
  {
    id: 'operators',
    name: 'Operators',
    gif: 'media/gifs/operators.gif',
    description: 'Pequenos. Rápidos. Difíceis de acertar. Enquanto existirem, o Ovnimus recupera. Ignora-los é um erro',
    life: 3,
    move: 'Aleatória',
    location: 'Fase 2',
    type: 'Suporte'
  },
  {
    id: 'ovnimus',
    name: 'Ovnimus Mk2',
    gif: 'media/gifs/ovni.gif',
    description: 'Ninguém sabe o que há lá dentro. Sabe-se apenas que não para de invocar reforços — e que demora muito a cair.',
    life: 150,
    move: 'Aleatória',
    location: 'Fase 2',
    type: 'Boss'
  },
  {
    id: 'starlight',
    name: 'Starlight',
    gif: 'media/gifs/starlight.gif',
    description: 'Nasceu de uma estrela moribunda. Os cristais que dispara giram a velocidades impossíveis — bonitos à distância, letais de perto.',
    life: 5,
    move: 'Estático',
    location: 'Fase 3',
    type: 'Controle'
  },
  {
    id: 'icy-stoner',
    name: 'Stoner',
    gif: 'media/gifs/icy_stoner.gif',
    description: 'Prende-te. E enquanto não te moves, os outros tratam do resto.',
    life: 4,
    move: 'Estatico',
    location: 'Fase 3',
    type: 'Controle'
  },
  {
    id: 'icy-winder',
    name: 'Winder',
    gif: 'media/gifs/winder.gif',
    description: 'Perigo. Controla o espaço. Os seus lasers não te perseguem, obrigam-te a ir onde ele quer.',
    life: 6,
    move: 'Linear',
    location: 'Fase 3',
    type: 'Controle'
  },
  {
    id: 'stormbreaker',
    name: '53XX1',
    gif: 'media/gifs/stormbreaker.gif',
    description: 'A origem da Legião. Invoca tudo — lasers, cristais, reforços. Destruí-lo é acabar com a guerra',
    life: 200,
    move: 'Estático',
    location: 'Fase 3',
    type: 'Boss'
  }
];

// Função para inicializar a seção de inimigos
function initEnemiesSection() {
  const enemiesSection = document.querySelector('.sessao-inimigos');
  
  if (!enemiesSection) return;
  // Criar elemento de introdução (contador + texto com typing)
  const introWrapper = document.createElement('div');
  introWrapper.className = 'enemies-intro-wrapper';

  const counter = document.createElement('div');
  counter.className = 'enemy-counter';
  counter.textContent = `// ${ENEMIES_DATA.length} UNIDADES INIMIGAS IDENTIFICADAS`;

  const introText = document.createElement('div');
  introText.className = 'enemy-intro-text';
  introText.setAttribute('aria-live', 'polite');
  introWrapper.appendChild(counter);
  introWrapper.appendChild(introText);

  // Inserir intro antes da seção de botões
  enemiesSection.parentElement.insertBefore(introWrapper, enemiesSection);

  // Criar container para os botões
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'enemies-buttons-container';
  buttonsContainer.setAttribute('aria-label', 'Seleccione um inimigo para mais detalhes');
  
  // Criar botões para cada inimigo
  ENEMIES_DATA.forEach(enemy => {
    const button = document.createElement('button');
    button.className = 'enemy-button';
    button.type = 'button';
    button.textContent = enemy.name;
    button.setAttribute('data-enemy-id', enemy.id);
    button.addEventListener('click', () => showEnemyModal(enemy));
    
    buttonsContainer.appendChild(button);
  });

  // Limpar a ul e inserir botões no início
  const parentUl = enemiesSection.parentElement;
  parentUl.insertBefore(buttonsContainer, enemiesSection);

  // Iniciar typing introdutório
  const introString = 'Stellar Void possui uma gama de inimigos únicos, cada um com comportamentos e habilidades distintas.';
  typeWriter(introText, introString, 24).catch(() => {});

  // Criar modal (vai ser reutilizado para todos os inimigos)
  createEnemyModal();
}

// Simple typewriter used for small intro lines (returns a promise)
function typeWriter(targetElement, text, speed = 30) {
  return new Promise((resolve) => {
    let i = 0;
    targetElement.textContent = '';
    const timer = setInterval(() => {
      targetElement.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

// Função para criar o modal
function createEnemyModal() {
  const existingModal = document.getElementById('enemy-modal');
  if (existingModal) return; // Modal já existe

  const modal = document.createElement('div');
  modal.id = 'enemy-modal';
  modal.className = 'enemy-modal';
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');
  
  modal.innerHTML = `
    <div class="enemy-modal-content">
      <button class="enemy-modal-close" aria-label="Fechar">×</button>
      <div class="enemy-modal-body">
        <div class="enemy-modal-gif-container">
          <img id="enemy-modal-gif" src="" alt="Inimigo" class="enemy-modal-gif">
        </div>
        <div class="enemy-modal-info">
          <h2 id="enemy-modal-name"></h2>
          <p id="enemy-modal-description"></p>
          <div class="enemy-modal-stats">
            <div class="enemy-stat">
              <span class="stat-label">Vida:</span>
              <span class="stat-value" id="enemy-modal-life"></span>
            </div>
            <div class="enemy-stat">
              <span class="stat-label">Movimento:</span>
              <span class="stat-value" id="enemy-modal-move"></span>
            </div>
            <div class="enemy-stat">
              <span class="stat-label">Local:</span>
              <span class="stat-value" id="enemy-modal-location"></span>
            </div>
            <div class="enemy-stat">
              <span class="stat-label">Tipo:</span>
              <span class="stat-value" id="enemy-modal-type"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Event listeners do modal
  const closeBtn = modal.querySelector('.enemy-modal-close');
  closeBtn.addEventListener('click', closeEnemyModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeEnemyModal();
    }
  });

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeEnemyModal();
    }
  });
}

// Função para mostrar o modal com informações do inimigo
function showEnemyModal(enemy) {
  let modal = document.getElementById('enemy-modal');
  if (!modal) {
    createEnemyModal();
    modal = document.getElementById('enemy-modal');
  }

  const gifElement = document.getElementById('enemy-modal-gif');
  const nameElement = document.getElementById('enemy-modal-name');
  const descriptionElement = document.getElementById('enemy-modal-description');
  const lifeElement = document.getElementById('enemy-modal-life');
  const moveElement = document.getElementById('enemy-modal-move');
  const locationElement = document.getElementById('enemy-modal-location');
  const typeElement = document.getElementById('enemy-modal-type');

  if (!modal || !gifElement || !nameElement || !descriptionElement || !lifeElement || !moveElement || !locationElement || !typeElement) {
    return;
  }

  gifElement.src = enemy.gif;
  gifElement.alt = enemy.name;
  nameElement.textContent = enemy.name;
  descriptionElement.textContent = enemy.description;
  lifeElement.textContent = enemy.life;
  moveElement.textContent = enemy.move;
  locationElement.textContent = enemy.location;
  typeElement.textContent = enemy.type;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function closeEnemyModal() {
  const modal = document.getElementById('enemy-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initEnemiesSection);
