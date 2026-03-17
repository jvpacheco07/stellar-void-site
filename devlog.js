document.addEventListener('DOMContentLoaded', () => {
  const lines = [
    "STELLAR VOID — REGISTO DE DESENVOLVIMENTO",
    "════════════════════════════════════════════",
    "[2024.11.24] - Commit inicial: recursos principais do jogo adicionados ao controlo de versões",
    "[2025.11.25] - Limpeza do repositório: removidas pastas duplicadas, referências obsoletas e ficheiro .yyp legado; .gitignore atualizado para backups/ficheiros temporários",
    "[2025.11.27] - feat: barras de vida implementadas; chefe Dravus integrado; sprite do botão R adicionado; compressão e optimização de áudio efetuadas",
    "[2025.12.01] - build: versão de teste publicada; volume de SFX e música reduzido em 90% em todos os assets",
    "[2025.12.03] - refactor: objetos obsoletos removidos; objecto Stages actualizado — Dravus pendente de QA",
    "[2025.12.07] - art: actualização completa das sprite sheets das entidades",
    "[2025.12.08] - rework: chefe MK1 — revisão de sprites e redesign dos padrões de waves",
    "[2025.12.09] - fix: melhorias no sistema de áudio e pipeline musical corrigida",
    "[2025.12.10] - fix: interpolação de movimento dos inimigos suavizada; bug no menu de opções resolvido (fecha #1); sistema de replay de fases activado",
    "[2025.12.11] - feat: sistema de guardar/carregar introduzido (fecha #9)",
    "[2025.12.13] - feat: camada narrativa/história completamente integrada",
    "[2025.12.15] - feat: mecânica de escudo ligada a MB_RIGHT; README.md iniciado; barra de estado do jogador actualizada; build estável taggeado",
    "",
    "════════════════════════════════════════════",
    "",
    "[2026.01.08] - refactor: pasta de inimigos reorganizada por fase; enemy_09 programado com lógica de projéctil (pendente de QA); obj_black_hole limpo — destruição de partículas e transições documentadas",
    "[2026.01.09] - feat: enemy_09 finalizado; controlador de spawn da Fase 3 iniciado; objectos de controller anotados com documentação inline",
    "[2026.01.11] - art: sprite do enemy_09 refinado e escalado para o ambiente da Fase 3",
    "[2026.01.12] - dev: sistema de projécteis do enemy_10 em desenvolvimento activo",
    "[2026.01.14] - dev: loop de gameplay do enemy_10 quase completo — pendente de testes ao vivo",
    "[2026.01.15] - feat: programação do enemy_10 concluída; gestor de waves da Fase 3 inicializado; indicador de pulso do power-up implementado",
    "[2026.01.19] - fix: pista de áudio da Fase 1 a reproduzir correctamente; grupo de áudio corrigido; toggle fullscreen ligado a F11; menu de selecção de fases inteligente lançado",
    "[2026.01.20] - revert: sequência de intro removida — qualidade abaixo do padrão Stellar Void",
    "[2026.01.25] - build: assets reestruturados para a apresentação PRÉ-PAP",
    "[2026.01.27] - feat: padrão de waves da Fase 3 concluído",
    "[2026.01.29] - art: background da Fase 3 concluído — chefe pendente",
    "[2026.01.31] - dev: sistema de batalha do chefe final iniciado",
    "",
    "════════════════════════════════════════════",
    "",
    "[2026.02.02] - feat: mecânica do triângulo de perigo programada; sistema de lasers dos inimigos inicializado; sprites do chefe final integrados (crédito: RubenSequeira26)",
    "[2026.02.05] - dev: iteração na lógica dos lasers dos inimigos — fase experimental",
    "[2026.02.09] - feat: inimigos passam a seguir o jogador no eixo Y; raios laser seguem o alvo; protótipo da sequência de intro commitado",
    "[2026.02.11] - polish: sequência de intro refinada com passes de detalhe e testes de transição",
    "[2026.02.13] - ui: animações do menu principal adicionadas — em desenvolvimento activo",
    "[2026.02.14] - ui: bug de escala dos botões do menu corrigido; sistema de textbox refeito; controlador de cutscene e objecto de câmara actualizados",
    "[2026.02.18] - feat: enemy_11 finalizado; pacotes Scribble integrados; objectos reconfigurados",
    "[2026.02.19] - feat: lógica do triângulo de perigo para enemy_11 completa; colisão de lasers operacional; sequência de intro funcional; efeito de blur na tela inicial adicionado",
    "[2026.02.20] - fix: queda de FPS na Fase 3 resolvida; câmara reajustada; transição da Fase 3 acelerada com efeito de zoom; objecto de perigo configurado para spawn único e posterior destruição; commit de teste da barra de jogador; código DEBUG actualizado",
    "[2026.02.23] - ux: transparência do jogador perto da HUD; passagem de polimento da HUD; ecrã de intro passível de skip via ESC",
    "[2026.02.24] - rework: cutscene da Fase 2 reconstruída do zero",
    "[2026.02.25] - feat: sub-fases do chefe e lógica de spawn do enemy_11 dentro do chefe iniciadas; feedback visual ao apanhar power-up de tiro implementado",
    "[2026.02.26] - balance: aumento do número de waves do enemy_11; velocidade vertical afinada",
    "[2026.02.27] - feat: transições de fase do chefe implementadas; passagem de tuning do comportamento do chefe",
    "[2026.02.28] - fix: logs de debug removidos; música do chefe ligada correctamente; gestor de waves da Fase 3 operacional; bug do textbox resolvido",
    "[2026.03.02] - balance: passagem de afinação de dificuldade da Fase 3",
    "[2026.03.03] - feat: gestor de waves da Fase 3 concluído — testes necessários; arte da barra de estado do jogador actualizada",
    "[2026.03.04] - feat: botão de deploy implementado com animação de progresso e estilização",
    "[2026.03.04] - feat: botão de deploy aprimorado com atualizações de status em tempo real e melhorias de estilização",
    "[2026.03.05] - feat: simulação de transmissão e terminal de devlog implementados com recursos interativos",
    "[2026.03.05] - feat: nomes e descrições de inimigos atualizados para experiência de jogo aprimorada; animação de campo estelar do herói adicionada",
    "[2026.03.05] - feat: HUD de briefing de missão e introdução de inimigos com efeito máquina de escrever adicionados; botão de reproduzir para vídeo do trailer implementado",
    "[2026.03.05] - feat: botão 'Carregar Tudo' adicionado aos controles do devlog para exibir todas as linhas de uma vez",
    "[2026.03.05] - art: gif do inimigo Winder adicionado",
    "[2026.03.09] - feat: cabeçalho da história do jogo removido e fechamento da seção corrigido; borda adicionada ao elemento caixa",
    "[2026.03.17] - art: gif do boss da terceira fase 53XX1 adicionado"
  ];

  const container = document.getElementById('terminal-content');
  const terminal = document.getElementById('devlog-terminal');
  const cursor = document.getElementById('terminal-cursor');
  let idx = 0;
  let charIdx = 0;
  let speed = 25; // ms per character
  let running = true;
  let autoScroll = true; // only auto-scroll when user hasn't scrolled up

  // detect manual scroll: if user scrolls up, pause auto-scroll
  terminal.addEventListener('scroll', () => {
    const atBottom = terminal.scrollHeight - terminal.scrollTop - terminal.clientHeight <= 40;
    autoScroll = atBottom;
  });

  function doAutoScroll() {
    if (!autoScroll) return;
    terminal.scrollTop = terminal.scrollHeight;
  }

  function typeNext() {
    if (!running) return;
    if (idx >= lines.length) {
      cursor.style.display = 'inline-block';
      doAutoScroll();
      return;
    }
    const line = lines[idx];
    if (charIdx < line.length) {
      container.textContent += line.charAt(charIdx);
      charIdx++;
      doAutoScroll();
      setTimeout(typeNext, speed + Math.random() * 40);
    } else {
      container.textContent += '\n';
      idx++; charIdx = 0;
      doAutoScroll();
      setTimeout(typeNext, 300 + Math.random() * 200);
    }
  }

  document.getElementById('devlog-replay').addEventListener('click', () => {
    container.textContent = '';
    idx = 0; charIdx = 0; running = true; autoScroll = true; speed = 25; typeNext();
  });
  document.getElementById('devlog-fast').addEventListener('click', () => { speed = Math.max(5, Math.floor(speed / 3)); });
  document.getElementById('devlog-load-all').addEventListener('click', () => {
    running = false;
    container.textContent = lines.join('\n');
    idx = lines.length;
    charIdx = 0;
    autoScroll = true;
    terminal.scrollTop = terminal.scrollHeight;
    cursor.style.display = 'inline-block';
  });

  // start
  cursor.style.display = 'inline-block';
  typeNext();
});
