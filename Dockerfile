FROM resin/raspberry-pi-node:6-slim

ENV CONN_STRING='HostName=quack-driver.azure-devices.net;DeviceId=device_01;SharedAccessKey=FNCNjxJDj88Xs9wFYKnJBKlKpt7aKxcE0QTb1LyHZ2c='

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

CMD [ "npm", "start" ]
