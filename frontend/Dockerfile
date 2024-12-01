# 가져올 이미지를 정의
FROM node:20.9.0-alpine AS base
# 작업 디렉토리 설정
WORKDIR /app

# Yarn Berry 설치
RUN corepack enable && corepack prepare yarn@stable --activate

# 종속성 파일 복사
COPY ./package.json ./yarn.lock ./
COPY /techpick/. ./techpick
COPY /techpick-shared/. ./techpick-shared
COPY /schema/. ./schema

# .yarnrc.yml 파일 및 .yarn 디렉토리 복사
COPY ./.yarnrc.yml ./
COPY ./.yarn/ ./.yarn/


# 종속성 설치
RUN yarn install
RUN yarn all install

################################
FROM base AS builder
# teckpick build전에 WORKDIR 변경
WORKDIR /app/techpick

# Build
RUN yarn run build

################################
FROM node:20.9.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/techpick/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/techpick/.next/standalone/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/techpick/.next/standalone/techpick/. .
COPY --from=builder --chown=nextjs:nodejs /app/techpick/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]