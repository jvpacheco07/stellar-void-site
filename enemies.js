// Dados dos inimigos do jogo Stellar Void
const ENEMIES_DATA = [
  {
    id: 'basic-machine',
    name: 'Basic Machine',
    gif: 'media/gifs/basic_machine.gif',
    description: 'Inimigo simples que fica estático e dispara em uma única direção.'
  },
  {
    id: 'kamikaze',
    name: 'Kamikaze',
    gif: 'media/gifs/kamikaze.gif',
    description: 'Inimigo com IA básica de máquina de estados. Ele surge e move-se para uma posição aleatória. Ao chegar, entra num estado onde dispara 3 tiros (os tiros seguem a última direção do jogador). Depois, transforma-se num kamikaze e avança para a posição do jogador, sendo destruído ao atingir o alvo. Tem apenas 3 de vida e geralmente aparece em dupla.'
  },
  {
    id: 'strong-machine',
    name: 'Strong Machine',
    gif: 'media/gifs/strong_machine.gif',
    description: 'Funciona de forma semelhante ao Kamikaze, mas mantém-se estático e alterna entre 2 tipos de tiro: um que persegue o jogador e outro que dispara em 3 ângulos diferentes. Após atirar 3 vezes, foge da batalha. Tem 8 de vida — é um inimigo desafiante, mas balanceado.'
  },
  {
    id: 'mk1',
    name: 'MK1',
    gif: 'media/gifs/mk1.gif',
    description: 'É o chefe de Stellar Void. Fica estático no topo da tela e tem alta resistência. Possui 3 fases desafiadoras. 1ª fase: Atira projéteis na direção do jogador em 5 ângulos diferentes e pode invocar 2 Basic Machines. 2ª fase: Atira 10 projéteis com velocidade maior. 3ª fase: Atira 5 projéteis com menor intervalo entre disparos.'
  },
  {
    id: 'warrior-x',
    name: 'Warrior X',
    gif: 'media/gifs/warrior_x.gif',
    description: 'Segundo inimigo desenhado e animado pelo João Pacheco. Inimigo combatente, enfrenta-lo é um desafio para o jogador. Dispara 2 mísseis teleguiados com intervalo de 2 segundos. O player terá um feedback visual - um target que terá um som de mira ao alvo. Tem 8 de vida.'
  },
    {
    id: 'space-ranger',
    name: 'Space Ranger',
    gif: 'media/gifs/space_ranger.gif',
    description: 'Trata-se de um inimigo patrulhador. Dispara 2 projéteis que segue em linha reta. Se movimenta um pouco para a esquerda depois para direita. Tem 6 de vida — É um Basic Machine melhorado.'
  },
  {
    id: 'operators',
    name: 'Operators',
    gif: 'media/gifs/operators.gif',
    description: 'O Operator é o terceiro inimigo desenhado e animado por João Pacheco. Ele é invocado diretamente pelo OVNI, surgindo em combate como uma unidade ágil e difícil de atingir. Seu tamanho reduzido o torna um alvo desafiador, forçando o jogador a ajustar a mira e o tempo de disparo.'
  },
  {
    id: 'ovni',
    name: 'OVNI',
    gif: 'media/gifs/ovni.gif',
    description: 'Inspirado em ETS de marte, os OVNIS são máquinas desconhecidas, dizem que dentro delas habitam muitos inimigos. Ela irá escolher quem invocar - 4 operators, 2 space ranger ou 1 Warrior X. Essa máquina é um tanque que dura muito na batalha. Tem 150 pontos de vida.'
  },
  {
    id: 'starlight',
    name: 'Starlight',
    gif: 'media/gifs/starlight.gif',
    description: 'Inspirado em uma estrela, o Starlight é um inimigo que dispara cristais que giram em uma velocidade insana e caem em direção descendente.'
  },
   {
    id: 'icy-stoner',
    name: 'Stoner',
    gif: 'media/gifs/icy_stoner.gif',
    description: 'Stoner é um inimigo de controle, dispara pedras que prendem o jogador em um certo lugar por um tempo, restringindo seus movimentos. Ele é um inimigo que pode ser usado para criar situações de risco, onde o jogador precisa lidar com outros inimigos enquanto está preso.'
  },
   {
    id: 'icy-winder',
    name: 'winder',
    gif: 'media/gifs/winder.gif',
    description: 'Este inimigo é um controlador de área, ele dispara raios lasers que criam uma zona de perigo no campo de batalha. O jogador deve evitar essas áreas para não sofrer danos, o que adiciona um elemento estratégico ao combate.'
  },
   {
    id: 'stormbreaker',
    name: '53XX1',
    gif: 'media/gifs/stormbreaker.gif',
    description: 'Nave mãe? Invoca raios lasers, inimigos e cristais do espaço. Derrota-lo é vencer a legião. '
  }
];

// Função para inicializar a seção de inimigos
function initEnemiesSection() {
  const enemiesSection = document.querySelector('.sessao-inimigos');
  
  if (!enemiesSection) return;

  // Criar container para os botões
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'enemies-buttons-container';
  buttonsContainer.setAttribute('aria-label', 'Seleccione um inimigo para mais detalhes');
  
  // Criar botões para cada inimigo
  ENEMIES_DATA.forEach(enemy => {
    const button = document.createElement('button');
    button.className = 'enemy-button';
    button.textContent = enemy.name;
    button.setAttribute('data-enemy-id', enemy.id);
    button.addEventListener('click', () => showEnemyModal(enemy));
    
    buttonsContainer.appendChild(button);
  });

  // Limpar a ul e inserir botões no início
  const parentUl = enemiesSection.parentElement;
  parentUl.insertBefore(buttonsContainer, enemiesSection);

  // Criar modal (vai ser reutilizado para todos os inimigos)
  createEnemyModal();
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
  const modal = document.getElementById('enemy-modal');
  const gifElement = document.getElementById('enemy-modal-gif');
  const nameElement = document.getElementById('enemy-modal-name');
  const descriptionElement = document.getElementById('enemy-modal-description');

  gifElement.src = enemy.gif;
  gifElement.alt = enemy.name;
  nameElement.textContent = enemy.name;
  descriptionElement.textContent = enemy.description;

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
