import {Observable} from 'rx-lite';
import fetchJsonp from 'fetch-jsonp';

const getStream = (collectionId) => {

    const pollRate = 5 * 1000;

    const requestStream = Observable.just(`http://app.climb.social/api/v1/collections/${collectionId}`);

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
