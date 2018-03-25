# Rollcall

This is a web application to manage rollcalls. A trip leader can create a rollcall and invite
travelers to it. When it's time to start the next leg of the journey, this app helps to collect
the attendance status.

The app backend is a Node & Express app with Sequelize ORM and a PostgreSQL database.

The frontend is a React/Redux app with redux-promise middleware for handling actions.

## Prerequisites

* Node & npm
* Docker and Docker compose (for running the provided [PostgreSQL docker container](docker/README.md))

## Starting up

* Install dependencies: `npm install`
* Run `docker-compose up -d` in the `docker` directory to start PostgreSQL
* To populate the database with test data, run `npm run seed`. (See [seed.js](db/seed.js))
* Start the development server: `npm start`

The development server will run both the backend and the frontend build process. See the `scripts`
object in [package.json](package.json) for more info. 

## License

MIT license for whatever I have written. Dependencies have their own licenses. 
