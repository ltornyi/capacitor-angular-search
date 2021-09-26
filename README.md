# CapacitorAngularSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Search functionality

Added bootstrap@3 to the project.
Added search module, search page and search service.
Cleaned up tests.

This is commit "Search functionality".

## Prepare for iOS development

    brew install cocoapods

install xcode from the app store

    xcode-select --install

This can be useful if later xcodebuild complains about the command line tools instance:

    sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

Set up your developer account in Xcode in preferences->Accounts

## Add capacitor to the project

    npm install @capacitor/core
    npm install @capacitor/cli --save-dev

    npx cap init

Name of your app: capacitor-angular-search
Package ID: com.ltornyi.capacitorAngularSearch

## Add iOS platform to the project

    npm install @capacitor/ios
    npx cap add ios

    cd ios/App
    pod install

## Open iOS project in XCode

    npx cap open ios

Choose the team in XCode

## Build web project to prepare native project

    npm run build

(make sure you have the proper path in capacitor.config.ts in webDir property)

## Copy/Sync and run native project

If you are only making changes to the web project, then `sync` below is not necessary.

    npx cap copy
    npx cap sync
    npx cap open ios

and run from XCode OR

    npx cap run

## Publish your app

https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/
