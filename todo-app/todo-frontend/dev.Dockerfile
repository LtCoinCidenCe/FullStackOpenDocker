FROM node:20

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL="http://localhost:3000"

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
# this actually runs so it takes the environmental variable from compose
CMD ["npm", "run", "dev", "--", "--host"]
