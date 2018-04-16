# End to End tests #

The end to end tests are run with CodeceptJS test runner using the 
Chrome browser through Selenium server. Currently, manual steps are required
to run the tests.

## Setup things ##

### Install Selenium standalone ###

Make sure you have Chrome installed on your system. 
Run the following commands on the project root directory:

```bash
npm install -g selenium-standalone
selenium-standalone install
```


## Prepare tests ##

### Start Selenium ###

Start selenium in the project root directory:
```bash
selenium-standalone start
```

### Start the database (if not done) ###

From the project root:
```bash
cd docker
docker-compose up -d
```

### Seed the database (if not done) ###

Run in the project root:
```bash
npm run seed
```

### Build the release package and start the server ###

Run in the project root:
```bash
npm run build
npm run start
```

## Run tests ##

### Prepare the database for the tests ###

Run in the project root:
```bash
npm run prepare_e2e
```

This removes the artifacts lef by the previous E2E tests from the database.

### Run the tests ###

Run in the project root:
```bash
npm run e2e
```

Note, that you need to run the *prepare_e2e* prior to rerunning the tests!

