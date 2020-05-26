# Guia de Contribuição

Contribuições são sempre bem vindas. Você pode contribuir de diferentes formas como descrito a seguir.
No entanto, para manter a qualidade do projeto existem algumas diretrizes que precisamos que os colaboradores siga.
Desta forma, podemos manter o controle das coisas.
Estas diretrizes são principalmente relevantes quando você está planejando contribuir com o código fonte do projeto,
de forma que a qualidade do código é preservada e o [aprodecimento de código](https://en.wikipedia.org/wiki/Software_rot) é evitado.

# Formas de contribuir

1. Clicando no botão "Star" no topo da página do projeto no GitHub, nos dando mais visibilidade.
1. Promovendo o projeto nas suas redes sociais.
1. Relatando problemas ou solicitando recursos, por meio de uma nova issue (veja instruções abaixo)
1. Melhorando a documentação do projeto.
1. Corrigindo bugs e implementando novos recursos.

As seções abaixo apresentam mais informações de como contribuir em algumas destas formas.

# Iniciando sua Contribuição

## Solicitando recurso ou relatando um problema

Se você quer solicitar um recurso ou relatar um problema, verifique primeiro se o problema/recurso que você quer reportar/requisitar não foi reportado/requisitado ainda na [página de issues](https://github.com/ifto-palmas/aglomerou).
Tente pesquisar as issues existentes usando alguma palavra-chave antes de criar nova issue. 
Se não existe uma issue relacionada ainda, sinta-se livre para criar uma.
Por fim, tenha certeza de que cada issue criada esteja relacionada a um único recurso solicitado ou bug.

## Corrigindo um bug ou implementando novo recurso

Antes de começar a programar, você precisa primeiro fazer um fork do repositório do projeto no GitHub.
Você pode corrigir um bug ou implementar um recurso de uma issue já aberta por outra pessoa ou por você mesmo,
seguindo mandatoriamente os passos abaixo:

### 1. Crie um branch específico para trabalhar na issue

* Cria um novo branch a partir do branch `dev` para incluir suas alterações. O nome de tal branch deve ter o formato `issue-XX`
* Para criar um novo branch a partir de `dev`, execute: `git checkout dev -b issue-XX`. 
  Por favor, evite fazer alterações diretamente no branch `master`.

### 2. Diretrizes de qualidade de código

O último passo antes de você iniciar a programar é ter em mente as seguintes diretrizes, de forma que a probabilidade de suas contribuições serem incluídas no projeto serão maiores:

- Evite duplicação de código. 
- Declare tudo como constante, até descobrir que precisa de fato de uma variável. Neste caso, use `let`, nunca `var`.
- Crie funções pequenas e com uma única responsabilidade.
- Considere incluir documentação nas funções.
- Nós nos importamos com organização e indentação do código.

### 3. Faça seus commits

Crie commits pequenos, específicos.
Assim como suas funções devem ser pequenas, seus commits devem ser focados em resolver um único problema.
A resolução de uma issue normalmente pode requerer vários commits.
Gaste algum tempo escrevendo mensagens de commit estruturadas, informativas e que descrevem claramente o que você fez em cada commit.

### 4. Envie suas alterações

* Atualize o branch `dev` do seu fork para obter a última versão do projeto:  

```bash
#Adicionar o endereço do repositório original (se ainda não fez)
git remote add upstream https://github.com/ifto-palmas/aglomerou.git
#Obter os branches remotos
git fetch upstream
#Entrar no seu branch dev local
git checkout dev
#Atualizar o seu branch dev com tal branch no repositório original
git merge upstream/dev
```

* Execute um `rebase` para incluir suas alterações no topo do branch `dev`, de forma que suas alterações serão baseadas na versão mais recente do código, antes de enviar sua contribuição. Para isto execute:

```bash
#Entrar no branch referente a issue em que estava trabalhando
git checkout issue-XX
#Incluir as alterações realizadas no topo da última versão no branch dev
git rebase dev
```

* Faça um último commit se necessário, incluindo na primeira linha da mensagem `Close #XX` para indicar o número da issue que está finalizando.
* Execute `git push` para enviar seu branch para o GitHub.
* Abra uma Pull Request no repositório oficial em https://github.com/ifto-palmas/aglomerou
* Aguarde suas contribuições serem avaliadas e obrigado antecipadamente.
