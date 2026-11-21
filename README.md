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
 
## Palavras e pistas
 
| Nº | No tabuleiro | Pista (Fácil e Médio) | Pista (Difícil) |
|----|--------------|-----------------------|-----------------|
| 1 | CPU | Cérebro do computador: busca, decodifica e executa as instruções dos programas. | Executa o ciclo de busca, decodificação e execução que dá vida aos programas. |
| 2 | ULA | Parte do processador que faz as contas e compara valores. | Bloco que soma, subtrai e compara valores e devolve flags de resultado. |
| 3 | UC | Parte da CPU que dá as ordens aos demais blocos durante a execução. | Decodifica instruções e emite os sinais que coordenam o restante do hardware. |
| 4 | REGISTRADORES | Minúsculos guardadores dentro da CPU, os mais rápidos de toda a hierarquia. | Topo da hierarquia de armazenamento: acesso em um único ciclo de clock. |
| 5 | RAM | Espaço de trabalho volátil onde ficam os programas em uso; apaga ao desligar. | Seu conteúdo some quando a energia acaba; é onde o programa em execução reside. |
| 6 | ROM | Guarda código fixo de fábrica, que sobrevive ao desligamento e não muda em uso. | Abriga o firmware de inicialização, gravado na fabricação e raramente alterado. |
| 7 | EEPROM | Mantém dados sem energia e pode ser regravada por sinais elétricos, byte a byte. | Retém configurações sem energia e aceita regravação elétrica sem retirar o chip. |
| 8 | FLASH | Tipo de armazenamento sem energia usado em pendrives e SSDs, apagado em blocos. | Evolução regravável por blocos que domina SSDs, cartões e pendrives. |
| 9 | CACHE | Espaço pequeno e veloz perto do núcleo que guarda cópias do que é mais usado. | Camadas L1, L2 e L3 reduzem a diferença de velocidade entre processador e RAM. |
| 10 | MEMORIADEMASSA | Guarda arquivos por longo prazo e em grande volume, como HD e SSD. | Nível mais lento e mais barato por byte, que persiste mesmo desligado. |
| 11 | DMA | Recurso que permite a periféricos trocar informação com a RAM sem ocupar a CPU. | Controlador que move blocos entre periférico e RAM enquanto o processador faz outra tarefa. |
| 12 | ADDRESSBUS | Via de sentido único em que a CPU indica a posição que quer acessar. | Via unidirecional cuja largura em bits define quantas posições da RAM o processador alcança. |
| 13 | DATABUS | Via de mão dupla que carrega o conteúdo lido ou gravado entre CPU e memória. | Via bidirecional cuja largura define quantos bits trafegam por transferência. |
| 14 | MICROCONTROLADOR | Chip único com processador, memória e portas de entrada e saída, comum em sistemas embarcados. | Solução de chip único para dispositivos embarcados, como o coração de um Arduino. |
| 15 | DUALCORE | Chip de CPU que reúne duas unidades de execução independentes. | CPU com paralelismo real em duas frentes simultâneas no mesmo encapsulamento. |
| 16 | QUADCORE | Chip de CPU que reúne quatro unidades de execução independentes. | CPU com paralelismo real em quatro frentes simultâneas no mesmo encapsulamento. |
 
## Estrutura
 
- `index.html`: página
- `style.css`: estilos
- `script.js`: gerador de tabuleiros e lógica do jogo
- `README.md`: este arquivo
Feito com HTML, CSS e JavaScript puros.
 