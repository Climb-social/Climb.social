# Climb.social

[![Travis build](https://img.shields.io/travis/Climb-social/climb-social.svg?style=flat-square)](https://travis-ci.org/Climb-social/climb-social)

JS library for interacting with the [Climb.social](http://climb.social/) [API](http://docs.climbsocial.apiary.io/).

Provides an [RxJS Observable](http://reactivex.io/) of _pages_ of approved items for use in JS applications.

## Description

The default exports of the module exposes a `getStream` method that accepts a `collectionId` which you can _subscribe_ to.

## Installation

    npm install climb-social --save-dev

## Usage

### Getting approved items from your Climb.social collection

    var climb = require('climb-social');

    var collectionId = '561ba63445284e1740e016f7';

    climb
        .getStream(collectionId)
        .subscribe(function(items) {

            // i.e. Do something with items:
            items.map(function(item) {
                console.log(item.author.username);
            });

        });

### Specifying a polling interval

You can also specify how often you'd like to poll the Climb.social API for changes.

Pass a positive number (representing the number of seconds) as a second arg to `getStream()`:

    climb
        .getStream(collectionId, 40)
        .subscribe(function(items) {
            ...
        });
    });
