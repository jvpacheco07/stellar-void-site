// Sistema de efeito de máquina de escrever para a história do jogo
class TerminalTypewriter {
  constructor(elementSelector, options = {}) {
    this.element = document.querySelector(elementSelector);
    this.speed = options.speed || 30;
    this.lineDelay = options.lineDelay || 200;
    this.cursorVisible = true;
    this.isTyping = false;
    this.isPaused = false;

    if (this.element) {
      this.initTerminal();
    }
  }

  initTerminal() {
    // Criar estrutura do terminal
    this.terminal = document.createElement('div');
    this.terminal.className = 'terminal-window';

    const header = document.createElement('div');
    header.className = 'terminal-header';
    header.innerHTML = `
      <span class="terminal-title">STELLAR VOID HISTORY TERMINAL v3.14</span>
      <div class="terminal-buttons">
        <span class="terminal-button minimize" title="Minimizar"></span>
        <span class="terminal-button maximize" title="Maximizar"></span>
        <span class="terminal-button close" title="Fechar"></span>
      </div>
    `;

    const content = document.createElement('div');
    content.className = 'terminal-content';
    this.textDisplay = document.createElement('div');
    this.textDisplay.className = 'terminal-text';
    this.textDisplay.setAttribute('aria-live', 'polite');

    this.cursor = document.createElement('span');
    this.cursor.className = 'terminal-cursor';
    this.cursor.textContent = '█';

    content.appendChild(this.textDisplay);
    content.appendChild(this.cursor);

    this.terminal.appendChild(header);
    this.terminal.appendChild(content);

    // Substituir conteúdo original
    this.element.innerHTML = '';
    this.element.appendChild(this.terminal);

    // Iniciar animação do cursor
    this.startCursorAnimation();

    // Extrair e iniciar digitação
    this.startTyping();
  }

  startCursorAnimation() {
    setInterval(() => {
      this.cursorVisible = !this.cursorVisible;
      this.cursor.style.opacity = this.cursorVisible ? 1 : 0;
    }, 600);
  }

  async startTyping() {
    this.isTyping = true;

    // Introdução do terminal
    const intro = '> ACESSANDO ARQUIVO HISTÓRICO...\n> DECODIFICANDO DADOS...\n\n';
    await this.typeText(intro, 50);

    await this.delay(500);

    // Texto principal
    const mainText = `O ano é 3125.

A humanidade acreditou ter conquistado as estrelas.
A Federação Galáctica espalhou-se por dezenas de sistemas, cravando sua bandeira no vazio como se o universo lhe pertencesse.

Foi um erro.

Na sua arrogância, os humanos abriram um portal para aquilo que jamais deveriam ter tocado — o Vazio Estelar.
Uma fenda onde a luz é devorada… e o tempo se curva em silêncio.

E do silêncio… vieram eles.

Máquinas.

Não criadas.
Não comandadas.
Apenas inevitáveis.

Autodenominam-se Legião do Silício.
Não negociam.
Não hesitam.
Não sentem.

Seu propósito é absoluto: extinguir toda forma de vida biológica.

Planetas outrora vibrantes agora ecoam apenas o som metálico da conversão.
Oceanos evaporados.
Cidades transformadas em forjas.
A galáxia moldada em fábricas de guerra.

Os cientistas sussurram teorias — uma civilização antiga, inteligências artificiais esquecidas, deixadas à própria evolução… até ultrapassarem seus criadores.

Agora, elas retornam como juízes.

E você…

Você pilota o protótipo SV-01 — Stellar Vanguard — uma nave forjada com tecnologia extraída do próprio Vazio.
Uma arma construída a partir do inimigo.

Sua missão não é gloriosa.
Não é heroica.

É necessária.

Reconquistar os sistemas perdidos.
Penetrar o coração da escuridão.
Descobrir o que governa o Vazio.

E, se possível…

Sobreviver.`;

    await this.typeText(mainText, this.speed);

    // Finalização
    await this.delay(500);
    const outro = '\n\n> FIM DO ARQUIVO';
    await this.typeText(outro, 50);

    this.isTyping = false;
  }

  async typeText(text, speed) {
    const lines = text.split('\n');

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];

      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        if (this.isPaused) {
          await this.delay(100);
          charIndex--;
          continue;
        }

        this.textDisplay.textContent += line[charIndex];
        await this.delay(speed);
      }

      // Adicionar quebra de linha (exceto na última)
      if (lineIndex < lines.length - 1) {
        this.textDisplay.textContent += '\n';
        await this.delay(this.lineDelay);
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  clear() {
    this.textDisplay.textContent = '';
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }
}

// Inicializar quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
  const historySection = document.querySelector('section[aria-labelledby="sobre-historia"] p');
  
  if (historySection) {
    // Substituir o parágrafo pelo terminal
    const parent = historySection.parentElement;
    const placeholder = document.createElement('div');
    placeholder.id = 'history-terminal';
    parent.replaceChild(placeholder, historySection);

    // Inicializar o typewriter
    new TerminalTypewriter('#history-terminal');
  }
});
