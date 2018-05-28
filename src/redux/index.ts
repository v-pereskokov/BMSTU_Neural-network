import {combineReducers} from 'redux';

import {form, params, suggests} from './form/form.reducer';
import {ui} from './ui/ui.reducer';

export default combineReducers({
  ui,
  form,
  suggests,
  params
});
