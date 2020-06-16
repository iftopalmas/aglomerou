# Close #XYZ

## Instruções para enviar sua Pull Request (PR)

1. Altere o título acima "Close #XYZ" para indicar o número da issue que está resolvendo.
2. No texto do PR, insira a mesma frase, pois desta forma o GitHub permite 
   fechar a issue automaticamente quando é feito merge da PR no branch master.
   Ele não faz isso com a referência no título, pois isso a duplicação.
   Você pode incluir quaisquer comentários que desejar.
3. Como você deve ter criado um novo branch a partir de `dev` para enviar o seu PR,
   neste meio tempo o `dev` pode ter sido atualizado.
   Assim, é exigido que você execute os comandos abaixo para atualizar o seu branch `dev` 
   e fazer incluir as suas alterações no topo de tal branch:
   
  ```bash
  # Entrar no branch dev
  git checkout dev
  
  # Obter as últimas atualizações do branch dev
  git pull dev
  
  # Voltar para o branch da issue que você está resolvendo
  git checkout issue-XYZ
  
  # Incluir suas alterações no topo do branch dev
  git rebase dev
  ```
  
  O `git rebase` vai manter o histórico de commits linear, melhor organizando a "timeline" do repositório.
 
## Por fim, não esqueça de apagar todo este texto da PR
 
