FROM node:18-slim


RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates procps git && rm -rf /var/lib/apt/lists/*


WORKDIR /usr/src/app
COPY package.json ./
RUN npm ci --only=production
COPY src ./src


EXPOSE 3000
CMD [ "node", "src/index.js" ]
