FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Sử dụng npm start để chạy ứng dụng
CMD ["npm", "start"]