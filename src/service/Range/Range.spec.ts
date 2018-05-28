import { assert } from 'chai';
import 'mocha';

import Range from './Range';

describe('Range tests', () => {
    it('default range', () => {
        assert.deepEqual(Range(), ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    });

    it('custom range', () => {
        assert.deepEqual(Range(-3, 2), ['-3', '-2', '-1', '0', '1', '2']);
    });

    it('custom step of range', () => {
        assert.deepEqual(Range(-3, 2, 2), ['-3', '-1', '1']);
    });
});
