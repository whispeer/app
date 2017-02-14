# Whispeer Messenger

This is the whispeer mobile messenger based on [Ionic 2][ionic2]. The
instructions below were written for macOS, but should apply to other
systems as well.

The _Quick Start_ guide will get you up and running on a development
machine with a browser. This can be sufficient for some development
work. If running the application on simulators or actual hardware is
desired, consult the second part _Deploying to Hardware_.

## Quick Start

### Prerequisites

Make sure node and npm are installed and corresponding to the version
specified in `.nvmrc`:

    $ node -v && npm -v
    v7.5.0
    4.1.2

### Installation

To install ionic and all other dependencies, run

    $ npm install

This code repository is using an `npm-shrinkwrap.json` to ensure
deterministic dependency resolution on all workstations and deployments.
To ensure proper dependency installations in the future, some diligence
is neccessary when updating existing and installing new dependencies.
There is existing [documentation][shrinkwrap-help] on how to work with
shrinkwraps.

### Running the Application

To run the messanger locally, execute

    $ npm start

This wraps `npm run ionic:serve`. All of the npm scripts wrap
[`app-scripts`][app-scripts], which this project is depending
upon. These are the ionic tasks available to you directly:

    npm run ionic:clean   # removes the build files
    npm run ionic:build   # builds anew
    npm run ionic:serve   # runs the dev environment

## Deploying to Hardware

To install ionic and all other dependencies for running the application
on actual hardware, run

    $ npm install -g cordova ionic && npm install

In addition to these dependencies, it is currently required
to roll your own ionic-app-scripts. To install those, clone
[whispeer/ionic-app-scripts][whispeer-ionic-app-scripts] and check out
the branch `feature/multi_configs`, and link the package:

		git clone git@github.com:whispeer/ionic-app-scripts.git
		cd ionic-app-scripts
		git checkout feature/multi_config
		npm link

Change directory into your messenger repo and run

		npm link @ionic/app-scripts

### Updating Resources

There is a `resources` folder with an `icon.png` as well as a
`splash.png`. Those images can be transformed to their respectively
resized counterparts in the `resources/ios` and `resources/android`
folders with the following two commands:

    $ ionic resources --icon
    $ ionic resources --splash

Make sure to review the results before commiting. Please also note that
this _uploads_ the images to a web service and therefore needs internet
access to be performed, and also note that this will not warn you about
changing the `config.xml` of the project, replacing all previous icon
and splash screen configuration.

### Deploying to iOS

There's a [comprehensive documentation][ios-deployment] on the
deployment pipeline in cordova. To get up and running quickly, run these
commands:

    $ xcode-select --install
    $ npm install -g ios-deploy ios-sim

Make sure there is an Apple ID in the accounts tab of your Xcode
preferences. Once that is done, run a production build of the messenger
application:

    $ ionic build ios --prod

[ionic2]: https://github.com/driftyco/ionic
[shrinkwrap-help]: https://github.com/thewoolleyman/npm-shrinkwrap-helper
[app-scripts]: https://ionicframework.com/docs/v2/resources/app-scripts
[ios-deployment]: https://cordova.apache.org/docs/en/latest/guide/platforms/ios/
[whispeer-ionic-app-scripts]: https://github.com/whispeer/ionic-app-scripts
