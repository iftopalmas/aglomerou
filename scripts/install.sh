#!/bin/bash

# https://github.com/nvm-sh/nvm

echo ""; echo "# INSTALANDO FERRAMENTAS DE DESENVOLVIMENTO"; echo ""

clear

# Instala o nvm
echo ""; echo "## INSTALANDO NVM"; echo ""
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# Carrega o nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Instala o Node.js
echo ""; echo "## INSTALANDO VERSÃO DO NODE DEFINIDA EM .nvmrc"; echo ""
nvm install `cat backend/.nvmrc`

# Coloca em uso a versão instalada do node
echo ""; echo "## USANDO VERSÃO DO NODE DEFINIDA EM .nvmrc"; echo ""
nvm use

source ~/.bashrc
echo ""; echo "## REABRA O TERMINAL SE NÃO CONSEGUIR USAR nvm, node ou npm"; echo ""

