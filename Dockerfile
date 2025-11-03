FROM node:latest

# Set working directory
WORKDIR /testapp

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Copy the rest of your backend code
COPY . .

EXPOSE 3000

CMD ["node", "/testapp/index.js"]
