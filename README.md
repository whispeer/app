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

    $ npm run

[ionic2]: https://github.com/driftyco/ionic
[shrinkwrap-help]: https://github.com/thewoolleyman/npm-shrinkwrap-helper
