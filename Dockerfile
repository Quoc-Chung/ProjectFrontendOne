# ===============================
# 1️⃣ Stage build
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Chỉ copy file cần thiết trước để tận dụng cache
COPY package*.json ./

# Dùng npm ci để install tất cả dependencies (bao gồm devDependencies cho build)
RUN npm ci

# Copy phần code còn lại
COPY . .

# ⚙️ Tắt kiểm tra lint trong Next.js build (tạm thời)
ENV NEXT_DISABLE_ESLINT=1

# Build Next.js
RUN npm run build 

# ===============================
# 2️⃣ Stage production
# ===============================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy từ builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
