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

Make sure node is installed and corresponding to the version specified
in `.nvmrc`, as well as [yarn][yarn]. Yarn can be installed using `npm i
-g yarn`, when `npm` is available.

	$ node -v && yarn --version
	v7.5.0
	0.20.3

### Installation

To install some of the required whispeer dependencies run

	$ git submodule update --init

To install ionic and all other dependencies, run

	$ yarn

This code repository is using a `yarn.lock` to ensure deterministic
dependency resolution on all workstations and deployments. Please commit
your yarn.lock after adding new dependencies or if it changed.

### Running the Application

To run the messanger locally, execute

	$ yarn start

This wraps `yarn run ionic:serve`. All of the yarn scripts wrap
[`app-scripts`][app-scripts], which this project is depending
upon. These are the ionic tasks available to you directly:

	$ yarn run ionic:clean   # removes the build files
	$ yarn run ionic:build   # builds anew
	$ yarn run ionic:serve   # runs the dev environment

## Deploying to Hardware

To install ionic and all other dependencies for running the application
on actual hardware, run

	$ yarn global add cordova ionic && yarn

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
	$ yarn global add ios-deploy ios-sim

In addition to that, you will need to install [Cocoapods][cocoapods] and
make sure it is available in your project:

	$ pod --version
	1.2.0

When `pod` is installed, run `pod setup` at least once.

There should be an Apple ID in the accounts tab of your Xcode
preferences. Once that is done, run a production build of the messenger
application:

	$ ionic platform add ios
	$ ionic build ios --prod

When those commands succeed, open the generated Xcode project and
compile for the simulator or a physical device that is connected.

	$ open ./platforms/ios/whispeer\ Messenger.xcodeproj

Make sure that Push Notifications in the Tab Capabilities are switched on.

### Publishing to App Store

Click on Product -> Archive. XCode will start building the project.
After finishing the Organizer will open, showing you all your Archives. The Archive that was just created is marked per default. Click on "Upload to App Store..." in the right panel.
If you are asked to select a team, select "mindpost GmbH" and click choose.
Now just click proceed until XCode uploads your Archive to iTunes Connect.
After a successful upload you will get an e-mail that your build is being processed and after succeeding this automatic check you can enable the build for Testflight or the live Store.

[ionic2]: https://github.com/driftyco/ionic
[yarn]: https://yarnpkg.com/en/docs/install
[cocoapods]: https://cocoapods.org/
[app-scripts]: https://ionicframework.com/docs/v2/resources/app-scripts
[ios-deployment]: https://cordova.apache.org/docs/en/latest/guide/platforms/ios/
[whispeer-ionic-app-scripts]: https://github.com/whispeer/ionic-app-scripts
