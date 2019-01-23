# SparkNetworksProject
This repository is for my Spark Networks coding exercise.

For my exercise I decided to tackle the [editable profile](https://github.com/sparknetworks/coding_exercises_options/tree/master/editable_profile)  project.

# Server

## Project Setup
Prerequisites:
 - Mongo DB 
 - Node.js >= 8

#Install Dependencies
Execute npm install in the client directory to install dependencies.

Scripts:
- npm start - Starts the server in development mode
- npm test -  Executes tests in the ./server/test directory

## Technologies:
I chose to use Node.js for server side technology using the following modules:
- **boom** -     			HTTP-friendly error objects.
- **dotenv** - 				Zero-dependency module that loads environment variables.
- **hapi** - 					A rich framework for building applications and services.
- **hapi-mongodb**  - A simple Hapi MongoDB connection plugin.
- **hapi-pino** - 			Hapi plugin for the Pino logger. It logs in JSON for easy post-processing.
- **joi** - 						Object schema description language and validator for JavaScript objects.


# Client

## Project Setup
Prerequisites:
 - Angular CLI 
 - Node.js >= 8

#Install Dependencies
Execute npm install in the client directory to install dependencies.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).