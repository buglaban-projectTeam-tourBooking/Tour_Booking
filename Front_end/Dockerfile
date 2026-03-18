# Sử dụng node image chính thức
FROM node:20-alpine

WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ code
COPY . .

# Mở port cho Vite
EXPOSE 5173

# Chạy lệnh dev
CMD ["npm", "run", "dev", "--", "--host"]