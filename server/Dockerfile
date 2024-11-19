# Use the Node.js version 20.3.3 official image
FROM node:20.3

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies


RUN npm install --legacy-peer-deps

RUN npm install --save-dev nodemon


# Copy the application source code
COPY . .

# Expose the application port (default: 3000 for Node.js apps)
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]

