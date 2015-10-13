# Climb.social

[![Travis build](https://img.shields.io/travis/Climb-social/climb-social.svg?style=flat-square)](https://travis-ci.org/Climb-social/climb-social)

JS library for interacting with the [Climb.social](http://climb.social/) [API](http://docs.climbsocial.apiary.io/).

Provides an [RxJS Observable](http://reactivex.io/) of _pages_ of approved items for use in JS applications.

## Description

The default exports of the module exposes a `getStream` method that accepts a `collectionId` which you can _subscribe_ to.

## Installation

    npm install climb-social --save-dev

## Usage

    var climb = require('climb-social');

    climb
        .getStream(<collectionId>)
        .subscribe(function(items) {

            // i.e. Do something with items:
            items.map(function(item) {
                console.log(item.author.username);
            });

        });
