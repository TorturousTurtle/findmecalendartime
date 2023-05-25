FROM node:18-alpine
WORKDIR /findmecalendartime
COPY . .
RUN npm run build
CMD [ "npm", "start" ]
EXPOSE 3000
