FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Sử dụng nodemon để tự động restart khi code thay đổi (nếu có cài)
CMD ["node", "index.js"]