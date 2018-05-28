import FORM_CONSTANTS from './form.constants';

const initialState: any = {};

export function form(state: any = initialState, action: any = {}): any {
  switch (action.type) {
    case FORM_CONSTANTS.SET_FORM_DATA:
      return {
        ...state,
        [action.formType]: action.form
      };
    case FORM_CONSTANTS.SET_ACTIVE_ELEMENT:
      const states = state.states || {};

      return {
        ...state,
        states: {
          ...states,
          [action.stateName]: action.stateValue
        }
      };
    case FORM_CONSTANTS.SET_VALUE:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          [action.name]: action.value
        }
      };
    default:
      return state;
  }
}

export function suggests(state: any = {}, action: any = {}): object {
  switch (action.type) {
    case FORM_CONSTANTS.ADD_SUGGEST:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}

export function params(state: any = {}, action: any = {}): object {
  switch (action.type) {
    case FORM_CONSTANTS.ADD_PARAMS:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}
