# Manipulação de arquivo XML

#### O objetivo desse programa criado em Node.JS faz parte de um o teste para uma vaga da empresa Raccoon.Monks:

## Requisitos
- É necessário que o Node.js esteja instalado em seu computador para que o programa funcione, caso não tenha, você pode baixa-lo através deste [link](https://nodejs.org/en/download/).


## Funcionamento
Foi inserido o arquivo de feed.xml (que será modificado) na raiz desse programa, durante a execução ele converte o XML para um objeto todas as modificações de erros que foram apontadas pelo cliente são feitas neste objeto, logo após o objeto é convertido novamente para xml e imprime no terminal seu novo conteúdo, além de também gerar um novo arquivo XML com o nome "novo-feed.xml"

## Comandos
**Os comandos devem ser executado no terminal do Visual Studio Code**

**Instalar dependências**
```
npm install
```

**Iniciar programa**
```
node app
```

##### Observação o programa foi desenvolvido utilizando os seguintes pacotes: **xml2js**, **fs**, e **fs/promises**
