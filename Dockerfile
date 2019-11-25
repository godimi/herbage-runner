FROM node:current-alpine as node

# Setting working directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Running the app
CMD [ "npm", "start" ]
