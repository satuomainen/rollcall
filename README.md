# Rollcall

[![Build Status](https://travis-ci.org/satuomainen/rollcall.svg?branch=master)](https://travis-ci.org/satuomainen/rollcall)

This is a web application to manage rollcalls. A trip leader can create a rollcall and invite
travelers to it. When it's time to start the next leg of the journey, this app helps to collect
the attendance status.

The app backend is a Node & Express app with Sequelize ORM and a PostgreSQL database.

The frontend is a React/Redux app with redux-promise middleware for handling actions.

## Prerequisites

* Node & npm
* Docker and Docker compose (for running the provided [PostgreSQL docker container](docker/README.md))

## Directory layout

* `db`: Backend code for entity definitons and database connection
* `docker`: Docker-compose for PostgreSQL and project DB initialization
* `public`: The static files served by the application
* `server`: Backend code, Node & Express app
* `src`: Frontend code, React & Redux app

## Starting up

* Install dependencies: `npm install`
* Run `docker-compose up -d` in the `docker` directory to start PostgreSQL
* To populate the database with test data, run `npm run seed`. (See [seed.js](db/seed.js))
* Start the development server: `npm start`

The development server will run both the backend and the frontend build process. See the `scripts`
object in [package.json](package.json) for more info. 

## Deploying to Heroku

* Make sure you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.
* In the project's root directory, run `heroku create`. This will create the app and add the git remote.
* Create a Postgres database in Heroku: `heroku addons:create heroku-postgresql:hobby-dev`.
  * See [instructions](https://devcenter.heroku.com/articles/heroku-postgresql#using-the-cli)
  * Fetch the database credentials: `heroku pg:credentials:url DATABASE`
  * Get the database name, server, username and password from the command output and set the
    environment variables accordingly
  * heroku config:set DATABASE_NAME=DATABASE
  * heroku config:set DATABASE_HOST=(value of host from pg:credentials:url)
  * heroku config:set DATABASE_PORT=(value of port from pg:credentials:url)
  * heroku config:set DATABASE_USER=(value of user from pg:credentials:url)
  * heroku config:set DATABASE_PASSWORD=(value of password from pg:credentials:url)
* Push the app to Heroku: `git push heroku master:master`

To deploy directly from Travis CI to Heroku:
* Put the _encrypted_ Heroku API key to `.travis.yml`:
  `travis encrypt $(heroku auth:token) --add deploy.api_key`
* See
  * [Deploying to Heroku from Travis CI](https://docs.travis-ci.com/user/deployment/heroku/)
  * [Travis encryption](https://docs.travis-ci.com/user/encryption-keys/)
  * [Travis security](https://docs.travis-ci.com/user/best-practices-security/)

## License

MIT license for whatever I have written. Dependencies have their own licenses. 
