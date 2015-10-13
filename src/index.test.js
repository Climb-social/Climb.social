import climb from './index';
import {expect} from 'chai';
import nock from 'nock';
import jsdom from 'mocha-jsdom';

const collectionId = "561ba63445284e1740e016f7";

describe('Climb.social library', () => {

    jsdom();

    it('is defined', () => {
        expect(climb).to.be.a('object');
    });

    describe('getStream() method',() => {

        it('should exist', () => {

            expect(climb.getStream).to.be.a('function');

        });

        it('should error without a collectionId', () => {

            expect(() => {
                const subscription = climb.getStream();
            }).to.throw("Please specify a collectionId");

        });

        it('should not error with a collectionId', () => {

            expect(() => {
                const stream = climb.getStream(collectionId);
            }).to.not.throw();

        });

        it('should return an object with a `subscribe()` method (an Observable)', () => {

            const stream = climb.getStream(collectionId);
            expect(stream.subscribe).to.be.a('function')

        });

        xit('should make HTTP requests to Climb.social', () => {

        });

    });

});
