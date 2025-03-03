# Usa una imagen liviana de Node.js LTS (20-alpine)
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json para aprovechar la caché de Docker
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm ci --omit=dev

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]

