import {assert} from 'chai';
import 'mocha';

import Validators from './Validators';

describe('Validators tests', () => {
  it('check get value from obj {value: string}', () => {
    assert.deepEqual(Validators.getValue({value: 'test'}), 'test');
  });

  it('check get value from string', () => {
    assert.deepEqual(Validators.getValue('test'), 'test');
  });

  it('check get value from undefined', () => {
    assert.deepEqual(Validators.getValue(undefined), '');
  });

  it('check get value from number', () => {
    assert.deepEqual(Validators.getValue(12), '12');
  });

  it('check get value from obj with empty string {value: string}', () => {
    assert.deepEqual(Validators.getValue({value: ''}), '');
  });
});
