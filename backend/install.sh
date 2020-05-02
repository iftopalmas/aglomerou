#!/bin/bash

# https://github.com/nvm-sh/nvm

echo "Instalando ferramentas de desenvolvimento"

VERSAO_NODE="14.1.0"

clear

# Instala o nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# Carrega o nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Instala o Node.js
nvm install $VERSAO_NODE

# Coloca em uso a versão instalada do node
nvm use

