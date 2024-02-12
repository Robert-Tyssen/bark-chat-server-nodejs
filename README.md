# Barkchat Server Node.js
## About This project
This repository is still very much a work in progress and will be updated regularly. I'm working on this as a portfolio project to highlight my skills as a back-end developer
and learn some new tools and technologies throughout the development cycle.

This repository is the backend implementation for a realtime chat application I am calling 'Bark' (I love dogs).
The project will be built using the MERN stack, utilizing MongoDB as the persistence layer, and Node.js / Express to handle API requests.
The application will draw inspiration from other popular chat applications (e.g. WhatsApp, Facebook Messenger), and implement
basic functionality such as contact lists, direct / group messaging, and realtime updates to the client.

Feel free to clone this repo and make modifications! You'll need a MongoDB connection - I recommend MongoDB Atlas, but on-premise installations work too.


## Built With
- **Authentication**: JSON Web Tokens
- **Runtime**: Node.js
- **Routing and API**: Express
- **Database**: Mongo DB Atlas

## Installation
1. Clone the repository
```sh
git clone Robert-Tyssen/bark-chat-server-nodejs
```
2. Install packages
```sh
npm install
```
3. Set up a MongoDB database [here](https://www.mongodb.com/atlas/database)
4. Create .env file from template example.env and provide MongoDB connection URL
```sh
MONGO_DB_CONNECTION=mongodb://<your-connection-url>/bark-chat-db
```

## Roadmap
To Be Completed

## Contact
Robert Tyssen - rob.tyssen@gmail.com [LinkedIn](https://www.linkedin.com/in/robert-tyssen/)
