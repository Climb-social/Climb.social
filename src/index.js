import {Observable} from 'rx-lite';
import fetchJsonp from 'fetch-jsonp';
import {resolve, parse} from 'url';

const getStream = (
  collectionId,
  intervalSeconds = 8,
  domain = 'http://app.climb.social'
) => {

    if (!collectionId) {
        throw new Error('Please specify a collectionId');
    }

    if (typeof(intervalSeconds) !== 'number') {
        throw new Error(`Polling interval should be a positive integer. A ${typeof(intervalSeconds)} was provided.`);
    }

    if (intervalSeconds <= 0) {
        throw new Error(`Polling interval should be a positive integer. ${intervalSeconds} was specified.`);
    }

    const pollRate =  intervalSeconds * 1000;

    const URL = resolve(domain, `/api/v1/collections/${collectionId}`);

    const requestStream = Observable.just(URL);

    const updateStream = Observable.interval(pollRate).startWith(null);

    const responseStream = updateStream

        .combineLatest(requestStream, (tick, url) => {
            return url;
        })

        .flatMap(baseUrl => {

            const requestUrl = `${baseUrl}`;

            return Observable.fromPromise(
                fetchJsonp(requestUrl)
                    .then(resp => {
                        return resp.json();
                    })
            );
        });

    return responseStream;
};

export default {
    getStream
};
