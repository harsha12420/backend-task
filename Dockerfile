FROM node:16.16.0

# update packages

# Install pm2 list
# RUN npm install pm2 -g

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY ts*.json ./

# copy source code to /app/src folder
COPY . /app/
RUN npm install -f
RUN npx tsc

