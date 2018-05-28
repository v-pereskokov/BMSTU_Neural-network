import { assert } from 'chai';
import 'mocha';

import Data from './Data';
import Range from '../Range/Range';

describe('Data tests', () => {
    it('get years', () => {
        assert.deepEqual(Data.years(2015, 2017), Range(2015, 2017));
    });

    it('get months', () => {
        assert.deepEqual(Data.months(), [
            'январь',
            'февраль',
            'март',
            'апрель',
            'май',
            'июнь',
            'июль',
            'август',
            'сентябрь',
            'октябрь',
            'ноябрь',
            'декабрь'
        ]);
    });

    it('get days of january', () => {
        assert.deepEqual(Data.days('январь'), Range(1, 31));
    });

    it('get days of february usually', () => {
        assert.deepEqual(Data.days('февраль', 2017), Range(1, 28));
    });

    it('get days of february', () => {
        assert.deepEqual(Data.days('февраль', 2016), Range(1, 29));
    });

    it('get name of month by digit ', () => {
        assert.deepEqual(Data.monthNameByDigit(1), 'январь');
    });
});
