# Use the official Node.js image as the base
FROM node:20.3

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
ADD package*.json ./

# Install dependencies (including react-scripts from package.json)
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
ADD . .

# Expose port 3000 for the React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]


