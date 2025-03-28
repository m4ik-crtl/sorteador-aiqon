# Sorteador AIQON

Este é um simples sorteador de participantes desenvolvido para ser utilizado em sorteios online. O código permite que o usuário insira uma lista de participantes, faça o sorteio de um vencedor, visualize a ordem dos participantes e baixe o resultado em formato `.txt`.

## Funcionalidades

- **Inserção de participantes**: O usuário pode inserir os participantes via uma área de texto, separando-os por vírgulas ou quebras de linha.
- **Sorteio de vencedor**: Após inserir os participantes, o usuário pode clicar no botão "Sortear" para gerar um vencedor aleatório.
- **Exibição da ordem dos participantes**: Depois de realizar o sorteio, o botão "Mostrar Ordem dos Demais" revela a lista de todos os participantes, classificados em ordem aleatória.
- **Download do resultado**: O resultado do sorteio, com a numeração dos participantes, pode ser baixado em um arquivo `.txt`.
- **Redefinir o sorteio**: O botão "Sortear Novamente" permite reiniciar o sorteio, removendo o vencedor anterior e ocultando as opções de visualização.

## Como usar

1. Abra o arquivo `index.html` no seu navegador.
2. Insira os nomes dos participantes na área de texto, separando-os por vírgulas ou quebras de linha.
3. Clique no botão **Adicionar** para adicionar os participantes.
4. Clique no botão **Sortear** para selecionar aleatoriamente um vencedor.
5. Após o sorteio, você pode:
   - **Mostrar Ordem dos Demais**: Exibe a lista dos participantes restantes, com a classificação aleatória.
   - **Baixar Resultado**: Baixa o resultado em um arquivo `.txt` com a numeração dos participantes.
   - **Sortear Novamente**: Reinicia o sorteio.

## Tecnologias utilizadas

- **HTML**: Para estruturação da página.
- **CSS**: Para estilização da interface.
- **JavaScript**: Para a lógica de sorteio, exibição e interação do usuário.

## Como rodar localmente

1. Faça o clone deste repositório:
   ```bash
   git clone https://github.com/seu-usuario/sorteador-aiqon.git
