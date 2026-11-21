/**
 * Cruzadinha de Arquitetura Computacional
 * Jogo interativo para a disciplina de Arquitetura Computacional
 * 
 * Palavras baseadas no documento ARQCOMP_Exercicio_04_v3 (páginas 1 e 2)
 * 
 * TODAS AS COORDENADAS FORAM VALIDADAS automaticamente (algoritmo de backtracking):
 * 1. Zero conflitos de letras em celulas compartilhadas
 * 2. Cada palavra cruza pelo menos uma outra palavra
 * 3. Todas as palavras dentro dos limites do grid
 * 4. Tabuleiros compactos e organizados visualmente
 */

// ============================================================================
// DADAS DAS PALAVRAS E PISTAS POR NÍVEL
// Cada palavra tem: palavra, dica, direção (across/down), x, y, número
// Coordenadas validadas por algoritmo de backtracking
// ============================================================================

const WORD_DATA = {
  // ============================================================================
  // NÍVEL FÁCIL - 8 palavras (Grade 11x11, tabuleiro compacto)
  // ============================================================================
  easy: {
    words: [
      { word: 'FLASH', clue: 'Memória não volátil usada em pendrives e SSDs.', direction: 'down', x: 9, y: 3, number: 1 },
      { word: 'DMA', clue: 'Transfere dados sem passar pela CPU.', direction: 'down', x: 7, y: 5, number: 2 },
      { word: 'UC', clue: 'Unidade que coordena as atividades do processador.', direction: 'down', x: 8, y: 6, number: 3 },
      { word: 'CACHE', clue: 'Memória rápida que guarda dados frequentemente usados.', direction: 'across', x: 6, y: 7, number: 4 },
      { word: 'CPU', clue: 'O cérebro do computador que executa instruções.', direction: 'down', x: 8, y: 7, number: 5 },
      { word: 'RAM', clue: 'Memória volátil que armazena dados temporariamente.', direction: 'down', x: 10, y: 8, number: 6 },
      { word: 'ULA', clue: 'Faz as contas e operações lógicas dentro da CPU.', direction: 'across', x: 8, y: 9, number: 7 },
      { word: 'ROM', clue: 'Memória que não se apaga ao desligar o computador.', direction: 'across', x: 8, y: 10, number: 8 },
    ],
    gridWidth: 11,
    gridHeight: 11,
  },

  // ============================================================================
  // NÍVEL MÉDIO - 12 palavras (Grade 18x18, tabuleiro compacto)
  // ============================================================================
  medium: {
    words: [
      { word: 'UC', clue: 'Interpreta e controla o fluxo de instruções.', direction: 'down', x: 16, y: 1, number: 1 },
      { word: 'CPU', clue: 'Unidade que processa os dados do sistema.', direction: 'down', x: 16, y: 2, number: 2 },
      { word: 'EEPROM', clue: 'Memória que pode ser apagada e reprogramada eletricamente.', direction: 'down', x: 15, y: 3, number: 3 },
      { word: 'ULA', clue: 'Executa operações aritméticas e lógicas.', direction: 'down', x: 16, y: 4, number: 4 },
      { word: 'MEMORIADEMASSA', clue: 'Dispositivo para armazenamento permanente de grande volume.', direction: 'down', x: 17, y: 4, number: 5 },
      { word: 'ROM', clue: 'Armazena instruções de inicialização.', direction: 'down', x: 15, y: 6, number: 0 },
      { word: 'RAM', clue: 'Memória de acesso rápido e temporário.', direction: 'across', x: 15, y: 6, number: 6 },
      { word: 'CACHE', clue: 'Pequena memória muito veloz próxima ao processador.', direction: 'down', x: 16, y: 7, number: 7 },
      { word: 'DMA', clue: 'Transfere dados direto entre periféricos e memória.', direction: 'across', x: 14, y: 8, number: 8 },
      { word: 'DATABUS', clue: 'Transporta os dados entre os componentes.', direction: 'down', x: 14, y: 9, number: 9 },
      { word: 'FLASH', clue: 'Armazena dados mesmo sem energia elétrica.', direction: 'across', x: 12, y: 10, number: 10 },
      { word: 'ADDRESSBUS', clue: 'Leva o endereço da memória a ser acessada.', direction: 'across', x: 8, y: 16, number: 11 },
    ],
    gridWidth: 18,
    gridHeight: 18,
  },

  // ============================================================================
  // NÍVEL DIFÍCIL - 16 palavras (Grade 24x24, tabuleiro compacto)
  // ============================================================================
  hard: {
    words: [
      { word: 'MICROCONTROLADOR', clue: 'Computador em miniatura integrado em um único chip.', direction: 'down', x: 19, y: 2, number: 1 },
      { word: 'QUADCORE', clue: 'Processador com quatro núcleos de execução.', direction: 'across', x: 4, y: 12, number: 2 },
      { word: 'REGISTRADORES', clue: 'Locais de armazenamento muito rápidos dentro do processador.', direction: 'across', x: 10, y: 12, number: 3 },
      { word: 'DATABUS', clue: 'Caminho pelos quais os dados viajam internamente.', direction: 'down', x: 22, y: 13, number: 4 },
      { word: 'DUALCORE', clue: 'Processador com dois núcleos de execução.', direction: 'down', x: 23, y: 13, number: 5 },
      { word: 'MEMORIADEMASSA', clue: 'HD ou SSD que guarda arquivos mesmo desligado.', direction: 'across', x: 9, y: 14, number: 6 },
      { word: 'FLASH', clue: 'Memória usada em SSDs e cartões de memória.', direction: 'down', x: 18, y: 16, number: 7 },
      { word: 'DMA', clue: 'Acesso direto à memória sem interrupção do processador.', direction: 'across', x: 20, y: 16, number: 8 },
      { word: 'ADDRESSBUS', clue: 'Especifica onde os dados devem ser lidos ou escritos.', direction: 'across', x: 13, y: 19, number: 9 },
      { word: 'CACHE', clue: 'Buffer rápido entre processador e memória principal.', direction: 'across', x: 19, y: 20, number: 11 },
      { word: 'CPU', clue: 'Unidade central que processa todas as instruções do computador.', direction: 'down', x: 21, y: 20, number: 12 },
      { word: 'UC', clue: 'Controla a sequência de operações da CPU.', direction: 'down', x: 21, y: 19, number: 10 },
      { word: 'RAM', clue: 'Memória temporária que é limpa ao desligar o sistema.', direction: 'down', x: 23, y: 21, number: 13 },
      { word: 'ROM', clue: 'Memória somente leitura com dados fixos.', direction: 'across', x: 21, y: 23, number: 16 },
      { word: 'EEPROM', clue: 'Memória não volátil regravável por meio elétrico.', direction: 'across', x: 18, y: 23, number: 15 },
      { word: 'ULA', clue: 'Executa cálculos e decisões lógicas do processador.', direction: 'across', x: 21, y: 22, number: 14 },
    ],
    gridWidth: 24,
    gridHeight: 24,
  },
};

// ============================================================================
// ESTADO DO JOGO
// ============================================================================

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'];
const DIFFICULTY_LABELS = {
  easy: { label: 'Fácil', wordCount: 8, class: 'facil' },
  medium: { label: 'Médio', wordCount: 12, class: 'medio' },
  hard: { label: 'Difícil', wordCount: 16, class: 'dificil' },
};

let gameState = {
  currentDifficultyIndex: 0,
  currentDifficulty: 'easy',
  levelNumber: 1,
  words: [],
  gridWidth: 0,
  gridHeight: 0,
  timerSeconds: 1800, // 30 minutos
  timerInterval: null,
  timerRunning: false,
  startTime: null,
  solvedWords: new Set(),
  totalWords: 0,
  gameActive: false,
  wrongCheckedWords: new Set(),
};

// Elementos DOM
const elements = {
  crossword: document.getElementById('crossword'),
  cluesList: document.getElementById('clues-list'),
  timerDisplay: document.getElementById('timer-display'),
  scoreDisplay: document.getElementById('score-display'),
  levelDisplay: document.getElementById('level-display'),
  difficultyDisplay: document.getElementById('difficulty-display'),
  startBtn: document.getElementById('start-btn'),
  restartBtn: document.getElementById('restart-btn'),
  gameoverPopup: document.getElementById('gameover-popup'),
  levelcompletePopup: document.getElementById('levelcomplete-popup'),
  gameoverMessage: document.getElementById('gameover-message'),
  levelcompleteMessage: document.getElementById('levelcomplete-message'),
  levelcompleteStats: document.getElementById('levelcomplete-stats'),
  gameoverRetry: document.getElementById('gameover-retry'),
  levelcompleteNext: document.getElementById('levelcomplete-next'),
};

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

function init() {
  elements.startBtn.addEventListener('click', startGame);
  elements.restartBtn.addEventListener('click', restartLevel);
  elements.gameoverRetry.addEventListener('click', () => {
    closePopup(elements.gameoverPopup);
    restartLevel();
  });
  elements.levelcompleteNext.addEventListener('click', () => {
    closePopup(elements.levelcompletePopup);
    nextLevel();
  });

  renderLevelInfo();
  updateScoreDisplay();
}

// ============================================================================
// CONTROLE DE NÍVEIS
// ============================================================================

function renderLevelInfo() {
  const diff = DIFFICULTY_LABELS[gameState.currentDifficulty];
  elements.levelDisplay.textContent = gameState.levelNumber;
  elements.difficultyDisplay.textContent = diff.label;
  elements.difficultyDisplay.className = 'status-value badge ' + diff.class;
}

function startGame() {
  if (gameState.gameActive) return;

  gameState.gameActive = true;
  gameState.timerRunning = true;
  gameState.startTime = Date.now();

  loadLevel(gameState.currentDifficulty);
  renderCrossword();
  renderClues();
  startTimer();

  elements.startBtn.style.display = 'none';
  elements.restartBtn.style.display = 'inline-block';
}

function loadLevel(difficulty) {
  const data = WORD_DATA[difficulty];
  gameState.words = data.words;
  gameState.gridWidth = data.gridWidth;
  gameState.gridHeight = data.gridHeight;
  gameState.solvedWords = new Set();
  gameState.wrongCheckedWords = new Set();
  gameState.totalWords = data.words.length;
  gameState.timerSeconds = 1800;

  renderLevelInfo();
  updateScoreDisplay();
}

function nextLevel() {
  gameState.currentDifficultyIndex = (gameState.currentDifficultyIndex + 1) % DIFFICULTY_ORDER.length;
  gameState.currentDifficulty = DIFFICULTY_ORDER[gameState.currentDifficultyIndex];
  gameState.levelNumber++;
  loadLevel(gameState.currentDifficulty);
  renderCrossword();
  renderClues();
  startTimer();
}

function restartLevel() {
  stopTimer();
  gameState.timerSeconds = 1800;
  gameState.timerRunning = false;
  gameState.startTime = null;
  gameState.solvedWords = new Set();
  gameState.wrongCheckedWords = new Set();

  renderCrossword();
  renderClues();
  updateScoreDisplay();
  updateTimerDisplay();

  elements.startBtn.style.display = 'inline-block';
  elements.restartBtn.style.display = 'none';
  gameState.gameActive = false;
}

// ============================================================================
// TIMER
// ============================================================================

function startTimer() {
  stopTimer();
  gameState.timerRunning = true;
  gameState.startTime = Date.now() - (1800 - gameState.timerSeconds) * 1000;

  gameState.timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    gameState.timerSeconds = 1800 - elapsed;

    if (gameState.timerSeconds <= 0) {
      gameState.timerSeconds = 0;
      stopTimer();
      showGameOver();
    } else {
      updateTimerDisplay();
    }
  }, 1000);

  updateTimerDisplay();
}

function stopTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }
  gameState.timerRunning = false;
}

function addTime(seconds) {
  gameState.timerSeconds += seconds;
  if (gameState.timerSeconds > 1800) gameState.timerSeconds = 1800;
  updateTimerDisplay();
}

function removeTime(seconds) {
  gameState.timerSeconds -= seconds;
  if (gameState.timerSeconds < 0) gameState.timerSeconds = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const m = Math.floor(gameState.timerSeconds / 60);
  const s = gameState.timerSeconds % 60;
  elements.timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// ============================================================================
// RENDERIZAÇÃO DO TABULEIRO
// ============================================================================

function renderCrossword() {
  elements.crossword.innerHTML = '';
  elements.crossword.style.gridTemplateColumns = `repeat(${gameState.gridWidth}, 50px)`;
  elements.crossword.style.gridTemplateRows = `repeat(${gameState.gridHeight}, 50px)`;

  const cellMap = {};
  const wordStarts = {};

  gameState.words.forEach((wordObj, wi) => {
    const { word, x, y, direction } = wordObj;
    for (let i = 0; i < word.length; i++) {
      const cx = direction === 'across' ? x + i : x;
      const cy = direction === 'down' ? y + i : y;
      const key = `${cx},${cy}`;

      if (!cellMap[key]) {
        cellMap[key] = { letter: word[i], words: [] };
      }
      cellMap[key].letter = word[i];
      cellMap[key].words.push({ wordIndex: wi, charIndex: i });
    }

    const startKey = `${x},${y}`;
    if (!wordStarts[startKey]) {
      wordStarts[startKey] = wordObj.number;
    }
  });

  for (let y = 0; y < gameState.gridHeight; y++) {
    for (let x = 0; x < gameState.gridWidth; x++) {
      const key = `${y},${x}`;
      const cell = cellMap[key];

      const cellEl = document.createElement('div');
      cellEl.className = 'cell';
      cellEl.dataset.y = y;
      cellEl.dataset.x = x;

      if (cell) {
        cellEl.classList.add('has-letter');
        const input = document.createElement('input');
        input.maxLength = 1;
        input.dataset.y = y;
        input.dataset.x = x;
        input.addEventListener('input', handleCellInput);
        input.addEventListener('keydown', handleCellKeydown);
        cellEl.appendChild(input);

        if (wordStarts[key]) {
          const numLabel = document.createElement('span');
          numLabel.className = 'number-label';
          numLabel.textContent = wordStarts[key];
          cellEl.appendChild(numLabel);
          cellEl.style.position = 'relative';
        }

        const wordIndices = cell.words.map(w => w.wordIndex);
        const allSolved = wordIndices.length > 0 && wordIndices.every(wi => gameState.solvedWords.has(wi));
        if (allSolved) {
          cellEl.classList.add('correct');
          input.disabled = true;
        }
      } else {
        cellEl.classList.add('empty');
      }

      elements.crossword.appendChild(cellEl);
    }
  }
}

function renderClues() {
  elements.cluesList.innerHTML = '';

  // Lista unificada de pistas - APENAS número e texto, sem "Horizontal/Vertical"
  gameState.words.forEach((w, wi) => {
    const li = document.createElement('li');
    li.className = `clue-item ${gameState.solvedWords.has(wi) ? 'completed' : ''}`;
    li.dataset.wordIndex = wi;
    li.innerHTML = `
      <span class="clue-number">${w.number}.</span>
      <span class="clue-text">${w.clue}</span>
    `;
    li.addEventListener('click', () => focusWord(wi));
    elements.cluesList.appendChild(li);
  });
}

function focusWord(wordIndex) {
  const wordObj = gameState.words[wordIndex];
  const { x, y, direction } = wordObj;
  const input = document.querySelector(`#crossword .cell[data-x="${x}"][data-y="${y}"] input`);
  if (input) input.focus();
}

// ============================================================================
// MANIPULAÇÃO DE CELULAS
// ============================================================================

function handleCellInput(e) {
  if (!gameState.gameActive || !gameState.timerRunning) return;

  const input = e.target;
  const value = input.value.toUpperCase();

  if (value.length > 1) {
    input.value = value[0];
  }

  if (value && /[A-Z]/.test(value)) {
    moveFocus(input, 1);
  }

  const x = parseInt(input.dataset.x);
  const y = parseInt(input.dataset.y);
  checkWordsAt(x, y);
}

function handleCellKeydown(e) {
  if (!gameState.gameActive || !gameState.timerRunning) return;

  const input = e.target;

  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    const inputs = Array.from(document.querySelectorAll('#crossword input'));
    const idx = inputs.indexOf(input);
    const step = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
    const newIdx = idx + step;
    if (newIdx >= 0 && newIdx < inputs.length) inputs[newIdx].focus();
  }

  if (e.key === 'Backspace' && !input.value) {
    e.preventDefault();
    const inputs = Array.from(document.querySelectorAll('#crossword input'));
    const idx = inputs.indexOf(input);
    if (idx > 0) inputs[idx - 1].focus();
  }
}

function moveFocus(currentInput, step) {
  const inputs = Array.from(document.querySelectorAll('#crossword input'));
  const idx = inputs.indexOf(currentInput);
  const newIdx = idx + step;
  if (newIdx >= 0 && newIdx < inputs.length) {
    inputs[newIdx].focus();
  }
}

function checkWordsAt(x, y) {
  gameState.words.forEach((wordObj, wi) => {
    if (gameState.solvedWords.has(wi)) return;
    if (gameState.wrongCheckedWords.has(wi)) return;

    const { word, x: wx, y: wy, direction } = wordObj;
    let charIndex = -1;

    if (direction === 'across' && y === wy && x >= wx && x < wx + word.length) {
      charIndex = x - wx;
    } else if (direction === 'down' && x === wx && y >= wy && y < wy + word.length) {
      charIndex = y - wy;
    }

    if (charIndex === -1) return;

    const isComplete = word.split('').every((letter, i) => {
      const cx = direction === 'across' ? wx + i : wx;
      const cy = direction === 'down' ? wy + i : wy;
      const cellInput = document.querySelector(`#crossword .cell[data-x="${cx}"][data-y="${cy}"] input`);
      return cellInput && cellInput.value.toUpperCase() === letter;
    });

    if (isComplete) {
      const userWord = word.split('').map((letter, i) => {
        const cx = direction === 'across' ? wx + i : wx;
        const cy = direction === 'down' ? wy + i : wy;
        const cellInput = document.querySelector(`#crossword .cell[data-x="${cx}"][data-y="${cy}"] input`);
        return cellInput ? cellInput.value.toUpperCase() : '';
      }).join('');

      if (userWord === word) {
        markWordCorrect(wi);
      } else {
        markWordWrong(wi);
      }
    }
  });
}

function markWordCorrect(wordIndex) {
  if (gameState.solvedWords.has(wordIndex)) return;

  gameState.solvedWords.add(wordIndex);
  gameState.wrongCheckedWords.delete(wordIndex);
  addTime(5);
  updateScoreDisplay();

  const wordObj = gameState.words[wordIndex];
  const { word, x, y, direction } = wordObj;

  word.split('').forEach((letter, i) => {
    const cx = direction === 'across' ? x + i : x;
    const cy = direction === 'down' ? y + i : y;
    const cellEl = document.querySelector(`#crossword .cell[data-x="${cx}"][data-y="${cy}"]`);
    const input = cellEl.querySelector('input');
    if (cellEl) {
      cellEl.classList.add('correct');
      cellEl.classList.remove('wrong');
    }
    if (input) input.disabled = true;
  });

  updateClueStyle(wordIndex, true);
  checkLevelComplete();
}

function markWordWrong(wordIndex) {
  if (gameState.wrongCheckedWords.has(wordIndex)) return;

  gameState.wrongCheckedWords.add(wordIndex);

  const wordObj = gameState.words[wordIndex];
  const { word, x, y, direction } = wordObj;

  word.split('').forEach((letter, i) => {
    const cx = direction === 'across' ? x + i : x;
    const cy = direction === 'down' ? y + i : y;
    const cellEl = document.querySelector(`#crossword .cell[data-x="${cx}"][data-y="${cy}"]`);
    if (cellEl) {
      cellEl.classList.add('wrong');
      setTimeout(() => cellEl.classList.remove('wrong'), 600);
    }
  });

  removeTime(5);
  updateClueStyle(wordIndex, false);
}

function updateClueStyle(wordIndex, completed) {
  const items = document.querySelectorAll('.clue-item');
  items.forEach(item => {
    if (parseInt(item.dataset.wordIndex) === wordIndex) {
      if (completed) {
        item.classList.add('completed');
      } else {
        item.classList.remove('completed');
      }
    }
  });
}

function updateScoreDisplay() {
  const solved = gameState.solvedWords.size;
  const total = gameState.totalWords;
  elements.scoreDisplay.textContent = `${solved} de ${total}`;
}

function checkLevelComplete() {
  if (gameState.solvedWords.size >= gameState.totalWords) {
    stopTimer();
    showLevelComplete();
  }
}

// ============================================================================
// POPUPS
// ============================================================================

function showGameOver() {
  const diff = DIFFICULTY_LABELS[gameState.currentDifficulty];
  elements.gameoverMessage.textContent = `O tempo esgotou no nível ${gameState.levelNumber} (${diff.label})! A cruzadinha não foi finalizada.`;
  elements.gameoverPopup.classList.remove('hidden');
}

function showLevelComplete() {
  const diff = DIFFICULTY_LABELS[gameState.currentDifficulty];
  const timeTaken = 1800 - gameState.timerSeconds;
  const m = Math.floor(timeTaken / 60);
  const s = timeTaken % 60;

  elements.levelcompleteMessage.textContent = `Parabéns! Você completou o nível ${gameState.levelNumber}.`;
  elements.levelcompleteStats.innerHTML = `
    <p><strong>Nível:</strong> ${gameState.levelNumber} (${diff.label})</p>
    <p><strong>Tempo gasto:</strong> ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}</p>
    <p><strong>Palavras:</strong> ${gameState.solvedWords.size} de ${gameState.totalWords}</p>
  `;
  elements.levelcompletePopup.classList.remove('hidden');
}

function closePopup(popup) {
  popup.classList.add('hidden');
}

// ============================================================================
// INICIALIZAR
// ============================================================================

init();