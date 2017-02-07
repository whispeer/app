# Whispeer Messenger

This is the whispeer mobile messenger based on [Ionic 2][ionic2]. The
instructions below were written for macOS, but should apply to other
systems as well.

# Prerequisites

Make sure node and npm are installed and corresponding to the version
specified in `.nvmrc`:

    $ node -v && npm -v
    v7.5.0
    4.1.2

# Installation

To install ionic and all other dependencies, run

    $ npm install

This code repository is using an `npm-shrinkwrap.json` to ensure
deterministic dependency resolution on all workstations and deployments.
To ensure proper dependency installations in the future, some diligence
is neccessary when updating existing and installing new dependencies.
There is existing [documentation][shrinkwrap-help] on how to work with
shrinkwraps.

# Running the application

To run the messanger locally, execute

    $ npm start

This wraps `npm run ionic:serve`. All of the npm scripts wrap
[`ionic-app-scripts`][ionic-scripts], which this project is depending
upon. These are the ionic tasks available to you directly:

    npm run ionic:clean   # removes the build files
    npm run ionic:build   # builds anew
    npm run ionic:serve   # runs the dev environment


[ionic2]: https://github.com/driftyco/ionic
[shrinkwrap-help]: https://github.com/thewoolleyman/npm-shrinkwrap-helper
[ionic-scripts]: https://github.com/driftyco/ionic-app-scripts
