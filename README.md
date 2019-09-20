
# Server Setup

1. Install NodeJS
2. In the project root folder run `yarn` / `npm install`
3. Add `.env` file with the specified PORT (`3000` by default) env variable (look at `.env.sample` file)
4. Run `yarn start` / `npm start`
5. Now you can connect to the server via [socket.io-client](https://socket.io/docs/client-api):
    - listen for `data` event
    - the payload format is `{ value: <float>, timestamp: <integer> }`

# Project Setup
1. In the project root folder run `yarn` / `npm install`
2. In the client folder run `yarn` / `npm install`
3. Add `.env` file in the root folder with the specified PORT (`3000` by default) env variable (look at `.env.example` file)
4. Add `.env` file in the client folder with the specified backend url (`5000` by default) env variable (look at `.env.example` file)
5. Run `yarn start` / `npm start` in the root folder to start the server
6. Run `yarn start` / `npm start` in the client folder to start the client
    - enjoy :)
