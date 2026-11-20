# Cruzadinha de Arquitetura Computacional

Jogo interativo de cruzadinha (palavras cruzadas) desenvolvido para a atividade avaliativa III da disciplina de Arquitetura Computacional (Sprint 3).

## Objetivo

Treinar os termos da aula de Tópicos de Arquitetura Computacional através de um jogo de cruzadinha que roda no navegador. O jogador lê a pista e descobre a palavra, preenchendo as casas do tabuleiro.

## Como jogar

1. Clique em **Iniciar Cruzadinha** para começar o nível. O timer de 30 minutos será ativado.
2. Leia as pistas numeradas (Horizontais e Verticais) e digite as letras diretamente nas casas do tabuleiro.
3. Ao completar uma palavra corretamente, as casas ficam verdes e **+5 segundos** são adicionados ao timer.
4. Se a palavra estiver errada, as casas piscam em vermelho e **−5 segundos** são removidos do timer.
5. O contador de acertos mostra quantas palavras foram completadas (ex: "8 de 8").
6. Ao concluir todas as palavras, aparece um popup com o tempo gasto e o nível. Clique em **Próximo Nível** para continuar.
7. Se o timer chegar a zero antes de completar, aparece o popup **Game Over** com opção de tentar o mesmo nível novamente.
8. O botão **Reiniciar Nível** limpa o tabuleiro e reinicia o nível atual.

## Níveis e dificuldades

O jogo possui 3 níveis que se alternam em sequência:

| Nível | Palavras | Dificuldade | Palavras usadas |
|-------|----------|-------------|-----------------|
| Fácil | 8 | Fácil | CPU, UC, ULA, CACHE, RAM, ROM, DMA, FLASH |
| Médio | 12 | Médio | + EEPROM, MEMORIADEMASSA, ADDRESSBUS, DATABUS |
| Difícil | 16 | Difícil | Todas as palavras do documento, incluindo MICROCONTROLADOR, DUALCORE, QUADCORE, REGISTRADORES |

A cada nível concluído, o próximo é apresentado com maior quantidade de palavras e pistas mais desafiadoras.

## Palavras do documento

As 16 palavras propostas no documento `ARQCOMP_Exercicio_04_v3` (páginas 1 e 2):

1. CPU
2. ULA
3. UC (Unidade de Controle)
4. registradores → REGISTRADORES
5. RAM
6. ROM
7. EEPROM
8. Flash → FLASH
9. cache → CACHE
10. memória de massa → MEMORIADEMASSA
11. DMA
12. address bus → ADDRESSBUS
13. data bus → DATABUS
14. microcontrolador → MICROCONTROLADOR
15. dual core → DUALCORE
16. quad core → QUADCORE

Todas as grafias no tabuleiro estão em letras maiúsculas, sem acento e sem espaço, conforme especificado no documento.

## Estrutura do projeto

- `index.html` — Estrutura da página (HTML5)
- `style.css` — Estilos e animações (CSS3)
- `script.js` — Lógica do jogo (JavaScript puro)
- `README.md` — Este arquivo

## Tecnologias

- HTML5, CSS3 e JavaScript puros (sem frameworks ou bibliotecas externas)
- Animações CSS para feedback visual (acerto em verde, erro em vermelho)
- Timer regressivo de 30 minutos
- Popup de Game Over e Nível Concluído

## Publicação (GitHub Pages)

1. Crie um repositório público no GitHub chamado `arqcomp-cruzadinha`
2. Faça commits ao longo do desenvolvimento (mínimo de 6 commits, em pelo menos 2 dias diferentes)
3. Use mensagens no padrão `tipo: descrição curta` (feat, fix, style, docs)
4. No repositório, acesse Settings → Pages, escolha "Deploy from a branch", branch `main` e pasta `/ (root)`
5. O site ficará disponível em: `https://SEU-USUARIO.github.io/arqcomp-cruzadinha/`
6. Teste o link em uma janela anônima antes de entregar no Moodle

## Entrega

Envie somente o link do site publicado no campo de texto da atividade no Moodle. Não anexe arquivos.

**Atenção:** não inclua RA, e-mail, telefone ou outros dados pessoais no repositório, pois ele é público.