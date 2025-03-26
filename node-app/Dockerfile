# Usar uma imagem Node.js pequena para reduzir o tamanho do container
FROM node:alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e instalar as dependências
COPY package.json ./
RUN npm install

# Copiar o restante dos arquivos para dentro do container
COPY . .

# Expor a porta que o Node.js usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
