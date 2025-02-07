FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the application (if you have a build step)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Command to run your app
CMD ["node", "--experimental-specifier-resolution=node", "--loader=ts-node/esm", "src/main.ts"]