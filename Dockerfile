FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else
COPY . .

# Expose the port used in your .env
EXPOSE 8081

# Start the server (point to src/server.js)
CMD ["node", "src/server.js"]
