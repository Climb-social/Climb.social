'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var getStream = function getStream(collectionId) {

    var pollRate = 5 * 1000;

    var requestStream = Rx.Observable.just('http://app.climb.social/api/v1/collections/' + collectionId);

    var updateStream = Rx.Observable.interval(pollRate).startWith(null);

    var responseStream = updateStream.combineLatest(requestStream, function (tick, url) {
        return url;
    }).flatMap(function (baseUrl) {

        var requestUrl = '' + baseUrl;

        return Rx.Observable.fromPromise((0, _fetchJsonp2['default'])(requestUrl).then(function (resp) {
            return resp.json();
        }));
    });

    return responseStream;
};

exports['default'] = {
    getStream: getStream
};
module.exports = exports['default'];
