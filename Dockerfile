# ===============================
# 1️⃣ Stage build
# ===============================
FROM node:20-alpine AS builder

# Đặt thư mục làm việc
WORKDIR /app

# Copy file cấu hình trước (tận dụng cache khi build)
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci

# Copy toàn bộ source code vào container
COPY . .

# Build ứng dụng Next.js (output: .next)
RUN npm run build

# ===============================
# 2️⃣ Stage chạy production
# ===============================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy file cần thiết từ stage builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose cổng 3000 (Next.js default)
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]
