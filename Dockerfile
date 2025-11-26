# ===============================
# 1️⃣ Stage build (builder)
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json luôn
COPY package.json ./

# Copy package-lock.json nếu tồn tại (không fail nếu không có)
COPY package-lock.json ./ || true

# Install dependencies
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

# Copy package.json và package-lock.json nếu có
COPY package.json ./
COPY package-lock.json ./ || true

# Cài dependencies production
RUN npm install --omit=dev

# Copy build output từ builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# EXPOSE port
EXPOSE 3000

# CMD chạy server
CMD ["npm", "start"]
