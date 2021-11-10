FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

COPY . ./

EXPOSE 3000

CMD /usr/src/app/start-prod.sh