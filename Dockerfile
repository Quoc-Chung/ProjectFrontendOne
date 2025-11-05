# ========================
# Stage 1: Build ứng dụng
# ========================
FROM node:20-alpine AS builder

WORKDIR /app

# Cài các gói cần thiết để build (node-gyp,...)
RUN apk add --no-cache python3 make g++

# Sao chép file khai báo dependencies
COPY package*.json ./

# Cài dependencies
RUN npm ci

# Sao chép toàn bộ source code
COPY . .

# Build Next.js ở chế độ production
RUN npm run build

# ========================
# Stage 2: Chạy production
# ========================
FROM node:20-alpine AS runner

WORKDIR /app

# Tạo user không có quyền root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

ENV NODE_ENV=production

# Copy các file build cần thiết
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Đổi quyền cho user
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
