# Jogos de Arquitetura Computacional

Site estático feito com HTML, CSS e JavaScript puros. A página inicial oferece dois jogos e cada tela possui navegação para alternar entre eles.

## Como executar

Abra `index.html` em um navegador. Não é necessário instalar dependências ou iniciar servidor.

## Jogos

- **Cruzadinha** (`crossword.html`): mantém o gerador automático de tabuleiro, pistas horizontais e verticais, conferência, reinício, pontuação, bônus/penalidade de tempo e progressão de níveis.
- **Caça-palavras** (`wordsearch.html`): grade de 18×18; encontre os termos arrastando da primeira até a última letra. As palavras podem estar na horizontal, vertical ou diagonal, em ambos os sentidos.

## Níveis e regras

| Nível | Palavras |
|---|---:|
| Fácil | 12 |
| Médio | 14 |
| Difícil | 16 |
| Aleatório | Sorteia um dos três níveis acima |

Ambos os jogos começam com 30 minutos. Cada palavra correta concede +5 segundos e uma tentativa incorreta desconta 5 segundos.

## Arquivos

- `index.html`: central de seleção dos jogos.
- `crossword.html`: tela da cruzadinha.
- `wordsearch.html`: tela do caça-palavras.
- `style.css`: identidade visual compartilhada e estilos responsivos.
- `crossword.js`: lógica original da cruzadinha.
- `wordsearch.js`: lógica do caça-palavras.

Os dois jogos usam os mesmos 16 termos: CPU, ULA, UC, REGISTRADORES, RAM, ROM, EEPROM, FLASH, CACHE, MEMORIADEMASSA, DMA, ADDRESSBUS, DATABUS, MICROCONTROLADOR, DUALCORE e QUADCORE.
