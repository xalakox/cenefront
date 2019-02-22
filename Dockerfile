FROM node:8.10.0
COPY . /app
WORKDIR /app
RUN npm install
RUN npm install -g jest-cli
CMD npm start
