FROM node:18.12.1-bullseye-slim

# Optional: update npm
RUN npm install -g npm@9.1.3

# Create app directory
WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app (after dependencies are installed)
COPY . .

EXPOSE 3030

CMD [ "node", "app.js" ]
