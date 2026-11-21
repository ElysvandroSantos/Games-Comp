/**
 * Cruzadinha de Arquitetura Computacional
 * Tabuleiros gerados automaticamente a cada jogo (palavras do documento ARQCOMP_Exercicio_04_v3).
 * c = pista dos níveis Fácil e Médio | h = pista (mais indireta) do nível Difícil
 */

/*DATA-START*/
const WORDS = {
  CPU: { c: 'Cérebro do computador: busca, decodifica e executa as instruções dos programas.', h: 'Executa o ciclo de busca, decodificação e execução que dá vida aos programas.' },
  ULA: { c: 'Parte do processador que faz as contas e compara valores.', h: 'Bloco que soma, subtrai e compara valores e devolve flags de resultado.' },
  UC: { c: 'Parte da CPU que dá as ordens aos demais blocos durante a execução.', h: 'Decodifica instruções e emite os sinais que coordenam o restante do hardware.' },
  REGISTRADORES: { c: 'Minúsculos guardadores dentro da CPU, os mais rápidos de toda a hierarquia.', h: 'Topo da hierarquia de armazenamento: acesso em um único ciclo de clock.' },
  RAM: { c: 'Espaço de trabalho volátil onde ficam os programas em uso; apaga ao desligar.', h: 'Seu conteúdo some quando a energia acaba; é onde o programa em execução reside.' },
  ROM: { c: 'Guarda código fixo de fábrica, que sobrevive ao desligamento e não muda em uso.', h: 'Abriga o firmware de inicialização, gravado na fabricação e raramente alterado.' },
  EEPROM: { c: 'Mantém dados sem energia e pode ser regravada por sinais elétricos, byte a byte.', h: 'Retém configurações sem energia e aceita regravação elétrica sem retirar o chip.' },
  FLASH: { c: 'Tipo de armazenamento sem energia usado em pendrives e SSDs, apagado em blocos.', h: 'Evolução regravável por blocos que domina SSDs, cartões e pendrives.' },
  CACHE: { c: 'Espaço pequeno e veloz perto do núcleo que guarda cópias do que é mais usado.', h: 'Camadas L1, L2 e L3 reduzem a diferença de velocidade entre processador e RAM.' },
  MEMORIADEMASSA: { c: 'Guarda arquivos por longo prazo e em grande volume, como HD e SSD.', h: 'Nível mais lento e mais barato por byte, que persiste mesmo desligado.' },
  DMA: { c: 'Recurso que permite a periféricos trocar informação com a RAM sem ocupar a CPU.', h: 'Controlador que move blocos entre periférico e RAM enquanto o processador faz outra tarefa.' },
  ADDRESSBUS: { c: 'Via de sentido único em que a CPU indica a posição que quer acessar.', h: 'Via unidirecional cuja largura em bits define quantas posições da RAM o processador alcança.' },
  DATABUS: { c: 'Via de mão dupla que carrega o conteúdo lido ou gravado entre CPU e memória.', h: 'Via bidirecional cuja largura define quantos bits trafegam por transferência.' },
  MICROCONTROLADOR: { c: 'Chip único com processador, memória e portas de entrada e saída, comum em sistemas embarcados.', h: 'Solução de chip único para dispositivos embarcados, como o coração de um Arduino.' },
  DUALCORE: { c: 'Chip de CPU que reúne duas unidades de execução independentes.', h: 'CPU com paralelismo real em duas frentes simultâneas no mesmo encapsulamento.' },
  QUADCORE: { c: 'Chip de CPU que reúne quatro unidades de execução independentes.', h: 'CPU com paralelismo real em quatro frentes simultâneas no mesmo encapsulamento.' },
};
const LEVELS = {
  easy: { label: 'Fácil', n: 12 },
  medium: { label: 'Médio', n: 14 },
  hard: { label: 'Difícil', n: 16 },
};
/*DATA-END*/

/*GEN-START*/
const K = (x, y) => x + ',' + y;

function shuffle(a) {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Verifica se a palavra w cabe em (x,y) na direção d sem letras conflitantes nem palavras coladas
function fits(g, w, x, y, d) {
  const dx = d === 'across' ? 1 : 0, dy = 1 - dx;
  if (g.has(K(x - dx, y - dy)) || g.has(K(x + dx * w.length, y + dy * w.length))) return false;
  let cross = 0;
  for (let i = 0; i < w.length; i++) {
    const cx = x + dx * i, cy = y + dy * i, c = g.get(K(cx, cy));
    if (c) {
      if (c.l !== w[i] || c.dirs.has(d)) return false;
      cross++;
    } else if (g.has(K(cx + dy, cy + dx)) || g.has(K(cx - dy, cy - dx))) return false;
  }
  return cross > 0;
}

function put(g, placed, w, x, y, d) {
  const dx = d === 'across' ? 1 : 0, dy = 1 - dx;
  for (let i = 0; i < w.length; i++) {
    const k = K(x + dx * i, y + dy * i);
    const c = g.get(k) || { l: w[i], dirs: new Set() };
    c.dirs.add(d);
    g.set(k, c);
  }
  placed.push({ word: w, x, y, dir: d });
}

function candidates(g, placed, w) {
  const out = [];
  for (const p of placed) {
    const d = p.dir === 'across' ? 'down' : 'across';
    for (let i = 0; i < p.word.length; i++) {
      for (let j = 0; j < w.length; j++) {
        if (p.word[i] !== w[j]) continue;
        const cx = p.dir === 'across' ? p.x + i : p.x;
        const cy = p.dir === 'across' ? p.y : p.y + i;
        const x = d === 'across' ? cx - j : cx;
        const y = d === 'down' ? cy - j : cy;
        if (fits(g, w, x, y, d)) out.push({ x, y, d });
      }
    }
  }
  return out;
}

function normalize(placed) {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const p of placed) {
    const ex = p.dir === 'across' ? p.x + p.word.length - 1 : p.x;
    const ey = p.dir === 'down' ? p.y + p.word.length - 1 : p.y;
    x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y);
    x1 = Math.max(x1, ex); y1 = Math.max(y1, ey);
  }
  const words = placed.map(p => ({ word: p.word, dir: p.dir, x: p.x - x0, y: p.y - y0 }));
  const starts = [...new Set(words.map(w => w.y * 1000 + w.x))].sort((a, b) => a - b);
  words.forEach(w => { w.number = starts.indexOf(w.y * 1000 + w.x) + 1; });
  return { words, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}

// Gera um tabuleiro com todas as palavras de "names"; retorna o mais compacto de várias tentativas
function generate(names) {
  let best = null;
  const sorted = [...names].sort((a, b) => b.length - a.length);
  for (let t = 0; t < 80; t++) {
    const g = new Map(), placed = [];
    put(g, placed, sorted[0], 0, 0, Math.random() < 0.5 ? 'across' : 'down');
    const rest = sorted.slice(1)
      .map(w => ({ w, s: w.length + Math.random() * 5 }))
      .sort((a, b) => b.s - a.s).map(o => o.w);
    let ok = true;
    for (const w of rest) {
      const c = candidates(g, placed, w);
      if (!c.length) { ok = false; break; }
      const p = c[Math.floor(Math.random() * c.length)];
      put(g, placed, w, p.x, p.y, p.d);
    }
    if (!ok) continue;
    const lay = normalize(placed);
    if (!best || lay.w * lay.h < best.w * best.h) best = lay;
  }
  return best;
}

function makeLayout(diff) {
  for (let i = 0; i < 50; i++) {
    const names = shuffle(Object.keys(WORDS)).slice(0, LEVELS[diff].n);
    const lay = generate(names);
    if (lay) return lay;
  }
  return null;
}
/*GEN-END*/

// ============================================================================
// JOGO
// ============================================================================
if (typeof document !== 'undefined') {
  const ORDER = ['easy', 'medium', 'hard'];
  const $ = id => document.getElementById(id);
  const el = {
    board: $('crossword'), across: $('clues-across'), down: $('clues-down'),
    timer: $('timer-display'), score: $('score-display'), info: $('words-count'),
    level: $('level'), newBtn: $('new-game-btn'), checkBtn: $('check-btn'), restartBtn: $('restart-btn'),
    goPopup: $('gameover-popup'), goMsg: $('gameover-message'), goRetry: $('gameover-retry'), goHome: $('gameover-home'),
    lcPopup: $('levelcomplete-popup'), lcStats: $('levelcomplete-stats'), lcNext: $('levelcomplete-next'),
  };
  const S = { diff: 'easy', level: 1, layout: null, words: [], cells: new Map(), solved: new Set(), lastWrong: {},
    remaining: 1800, elapsed: 0, timer: null, active: false, dir: 'across' };

  // ---------- fluxo ----------
  function startNewGame() {
    const v = el.level.value;
    S.diff = v === 'random' ? ORDER[Math.floor(Math.random() * 3)] : v;
    S.level = 1;
    newLayout();
  }
  function newLayout() {
    S.layout = makeLayout(S.diff);
    loadLayout();
  }
  function loadLayout() {
    S.solved = new Set(); S.lastWrong = {}; S.remaining = 1800; S.elapsed = 0; S.cells = new Map();
    const field = S.diff === 'hard' ? 'h' : 'c';
    S.words = S.layout.words.map(w => ({
      ...w, clue: WORDS[w.word][field],
      keys: [...w.word].map((_, i) => K(w.dir === 'across' ? w.x + i : w.x, w.dir === 'down' ? w.y + i : w.y)),
    }));
    S.words.forEach((w, wi) => w.keys.forEach((k, i) => {
      if (!S.cells.has(k)) S.cells.set(k, { l: w.word[i], idx: [], dirs: new Set() });
      const c = S.cells.get(k); c.idx.push(wi); c.dirs.add(w.dir);
    }));
    renderBoard(); renderClues(); updateScore(); setInfo();
    S.active = true;
    el.checkBtn.disabled = el.restartBtn.disabled = false;
    startTimer();
  }
  function goHome() {
    stopTimer(); S.active = false; S.level = 1; S.layout = null; S.words = []; S.cells = new Map();
    el.board.style.gridTemplateColumns = ''; el.board.style.gridTemplateRows = '';
    el.board.innerHTML = '<div class="placeholder">Clique em Novo Jogo para gerar a cruzadinha.</div>';
    el.across.innerHTML = ''; el.down.innerHTML = '';
    el.score.textContent = '0 de 0 palavras'; el.info.textContent = 'Escolha o nível e clique em Novo Jogo.';
    el.checkBtn.disabled = el.restartBtn.disabled = true;
    S.remaining = 1800; updateTimer();
  }
  function setInfo(msg) {
    el.info.textContent = msg || `Nível ${S.level} · ${LEVELS[S.diff].label} · ${S.words.length} palavras`;
  }

  // ---------- timer ----------
  function startTimer() {
    stopTimer(); updateTimer();
    S.timer = setInterval(() => { S.remaining--; S.elapsed++; changeTime(0); }, 1000);
  }
  function stopTimer() { clearInterval(S.timer); S.timer = null; }
  function changeTime(d) {
    if (!S.active) return;
    S.remaining = Math.max(0, S.remaining + d);
    updateTimer();
    if (S.remaining <= 0) gameOver();
  }
  function updateTimer() {
    const m = Math.floor(S.remaining / 60), s = S.remaining % 60;
    el.timer.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // ---------- renderização ----------
  function renderBoard() {
    const L = S.layout;
    el.board.innerHTML = '';
    el.board.style.gridTemplateColumns = `repeat(${L.w}, 30px)`;
    el.board.style.gridTemplateRows = `repeat(${L.h}, 30px)`;
    const nums = {};
    S.words.forEach(w => { nums[K(w.x, w.y)] = w.number; });
    for (let y = 0; y < L.h; y++) {
      for (let x = 0; x < L.w; x++) {
        const k = K(x, y), c = S.cells.get(k), d = document.createElement('div');
        d.className = 'cell';
        if (!c) { d.classList.add('empty'); el.board.appendChild(d); continue; }
        const i = document.createElement('input');
        i.maxLength = 1; i.autocomplete = 'off'; i.dataset.k = k;
        i.setAttribute('aria-label', `Casa ${x + 1},${y + 1}`);
        i.addEventListener('input', onInput);
        i.addEventListener('keydown', onKeydown);
        i.addEventListener('focus', onFocus);
        i.addEventListener('click', onClickCell);
        d.appendChild(i);
        if (nums[k]) {
          const n = document.createElement('span');
          n.className = 'number-label'; n.textContent = nums[k]; d.appendChild(n);
        }
        c.input = i; c.el = d;
        el.board.appendChild(d);
      }
    }
  }
  // Pendentes em ordem crescente; resolvidas vão para o fim, com a palavra riscada em verde
  function renderClues() {
    el.across.innerHTML = ''; el.down.innerHTML = '';
    S.words.map((w, wi) => ({ w, wi }))
      .sort((a, b) => (S.solved.has(a.wi) - S.solved.has(b.wi)) || (a.w.number - b.w.number))
      .forEach(({ w, wi }) => {
        const done = S.solved.has(wi);
        const li = document.createElement('li');
        li.className = 'clue-item' + (done ? ' completed' : '');
        li.dataset.wi = wi;
        li.innerHTML = `<span class="clue-number">${w.number}.</span><span class="clue-text">${done ? w.word : w.clue}</span>`;
        if (!done) li.addEventListener('click', () => {
          S.dir = w.dir;
          const c = S.cells.get(w.keys.find(k => !S.cells.get(k).input.disabled) || w.keys[0]);
          if (c && !c.input.disabled) c.input.focus();
        });
        (w.dir === 'across' ? el.across : el.down).appendChild(li);
      });
  }
  function updateScore() { el.score.textContent = `${S.solved.size} de ${S.words.length} palavras`; }

  // ---------- entrada do jogador ----------
  function dirOf(c) { return c.dirs.has(S.dir) ? S.dir : [...c.dirs][0]; }
  function move(k, step) {
    const c = S.cells.get(k), d = dirOf(c);
    let [x, y] = k.split(',').map(Number);
    for (let n = 0; n < 20; n++) {
      x += d === 'across' ? step : 0; y += d === 'down' ? step : 0;
      const t = S.cells.get(K(x, y));
      if (!t) return;
      if (!t.input.disabled) { t.input.focus(); return; }
    }
  }
  function onInput(e) {
    if (!S.active) return;
    const k = e.target.dataset.k;
    const v = e.target.value.normalize('NFD').replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 1);
    e.target.value = v;
    S.cells.get(k).idx.forEach(checkWord);
    if (v) move(k, 1);
  }
  function onKeydown(e) {
    const k = e.target.dataset.k;
    const arrows = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] };
    if (arrows[e.key]) {
      e.preventDefault();
      const [dx, dy] = arrows[e.key], [x, y] = k.split(',').map(Number);
      const t = S.cells.get(K(x + dx, y + dy));
      S.dir = dx ? 'across' : 'down';
      if (t && !t.input.disabled) t.input.focus();
    } else if (e.key === 'Backspace' && !e.target.value) {
      e.preventDefault(); move(k, -1);
    }
  }
  function onFocus(e) {
    e.target.select();
    document.querySelectorAll('#crossword .cell.active').forEach(c => c.classList.remove('active'));
    const c = S.cells.get(e.target.dataset.k);
    c.el.classList.add('active');
    if (c.dirs.size === 1) S.dir = [...c.dirs][0];
  }
  function onClickCell(e) {
    const c = S.cells.get(e.target.dataset.k);
    if (c.dirs.size > 1 && document.activeElement === e.target && e.detail > 0 && e.target.dataset.clicked === '1') {
      S.dir = S.dir === 'across' ? 'down' : 'across';
    }
    e.target.dataset.clicked = '1';
  }

  // ---------- verificação ----------
  function readWord(w) { return w.keys.map(k => S.cells.get(k).input.value).join('').toUpperCase(); }

  // Confere automaticamente quando a palavra é totalmente preenchida
  function checkWord(wi, silent) {
    if (!S.active || S.solved.has(wi)) return;
    const w = S.words[wi], s = readWord(w);
    if (s.length < w.word.length) { S.lastWrong[wi] = null; return; }
    if (s === w.word) { solve(wi); return; }
    flash(wi);
    if (!silent && S.lastWrong[wi] !== s) { S.lastWrong[wi] = s; changeTime(-5); }
  }
  function solve(wi) {
    S.solved.add(wi);
    S.words[wi].keys.forEach(k => {
      const c = S.cells.get(k);
      c.el.classList.remove('wrong'); c.el.classList.add('correct'); c.input.disabled = true;
    });
    renderClues();
    updateScore();
    changeTime(5);
    if (S.solved.size === S.words.length) finishLevel();
  }
  function flash(wi) {
    S.words[wi].keys.forEach(k => {
      const c = S.cells.get(k);
      if (c.el.classList.contains('correct')) return;
      c.el.classList.remove('wrong'); void c.el.offsetWidth; c.el.classList.add('wrong');
      setTimeout(() => c.el.classList.remove('wrong'), 700);
    });
  }
  // Botão Conferir: mostra certas e erradas, sem penalidade de tempo
  function checkAll() {
    if (!S.active) return;
    let ok = 0, bad = 0;
    S.words.forEach((w, wi) => {
      if (S.solved.has(wi)) { ok++; return; }
      if (readWord(w).length === w.word.length) { bad++; checkWord(wi, true); if (S.solved.has(wi)) { ok++; bad--; } }
      const li = document.querySelector(`.clue-item[data-wi="${wi}"]`);
      li.classList.toggle('wrong-clue', readWord(w).length === w.word.length && !S.solved.has(wi));
    });
    setInfo(`Conferido: ${ok} certas, ${bad} erradas.`);
    setTimeout(() => S.active && setInfo(), 3000);
  }

  // ---------- fim de nível / game over ----------
  function finishLevel() {
    stopTimer(); S.active = false;
    const m = Math.floor(S.elapsed / 60), s = S.elapsed % 60;
    el.lcStats.innerHTML = `
      <p><strong>Nível:</strong> ${S.level} (${LEVELS[S.diff].label})</p>
      <p><strong>Tempo gasto:</strong> ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}</p>
      <p><strong>Palavras:</strong> ${S.words.length} de ${S.words.length}</p>`;
    el.lcPopup.classList.remove('hidden');
  }
  function gameOver() {
    stopTimer(); S.active = false;
    document.querySelectorAll('#crossword input').forEach(i => { i.disabled = true; });
    el.goMsg.textContent = `O tempo esgotou no nível ${S.level} (${LEVELS[S.diff].label})! Você acertou ${S.solved.size} de ${S.words.length} palavras.`;
    el.goPopup.classList.remove('hidden');
  }

  // ---------- eventos ----------
  el.newBtn.addEventListener('click', startNewGame);
  el.checkBtn.addEventListener('click', checkAll);
  el.restartBtn.addEventListener('click', () => { if (S.layout) loadLayout(); });
  el.goRetry.addEventListener('click', () => { el.goPopup.classList.add('hidden'); loadLayout(); });
  el.goHome.addEventListener('click', () => { el.goPopup.classList.add('hidden'); goHome(); });
  el.lcNext.addEventListener('click', () => {
    el.lcPopup.classList.add('hidden');
    S.level++;
    S.diff = ORDER[Math.min(ORDER.indexOf(S.diff) + 1, 2)];
    newLayout();
  });
  goHome();
}
