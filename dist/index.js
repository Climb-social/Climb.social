'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rxLite = require('rx-lite');

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _url = require('url');

var getStream = function getStream(collectionId) {
    var intervalSeconds = arguments.length <= 1 || arguments[1] === undefined ? 8 : arguments[1];
    var domain = arguments.length <= 2 || arguments[2] === undefined ? 'http://app.climb.social' : arguments[2];

    if (!collectionId) {
        throw new Error('Please specify a collectionId');
    }

    if (typeof intervalSeconds !== 'number') {
        throw new Error('Polling interval should be a positive integer. A ' + typeof intervalSeconds + ' was provided.');
    }

    if (intervalSeconds <= 0) {
        throw new Error('Polling interval should be a positive integer. ' + intervalSeconds + ' was specified.');
    }

    var pollRate = intervalSeconds * 1000;

    var URL = (0, _url.resolve)(domain, '/api/v1/collections/' + collectionId);

    var requestStream = _rxLite.Observable.just(URL);

    var updateStream = _rxLite.Observable.interval(pollRate).startWith(null);

    var responseStream = updateStream.combineLatest(requestStream, function (tick, url) {
        return url;
    }).flatMap(function (baseUrl) {

        var requestUrl = '' + baseUrl;

        return _rxLite.Observable.fromPromise((0, _fetchJsonp2['default'])(requestUrl).then(function (resp) {
            return resp.json();
        }));
    });

    return responseStream;
};

exports['default'] = {
    getStream: getStream
};
module.exports = exports['default'];
