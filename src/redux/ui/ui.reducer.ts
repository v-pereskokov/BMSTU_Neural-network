import {SET_LOADING_SENDING} from './ui.constants';

const initialState = {
  isSendLoading: false
};

export function ui(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_SENDING:
      return {
        isSendLoading: action.value
      };
    default:
      return state;
  }
}
