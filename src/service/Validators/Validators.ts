import * as moment from 'moment';
import {notification} from 'antd';

const EMPTY_VALUE: string = 'Введите значение';
const ERROR_OK_VALUE: string = 'Введите верное значение';
const ERROR_DATE: string = 'Неверная дата';
const ONE_YEAR_DIFF: number = 31535358609;
const DATE_FORMAT: string = 'DD.MM.YYYY';

export default class Validators {
  static lists(suggests: Array<any>): (rule, value, callback) => void {
    return (rule, value, callback) => {
      if (suggests.length === 0) {
        callback(ERROR_OK_VALUE);
        return;
      }

      if (!suggests.find((item: string) => typeof value === 'string' ? item === value : item === value.value)) {
        callback(ERROR_OK_VALUE);
        return;
      }

      callback();
    };
  }

  static date(min?: moment.Moment, max?: moment.Moment): (rule, value, callback) => void {
    return (rule, value, callback) => {
      if (!value) {
        callback(EMPTY_VALUE);
        return;
      }

      if (value && value.value.length < 10) {
        callback(ERROR_OK_VALUE);
        return;
      }

      if (!moment(value.value, DATE_FORMAT).isValid()) {
        callback(ERROR_DATE);
        return;
      }

      if (min) {
        const diff = moment(value.value, DATE_FORMAT).diff(min);
        if (diff < 0) {
          callback(ERROR_DATE);
          return;
        }
      }

      if (max) {
        const diff = max.diff(moment(value.value, DATE_FORMAT));
        if (diff < 0) {
          callback(ERROR_DATE);
          return;
        }
      }

      callback();
    };
  }

  static simple(rule, value, callback) {
    if (value && value.value && value.value.length > 0) {
      callback();
      return;
    }

    callback(EMPTY_VALUE);
  }

  static radio(rule, value, callback) {
    callback();
  }

  static resultPack(pack: any) {
    if (!pack.date_recall || !pack.time_recall) {
      return pack;
    }

    const diff = moment(`${pack.date_recall.format('YYYY-MM-DD')} ${pack.time_recall.format('HH:mm')}`).diff(moment());
    if (diff < 0) {
      notification['warning']({
        type: 'warning',
        message: 'Дата перезвона меньше текущей даты',
        description: ''
      });

      return {error: 'date of recall is wrong'};
    } else if (diff > ONE_YEAR_DIFF) {
      notification['warning']({
        type: 'warning',
        message: 'Дата перезвона слишком далеко',
        description: ''
      });

      return {error: 'date of recall is wrong'};
    }

    return pack;
  }

  static getValue(field): string | boolean | number {
    if (!field) {
      return '';
    }

    return typeof field.value !== 'undefined' ? field.value : field;
  }
}
