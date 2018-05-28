import {SET_LOADING_SENDING} from './ui.constants';

export function setSendLoading(value: boolean): object {
  return {
    type: SET_LOADING_SENDING,
    value
  };
}
