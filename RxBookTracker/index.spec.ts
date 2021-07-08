import { TestScheduler } from 'rxjs/testing';
import { expect } from 'chai';

describe('RxBookTracker Tests', () => {
    let scheduler;

    beforeEach(() => {
        scheduler = new TestScheduler((actual, expected) => {
            expect(actual).deep.equal(expected);
        });
    });

    it('produces a single value and completion message', () => {+
        scheduler.run(helpers => {
            const source$ = helpers.cold('a|');
            const expected = 'a!';
            helpers.expectObservable(source$).toBe(expected);
        });
    });

    it('test 2', () => {

    });

    it('test 3', () => {

    });
});