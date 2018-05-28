import * as React from 'react';
import {connect} from 'react-redux';
import {AutoComplete, Form, Input, Row, Col, TimePicker, DatePicker, Checkbox} from 'antd';
import {get} from 'lodash';

import {FormItemWrapper} from '../../themes/form';
import {addSuggests, setActiveElement, setFormData, setSuggestByName} from '../../redux/form/form.action';
import {PURPOSE_TARGETS_ZD_ID, TICKET_FORM_NAME} from '../../service/Constants/Constants';
import transport from '../../service/Transport/Transport';
import Validators from '../../service/Validators/Validators';

import HandledAutocomplete from '../HandledAutocomplete/HandledAutocomplete';

const FormItem = Form.Item;
const {TextArea} = Input;

interface IProps {
  form: any;
  formInfo?: any;
  suggests?: any;
  params?: any;
  setData?: (form) => void;
  setSuggestByName?: (name, url, filter?, errorCallback?, type?, data?) => void;
  setSuggests?: () => void;
  setSuggest?: (any) => void;
  getFieldByOptionTag?: (tag, field, url) => void;
}

interface IState {
}

class Ticket extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const {setSuggestByName} = this.props;

    setSuggestByName('driver_statuses', `/node_api/get_driver_statuses`, result => {
      return {
        driverStatuses: result.driverStatuses.map(item => item.option_name),
        noDriverStatuses: result.noDriverStatuses.map(item => item.option_name)
      };
    });
    setSuggestByName('purpose_target', `/node_api/oktell_params?field_id=${PURPOSE_TARGETS_ZD_ID}`, result => result.map(item => item.option_name));
    setSuggestByName('rejects', `/node_api/get_rejects`, result => {
      return {
        driverStatuses: result.driverStatuses.map(item => item.option_name),
        noDriverStatuses: result.noDriverStatuses.map(item => item.option_name)
      };
    });
  }

  public componentDidMount() {
    const {form, setData} = this.props;
    setData(form);
  }

  public render(): JSX.Element {
    const {form, formInfo, params, suggests} = this.props;
    const {getFieldDecorator} = form;

    const recall: boolean = form.getFieldValue('recall');

    const driverStatusesFull: Array<any> = this.getDifficultList('driver_statuses', true);
    const driverStatuses: Array<any> = this.getDifficultList('driver_statuses');
    const driverRejectsFull: Array<any> = this.getDifficultList('rejects', true);
    const driverRejects: Array<any> = this.getDifficultList('rejects');

    const inlinePurposeInitValue: string = params.inline_purpose && suggests.purpose_target_full
      ? suggests.purpose_target_full.find(item => item.option_tag === params.inline_purpose).option_name
      : '';
    const driverStatusInitValue: string = params.driver_status && driverStatusesFull.length > 0
      ? driverStatusesFull.find(item => item.option_tag === params.driver_status).option_name
      : '';
    const rejectReasonInitValue: string = params.reject_reason && driverRejectsFull.length > 0
      ? driverRejectsFull.find(item => item.option_tag === params.reject_reason).option_name
      : '';
    const rejectReasonValue: {value: string} = form.getFieldValue('driver_status');

    return (
      <Row>
        <Col>
          <FormItemWrapper>
            <Form>
              <FormItem label='Цель обращения'>
                {getFieldDecorator('inline_purpose', {
                  rules: [{required: true, validator: Validators.lists(suggests.purpose_target || [])}],
                  initialValue: {value: inlinePurposeInitValue}
                })(<HandledAutocomplete placeholder='Выберите цель обращения' data={suggests.purpose_target || []} setActiveName={'inline_purpose'}/>)}
              </FormItem>
              <FormItem label='Статус кандидата'>
                {getFieldDecorator('driver_status', {
                  initialValue: {value: driverStatusInitValue},
                  rules: [{required: true, validator: Validators.lists(driverStatuses)}]
                })(
                  <HandledAutocomplete
                    placeholder='Выберите статус кандидата'
                    data={driverStatuses}
                    setActiveName={'driver_status'}
                  />
                )}
              </FormItem>
              {
                rejectReasonValue && rejectReasonValue.value.toLowerCase().indexOf('не лид') !== -1 && (
                  <React.Fragment>
                    <FormItem label='Причина отказа'>
                      {getFieldDecorator('reject_reason', {
                        rules: [{required: true, validator: Validators.lists(driverRejects)}],
                        initialValue: rejectReasonInitValue
                      })(
                        <AutoComplete
                          dataSource={driverRejects}
                          placeholder='Выберите причину отказа'
                          filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />
                      )}
                    </FormItem>
                  </React.Fragment>
                )
              }
              <FormItem label='Комментарий'>
                {getFieldDecorator('comment', {
                  rules: [{required: false, message: 'Введите значение'}],
                  initialValue: [params.comment || '']
                })(<TextArea/>)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('recall', {
                  valuePropName: 'checked',
                  initialValue: false,
                  rules: [{
                    required: false,
                    validator: (rule, value, callback) => {
                      if (value) {
                        this.props.form.setFieldsValue({driver_status: {value: '2. Перезвонить'}});
                      }

                      callback();
                    }
                  }],
                })(
                  <Checkbox>Перезвонить</Checkbox>
                )}
              </FormItem>
              {
                recall && <React.Fragment>
                  <FormItem>
                    <Row>
                      <Col span={11}>
                        <FormItem label='Дата звонка'>
                          {getFieldDecorator('call_scheduled_dtm', {
                            rules: [{required: false, message: 'Заполните поле'}]
                          })(
                            <DatePicker style={{width: '100%'}} format='DD.MM.YYYY' placeholder='Выберите дату'/>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={11} offset={2}>
                        <FormItem label='Время звонка'>
                          {getFieldDecorator('time_recall', {
                            rules: [{required: false, message: 'Заполните поле'}]
                          })(
                            <TimePicker style={{width: '100%'}} minuteStep={30} format={'HH:mm'} placeholder='Выберите время'/>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </FormItem>
                </React.Fragment>
              }
            </Form>
          </FormItemWrapper>
        </Col>
      </Row>
    );
  }

  protected getDifficultList(suggestType: string, isFull: boolean = false): Array<any> {
    const {suggests, formInfo} = this.props;
    const {states = {}} = formInfo;

    return suggests[suggestType] && states.vacancy
      ? get(
        suggests,
        [
          `${suggestType}${isFull ? '_full' : ''}`,
          states.vacancy.toLowerCase().indexOf('водитель') !== -1 ? 'driverStatuses' : 'noDriverStatuses'
        ]
      )
      : [];
  }
}

const mapStateToProps = (state: any) => {
  return {
    formInfo: state.form,
    suggests: state.suggests,
    params: state.params
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setData(form: any) {
      dispatch(setFormData(form, TICKET_FORM_NAME));
    },
    setSuggestByName(name: string, url: string, filter?: any, error?: () => void,
                     type: string = 'get', data: any = {}) {
      dispatch(setSuggestByName(name, url, filter, error, type, data));
    },
    setSuggest(suggest: any) {
      dispatch(addSuggests(suggest));
    },
    async getFieldByOptionTag(tag: string, field: string, url: string) {
      const response: Response = await transport.get(`/node_api/${url}${url.indexOf('?') === -1 ? '?' : '&'}option_tag=${tag}`);
      const result: any = await response.json();

      dispatch(setActiveElement('city', {
        [field]: result.length > 0 ? result[0].option_name : 'Пусто',
        [`${field}_tag`]: tag
      }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Ticket));
