# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Pass build argument for Meta Pixel ID
ARG NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID

# Copy the rest of the application files and build
COPY . .
RUN npm run build

# Stage 2: Serve the application with Next.js Node server
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy build files from build stage
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose port 3000
EXPOSE 3000

# Start Next.js server
CMD ["npm", "start"]
