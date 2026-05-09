# 1. Node.js ka image use karein
FROM node:18

# 2. Folder banayein container ke andar
WORKDIR /app

# 3. Package files copy karein
COPY package*.json ./

# 4. Dependencies install karein
RUN npm install

# 5. Baaki saara code copy karein
COPY . .

# 6. Port expose karein (Back4App default 8080 use karta hai)
EXPOSE 8080

# 7. App start karein
CMD ["node", "server.js"]