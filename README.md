# Cruzadinha de Arquitetura Computacional
 
Jogo de cruzadinha que roda no navegador, feito para a Atividade Avaliativa III (Arquitetura Computacional · Sprint 3).
 
**Site publicado:** https://SEU-USUARIO.github.io/arqcomp-cruzadinha/
 
## Como jogar
 
1. Escolha o nível (ou deixe **Aleatório**) e clique em **Novo Jogo**. O tabuleiro é gerado na hora e o timer de 30 minutos começa.
2. Leia as pistas (Horizontais e Verticais) e digite as letras direto nas casas. Clique numa casa já selecionada que cruza duas palavras para trocar a direção.
3. Ao preencher uma palavra inteira, ela é conferida sozinha: se estiver certa, fica verde e ganha **+5 segundos**; se estiver errada, pisca em vermelho e perde **−5 segundos**. Dá para corrigir e tentar de novo.
4. **Conferir** mostra quais palavras preenchidas estão certas e quais estão erradas (sem penalidade). **Reiniciar** limpa o tabuleiro e volta o timer para 30:00.
5. O contador mostra os acertos (ex.: "8 de 12 palavras").
6. Ao terminar, um pop-up mostra o tempo gasto e o nível. **Próximo nível** gera um tabuleiro novo e mais difícil (Fácil → Médio → Difícil → Difícil, sem fim).
7. Se o tempo acabar, aparece **Game Over**, com as opções de tentar o mesmo nível de novo ou voltar ao início.
## Níveis
 
| Nível | Palavras | Pistas |
|-------|----------|--------|
| Fácil | 12 (sorteadas entre as 16) | diretas |
| Médio | 14 (sorteadas) | diretas |
| Difícil | 16 (todas) | mais indiretas e técnicas |
 
Todas as palavras cruzam com pelo menos uma outra. Os tabuleiros são montados por um gerador automático que garante que não haja letras conflitantes nem palavras coladas.
 
## Estrutura
 
- `index.html`: página
- `style.css`: estilos
- `script.js`: gerador de tabuleiros e lógica do jogo
- `README.md`: este arquivo
Feito com HTML, CSS e JavaScript puros.
 