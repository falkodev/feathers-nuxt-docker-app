FROM node:12-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install node modules
COPY package*.json /app/
RUN cd /app && \
  if [ "$NODE_ENV" = "production" ]; then npm install --registry=https://registry.npmjs.org/ --only=production; \
  else npm install --registry=https://registry.npmjs.org/; \
  fi

# Install application
COPY . /app
RUN chmod +x ./start.sh

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

CMD /wait && ./start.sh
