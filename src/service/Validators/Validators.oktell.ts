import {get} from 'lodash';
import IOktell, {MongoOptionField, OktellField} from 'oktell';

const updateListsValueMongo = (value: OktellField, ...props) => {
  const [suggests] = props;
  console.log(suggests, value);

  if (value && suggests) {
    const find: MongoOptionField | undefined = suggests.find(item => item.option_name === value);
    return find ? find.option_tag : null;
  }

  return null;
};

const updateListsValue = (value: OktellField, ...props) => {
  const [suggests, field, findParam] = props;
  return value && suggests && field ? suggests.find(item => item[field] === value)[findParam] : null;
};

const updateSimple = (value: OktellField, ...props) => value || '';
const updatePhone = (value: OktellField, ...props) => value ? `+${value}` : '';
const updateToLower = (value: OktellField, ...props) => value ? value.toLowerCase() : '';
const updateLicenseCountry = (value: OktellField, ...props) => value
  ? `${value.toLowerCase().replace(/([-()])/g, '_')}_страна_ву`
  : '';
const updateSkip = (value: OktellField, ...props) => value;
const updateModel = (value: OktellField, ...props) => value && props[0] ? `${props[0]}::${value}` : null;
const updateAutoNumber = (value: OktellField, ...props) => value ? value.trim() : '';
const updateAutoYear = (value: OktellField, ...props) => value && value.indexOf('год') === -1
  ? `${value.toLowerCase().replace(/([-()])/g, '_')}_год_выпуска`
  : value;
const updateComment = (value: OktellField, ...props) => typeof value === 'object' ? value[0] : value;
const updateTicket = (value: OktellField, ...props) => value || '0';
const updateBoolean = (value: OktellField, ...props) => {
  const [trueValue] = props;
  return trueValue ? value === trueValue : !!value;
};
const updateCallScheduledDTM = (value: OktellField, ...props) => {
  const [time] = props;
  return value && time ? `${value.format('YYYY-MM-DD')} ${time.format('HH:mm')}` : null;
};

export const OktellHandlers: IOktell = {
  vacancy: {
    handler: updateListsValueMongo,
    attrs: ['suggests/vacancy_full']
  },
  fio: {
    handler: updateSimple,
    attrs: []
  },
  bdate: {
    handler: updateSimple,
    attrs: []
  },
  telnum: {
    handler: updatePhone,
    attrs: []
  },
  city: {
    handler: updateToLower,
    attrs: []
  },
  dr_lic_country: {
    handler: updateLicenseCountry,
    attrs: []
  },
  dr_lic_number: {
    handler: updateSimple,
    attrs: []
  },
  dr_lic_date: {
    handler: updateSimple,
    attrs: []
  },
  dr_lic_end_date: {
    handler: updateSimple,
    attrs: []
  },
  yauber: {
    handler: updateBoolean,
    attrs: []
  },
  date_interview: {
    handler: updateSkip,
    attrs: []
  },
  skype_call: {
    handler: updateBoolean,
    attrs: []
  },
  personal_meeting: {
    handler: updateBoolean,
    attrs: []
  },
  own_auto: {
    handler: updateBoolean,
    attrs: ['props/auto_1']
  },
  mark: {
    handler: updateSkip,
    attrs: []
  },
  model: {
    handler: updateModel,
    attrs: ['fields/mark']
  },
  auto_number: {
    handler: updateAutoNumber,
    attrs: []
  },
  auto_year: {
    handler: updateAutoYear,
    attrs: []
  },
  auto_color: {
    handler: updateToLower,
    attrs: []
  },
  park: {
    handler: updateListsValue,
    attrs: ['suggests/taxiparks_full', 'props/taximeter_name', 'find/db_uuid']
  },
  date_visit: {
    handler: updateSkip,
    attrs: []
  },
  inline_purpose: {
    handler: updateListsValueMongo,
    attrs: ['suggests/purpose_target_full']
  },
  driver_status: {
    handler: updateListsValueMongo,
    attrs: ['suggests/driver_statuses_full/full']
  },
  reject_reason: {
    handler: updateListsValueMongo,
    attrs: ['suggests/rejects_full/full']
  },
  comment: {
    handler: updateComment,
    attrs: []
  },
  recall: {
    handler: updateBoolean,
    attrs: []
  },
  call_scheduled_dtm: {
    handler: updateCallScheduledDTM,
    attrs: ['fields/time_recall']
  },
  time_recall: {
    handler: updateSkip,
    attrs: []
  },
  id_ticket: {
    handler: updateTicket,
    attrs: []
  }
};

export function getAttrs(attrs: Array<string>, helper: { pack: any; suggests: any }): Array<any> {
  const resultAttrs: Array<any> = [];

  for (let attr of attrs) {
    const [type, ...params] = attr.split('/');
    switch (type) {
      case 'suggests':
        resultAttrs.push(get(helper.suggests, params));
        break;
      case 'fields':
        resultAttrs.push(helper.pack[params[0]]);
        break;
      case 'props':
        resultAttrs.push(params[0]);
        break;
      case 'find':
        resultAttrs.push(params[0]);
        break;
      default:
        break;
    }
  }

  return resultAttrs;
}
