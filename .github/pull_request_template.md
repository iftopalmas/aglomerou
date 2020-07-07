# Close #XYZ

## 1. Antes de enviar sua Pull Request (PR)

Como você deve ter criado um novo branch a partir de `master` para enviar o seu PR,
neste meio tempo o branch `master` pode ter sido atualizado.
Assim, é exigido que você execute os comandos abaixo para atualizar o seu branch `master` 
e incluir suas alterações no topo de tal branch:
   
```
# Entrar no branch dev
git checkout dev

# Obter as últimas atualizações do branch dev
git pull

# Voltar para o branch da issue que você está resolvendo
git checkout issue-XYZ

# Incluir suas alterações no topo do branch dev
git rebase dev
```

O `git rebase` vai manter o histórico de commits linear, melhor organizando a "timeline" do repositório.
Se desejar entender mais sobre o comando, veja [este artigo curto](https://www.treinaweb.com.br/blog/git-merge-e-git-rebase-quando-usa-los/) que deixa bem claro.

## 2. Enviando as atualizações no seu branch pro GitHub

O comando `git rebase` acima pode reescrever o histórico de commits,
o que vai mudar o código (hash) dos commits que você fez no seu branch.
Tal comando normalmente só deve ser feito em branches particulares,
como é o caso de branches para issues específicas, onde inicialmente só você
trabalha nela.

Se o rebase alterar o histórico de commits e você já tiver feito push, será preciso fazer um push forçado executando

```
git push -f
```

O `push` forçado vai substituir as alterações existentes no seu branch anteriormente enviado ao GitHub
pelas alterações locais realizadas pelo rebase. Por isso, é um comando perigoso de ser feito
em um branch compartilhado como `master` ou `master`.

Caso você não tenha enviado o seu branch pro GitHub, basta fazer um `push` normal.

## 3. Enviando de fato o PR

Ao enviar o PR no GitHub, siga os passos abaixo:

1. Como você deve ter criado um branch com nome como "issue-XYZ", o GitHub já usa tal nome como título da PR. Então apenas deixe assim. 
2. Na primeira linha no topo desta página, troque XYZ pelo número da issue. Desta forma o GitHub permite 
   fechar a issue automaticamente quando é feito merge da PR no branch master.
   Ele não faz isso com a referência no título, por isso é necessária tal frase no texto.
3. Opcionalmente, inclua quaisquer comentários que desejar.

## Por fim, não esqueça de apagar todo este texto da PR
 
