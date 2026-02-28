# ---------- Builder stage ----------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci
    
    COPY . .
    
    # Build-time variable
    ARG NEXT_PUBLIC_API_URL
    ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
    
    RUN npm run build
    
    
    # ---------- Production stage ----------
    FROM node:20-alpine
    
    WORKDIR /app
    
    COPY --from=builder /app ./
    
    ENV NODE_ENV=production
    
    EXPOSE 3000
    
    CMD ["npm", "run", "start"]