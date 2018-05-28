import * as React from 'react';
import {notification} from 'antd';
import FORM_CONSTANTS from './form.constants';

import transport from '../../service/Transport/Transport';
import {setSendLoading} from '../ui/ui.action';

export function setFormData(form: any, formType: string): any {
  return {
    type: FORM_CONSTANTS.SET_FORM_DATA,
    form,
    formType
  };
}

export function setActiveElement(stateName: string, stateValue: any): any {
  return {
    type: FORM_CONSTANTS.SET_ACTIVE_ELEMENT,
    stateName,
    stateValue
  };
}

export function addSuggests(data: any): object {
  return {
    type: FORM_CONSTANTS.ADD_SUGGEST,
    data
  };
}

export function addParams(data: any): object {
  return {
    type: FORM_CONSTANTS.ADD_PARAMS,
    data
  };
}

export function sendPack(pack: any) {
  return async dispatch => {
    dispatch(setSendLoading(true));

    try {
      const response: Response = await transport.post('/submit/oktell_ticket', pack);
      if (response.status < 300) {
        notification['success']({
          type: 'success',
          message: 'Данные успешно отправлены',
          description: 'Через 3 секунды сайт будет перезагружен'
        });
        setTimeout(() => {
          location.href = `${location.protocol}//${location.host}`;
        }, 3000);
      } else {
        notification['error']({
          type: 'error',
          message: 'Произошла ошибка. Пожалуйста, напишите @iloveydi !',
          description: ''
        });
      }
    } catch (e) {
      console.log(e);
    }

    dispatch(setSendLoading(false));
  };
}

export function setSuggestByName(name: string, url: string, filter?: any, error?: () => void,
                                 type: string = 'get', data: any = {}) {
  return async dispatch => {
    try {
      const result: any = await
        (await (type === 'get' ? transport.get(url) : transport.post(url, data)))
          .json();

      dispatch(addSuggests({
        [`${name}_full`]: result,
        [name]: filter ? filter(result) : result
      }));
    } catch (e) {
      console.log(name, url, e);
      error ? error() : console.log(e);
    }
  };
}

export function updateSuggest(name: string, suggest: Array<any>, filter: any) {
  return async dispatch => {
    dispatch(addSuggests({
      [name]: filter ? filter(suggest) : []
    }));
  };
}

export function setValue(formType: string, field: string, value: string): any {
  return {
    type: FORM_CONSTANTS.SET_VALUE,
    formType,
    field,
    value
  };
}
