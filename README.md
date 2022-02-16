# Telus Agriculture Coding Challenge

This is a blank React 11.x starter project to test potential developers.  It includes a simple api server for your react application to consume and persist data from.

## Prerequisites

- Installation of NodeJs 16.x
- Git
- Code Editor IDE (Visual Studio Code, Webstorm, etc...)

## Installation

- Fork the project to your Github Account (sign up for one if you don't have one)
- Clone the project from your Github account (Not Telus Agriculture's) to your local machine.  You will be submitting your code for review from your repository
- Run `npm install` to install the latest dependencies

## API Server

Run `npm run start:api` for the api server.  Navigate to [http://localhost:4500/](http://localhost:4500/) to explore the api server.  It includes basic endpoints for a "people" object.

- GET    /people    [http://localhost:4500/people](http://localhost:4500/people)
- GET    /people/1  [http://localhost:4500/people/6026f08fffabf364acbfca9a](http://localhost:4500/people/6026f08fffabf364acbfca9a)
- POST   /people
- PUT    /people/1
- PATCH  /people/1
- DELETE /people/1

To learn more about the json server, visit [json-server](https://www.npmjs.com/package/json-server)

## Development server

Run `npm run start` for a dev server. Navigate to [http://localhost:4400/](http://localhost:4400/). The app will automatically reload if you change any of the source files.
