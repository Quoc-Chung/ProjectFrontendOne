# ===============================
# 1️⃣ Stage build (builder)
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy các file khai báo package để tận dụng cache
COPY package.json package-lock.json ./

# Nếu không có package-lock.json thì dùng npm install
# RUN npm ci || npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy toàn bộ source
COPY . .

# Disable ESLint trong lúc build
ENV NEXT_DISABLE_ESLINT=1

# Build Next.js (build ra .next)
RUN npm run build


# ===============================
# 2️⃣ Stage runner (production)
# ===============================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy file package để chạy `npm install --omit=dev`
COPY package*.json ./

# Chỉ cài dependencies production
RUN npm install --omit=dev

# Copy build output từ builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Nếu Next.js dùng .env.production
# COPY --from=builder /app/.env.production ./

EXPOSE 3000

# Chạy Next.js server
CMD ["npm", "start"]
