# Use Node for React dev server
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose port 3000 (React default)
EXPOSE 3000

# Start in development mode
CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]
