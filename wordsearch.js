/* Caça-palavras de Arquitetura Computacional — mesmos 16 termos da cruzadinha. */
(() => {
  'use strict';
  const WORDS = ['CPU','ULA','UC','REGISTRADORES','RAM','ROM','EEPROM','FLASH','CACHE','MEMORIADEMASSA','DMA','ADDRESSBUS','DATABUS','MICROCONTROLADOR','DUALCORE','QUADCORE'];
  const LEVELS = { easy: { label: 'Fácil', count: 12 }, medium: { label: 'Médio', count: 14 }, hard: { label: 'Difícil', count: 16 } };
  const ORDER = ['easy','medium','hard'];
  const SIZE = 18;
  const $ = id => document.getElementById(id);
  const el = {
    level: $('level'), newBtn: $('new-game-btn'), board: $('wordsearch-board'), list: $('word-list'),
    info: $('game-info'), timer: $('timer-display'), progress: $('progress'), check: $('check-btn'),
    restart: $('restart-btn'), gameover: $('gameover-popup'), gameoverMsg: $('gameover-message'),
    retry: $('gameover-retry'), complete: $('levelcomplete-popup'), stats: $('levelcomplete-stats'), next: $('levelcomplete-next')
  };
  const DIRS = [[0,1],[1,0],[0,-1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
  let state = { diff:'easy', level:1, words:[], grid:[], placements:[], found:new Set(), selected:[], start:null, dragging:false, remaining:1800, elapsed:0, timer:null, active:false };

  const shuffle = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
  const key = (r,c) => `${r},${c}`;
  function buildPuzzle(words) {
    for(let attempt=0; attempt<160; attempt++) {
      const grid=Array.from({length:SIZE},()=>Array(SIZE).fill(''));
      const placements=[]; let failed=false;
      for(const word of [...words].sort((a,b)=>b.length-a.length)) {
        const candidates=[];
        for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) for(const [dr,dc] of DIRS) {
          const er=r+dr*(word.length-1), ec=c+dc*(word.length-1);
          if(er<0||er>=SIZE||ec<0||ec>=SIZE) continue;
          let fits=true;
          for(let i=0;i<word.length;i++){const v=grid[r+dr*i][c+dc*i];if(v&&v!==word[i]){fits=false;break;}}
          if(fits)candidates.push({r,c,dr,dc});
        }
        if(!candidates.length){failed=true;break;}
        const p=candidates[Math.floor(Math.random()*candidates.length)];
        const cells=[];
        for(let i=0;i<word.length;i++){const rr=p.r+p.dr*i,cc=p.c+p.dc*i;grid[rr][cc]=word[i];cells.push(key(rr,cc));}
        placements.push({word,cells});
      }
      if(!failed){for(let r=0;r<SIZE;r++)for(let c=0;c<SIZE;c++)if(!grid[r][c])grid[r][c]='ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random()*26)];return {grid,placements};}
    }
    throw new Error('Não foi possível montar a grade. Tente novamente.');
  }
  function startNewGame() {
    const selected=el.level.value;
    state.diff=selected==='random'?ORDER[Math.floor(Math.random()*ORDER.length)]:selected;
    state.level=1; createGame();
  }
  function createGame() {
    const count=LEVELS[state.diff].count;
    state.words=shuffle(WORDS).slice(0,count);
    const puzzle=buildPuzzle(state.words);
    state.grid=puzzle.grid; state.placements=puzzle.placements; state.found=new Set(); state.selected=[];
    state.remaining=1800;state.elapsed=0;state.active=true;state.dragging=false;state.start=null;
    el.gameover.classList.add('hidden');el.complete.classList.add('hidden');
    el.check.disabled=false;el.restart.disabled=false;
    renderBoard();renderList();updateProgress();setInfo();startTimer();
  }
  function setInfo(){el.info.textContent=`Nível ${state.level} · ${LEVELS[state.diff].label} · ${state.words.length} palavras`;}
  function renderBoard(){
    el.board.innerHTML='';el.board.style.gridTemplateColumns=`repeat(${SIZE}, minmax(0, 1fr))`;
    for(let r=0;r<SIZE;r++)for(let c=0;c<SIZE;c++){
      const cell=document.createElement('button');cell.type='button';cell.className='ws-cell';cell.textContent=state.grid[r][c];cell.dataset.r=r;cell.dataset.c=c;cell.setAttribute('aria-label',`Linha ${r+1}, coluna ${c+1}, letra ${state.grid[r][c]}`);el.board.appendChild(cell);
    }
    el.board.querySelectorAll('.ws-cell').forEach(cell=>{
      cell.addEventListener('pointerdown',onPointerDown);
      cell.addEventListener('pointerenter',onPointerEnter);
    });
  }
  function renderList(){el.list.innerHTML='';state.words.forEach(word=>{const li=document.createElement('li');li.textContent=word;li.dataset.word=word;el.list.appendChild(li);});}
  function updateProgress(){el.progress.textContent=`${state.found.size} de ${state.words.length} palavras encontradas`;}
  function clearSelection(){state.selected.forEach(k=>{const [r,c]=k.split(',').map(Number);const cell=cellAt(r,c);if(cell&&!cell.classList.contains('found'))cell.classList.remove('selected');});state.selected=[];}
  function cellAt(r,c){return el.board.querySelector(`.ws-cell[data-r="${r}"][data-c="${c}"]`);}
  function onPointerDown(e){if(!state.active)return;e.preventDefault();clearSelection();state.dragging=true;state.start={r:Number(e.currentTarget.dataset.r),c:Number(e.currentTarget.dataset.c)};selectTo(state.start.r,state.start.c);}
  function onPointerEnter(e){if(!state.active||!state.dragging)return;selectTo(Number(e.currentTarget.dataset.r),Number(e.currentTarget.dataset.c));}
  function selectTo(r,c){
    clearSelection();if(!state.start)return;
    const dr=r-state.start.r,dc=c-state.start.c;
    if(!(dr===0||dc===0||Math.abs(dr)===Math.abs(dc)))return;
    const steps=Math.max(Math.abs(dr),Math.abs(dc));const sr=Math.sign(dr),sc=Math.sign(dc);
    for(let i=0;i<=steps;i++){const rr=state.start.r+sr*i,cc=state.start.c+sc*i;const k=key(rr,cc);state.selected.push(k);const cell=cellAt(rr,cc);if(cell&&!cell.classList.contains('found'))cell.classList.add('selected');}
  }
  function onPointerUp(){if(!state.dragging)return;state.dragging=false;}
  function checkSelection(){
    if(!state.active||!state.selected.length)return;
    const text=state.selected.map(k=>{const [r,c]=k.split(',').map(Number);return state.grid[r][c];}).join('');
    const reverse=[...text].reverse().join('');
    const match=state.placements.find(p=>!state.found.has(p.word)&&((p.word===text&&sameCells(p.cells,state.selected))||(p.word===reverse&&sameCells(p.cells,[...state.selected].reverse()))));
    // A seleção deve corresponder exatamente a uma palavra escondida.
    if(match){
      state.found.add(match.word);match.cells.forEach(k=>{const [r,c]=k.split(',').map(Number);cellAt(r,c)?.classList.add('found');cellAt(r,c)?.classList.remove('selected');});
      const li=el.list.querySelector(`[data-word="${match.word}"]`);li?.classList.add('found-word');changeTime(5);updateProgress();
      state.selected=[];state.start=null;
      if(state.found.size===state.words.length)finishLevel();
    }else{changeTime(-5);clearSelection();state.start=null;}
  }
  function sameCells(a,b){return a.length===b.length&&a.every((v,i)=>v===b[i]);}
  function startTimer(){stopTimer();updateTimer();state.timer=setInterval(()=>{if(!state.active)return;state.remaining--;state.elapsed++;updateTimer();if(state.remaining<=0)gameOver();},1000);}
  function stopTimer(){if(state.timer)clearInterval(state.timer);state.timer=null;}
  function changeTime(delta){if(!state.active)return;state.remaining=Math.max(0,state.remaining+delta);updateTimer();if(state.remaining<=0)gameOver();}
  function updateTimer(){const m=Math.floor(state.remaining/60),s=state.remaining%60;el.timer.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
  function finishLevel(){stopTimer();state.active=false;const m=Math.floor(state.elapsed/60),s=state.elapsed%60;el.stats.innerHTML=`<p><strong>Nível:</strong> ${state.level} (${LEVELS[state.diff].label})</p><p><strong>Tempo gasto:</strong> ${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}</p><p><strong>Palavras:</strong> ${state.words.length} de ${state.words.length}</p>`;el.complete.classList.remove('hidden');}
  function gameOver(){stopTimer();state.active=false;el.gameoverMsg.textContent=`O tempo acabou no nível ${state.level} (${LEVELS[state.diff].label}). Você encontrou ${state.found.size} de ${state.words.length} palavras.`;el.gameover.classList.remove('hidden');}
  el.newBtn.addEventListener('click',startNewGame);
  el.check.addEventListener('click',checkSelection);
  el.restart.addEventListener('click',createGame);
  el.retry.addEventListener('click',createGame);
  el.next.addEventListener('click',()=>{el.complete.classList.add('hidden');state.level++;state.diff=ORDER[Math.min(ORDER.indexOf(state.diff)+1,2)];createGame();});
  // Soltar o ponteiro encerra a seleção; o botão permite confirmar também em telas touch.
  document.addEventListener('pointerup',()=>{if(state.dragging){state.dragging=false;checkSelection();}});
})();
