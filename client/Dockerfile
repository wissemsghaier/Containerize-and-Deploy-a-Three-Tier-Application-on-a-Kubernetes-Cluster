

# Use the official Node.js image as the base
FROM node:20.3

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
ADD package*.json ./

# Install dependencies (including react-scripts from package.json)
RUN npm install --legacy-peer-deps

# Install additional dependencies and update caniuse-lite
RUN npm install @babel/plugin-proposal-private-property-in-object --save-dev && \
    npx update-browserslist-db@latest

# Copy the rest of the application code
ADD . .

RUN npm run build


# Expose port 3000 for the React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
