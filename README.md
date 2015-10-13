# Climb.social
JS library for interacting with the Climb.social API.

Provides an [RxJS Observable](http://reactivex.io/) of _pages_ of approved items for use in JS applications.

## Installation

    npm install climb-social

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
