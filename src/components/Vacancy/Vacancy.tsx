import * as React from 'react';
import {connect} from 'react-redux';
import {AutoComplete, Form, Icon, Input, Row, Col, DatePicker, Checkbox} from 'antd';
import * as moment from 'moment';

import {FormItemWrapper} from '../../themes/form';
import {addSuggests, setActiveElement, setFormData, setSuggestByName, updateSuggest} from '../../redux/form/form.action';
import {DRIVER_STATUSES_ZD_ID, EXCLUDE_VACANCIES, VACANCY_FORM_NAME, VACANCY_ZD_ID} from '../../service/Constants/Constants';
import transport from '../../service/Transport/Transport';
import Validators from '../../service/Validators/Validators';

import HandledInput from '../HandledInput/HandledInput';
import HandledAutocomplete from '../HandledAutocomplete/HandledAutocomplete';
import HandledMask from '../HandledMask/HandledMask';

const FormItem = Form.Item;

interface IProps {
  form: any;
  formInfo?: any;
  params?: any;
  suggests?: any;
  setData?: (form) => void;
  setActive?: (name, state) => void;
  setSuggestByName?: (name, url, filter?, errorCallback?, type?, data?) => void;
  setSuggests?: () => void;
  setSuggest?: (any) => void;
  getCityById?: (id) => void;
}

interface IState {
}

class Vacancy extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {setSuggestByName} = this.props;

    setSuggestByName('countries', '/node_api/country', result => result.map((item: any) => item.name));
    setSuggestByName('cities', '/node_api/city', result => result.map((item: any) => item.option_name));
    setSuggestByName(
      'vacancy',
      `/node_api/oktell_params?field_id=${VACANCY_ZD_ID}&exclude=${EXCLUDE_VACANCIES}`,
      result => result.map(item => item.option_name)
    );
  }

  public componentDidMount() {
    const {form, setData} = this.props;
    setData(form);
  }

  public render(): JSX.Element {
    const {form, formInfo, suggests, params} = this.props;
    const {getFieldDecorator} = form;
    const {states = {}} = formInfo;

    const vacancyInitValue: string = params.vacancy && suggests.vacancy
      ? suggests.vacancy.find((item: string) => item.toLowerCase() === params.vacancy.toLowerCase())
      : params.vacancy || 'Водитель';

    return (
      <Row>
        <Col>
          <FormItemWrapper>
            <Form>
              <FormItem label='Вакансия'>
                {getFieldDecorator('vacancy', {
                  initialValue: {value: vacancyInitValue},
                  rules: [{required: true, validator: Validators.lists(suggests.vacancy || [])}]
                })(<HandledAutocomplete placeholder='Водитель' data={suggests.vacancy || []} setActiveName={'vacancy'}/>)}
              </FormItem>
              <FormItem label='ФИО'>
                {getFieldDecorator('fio', {
                  initialValue: {value: params.fio || ''},
                  rules: [{required: true, validator: Validators.simple}]
                })(<HandledInput placeholder='Иванов Иван Иванович' formatter={/[a-zA-Zа-яА-Я ]/}/>)}
              </FormItem>
              <FormItem>
                <Row>
                  <Col span={11}>
                    <FormItem label='Дата рождения'>
                      {getFieldDecorator('bdate', {
                        rules: [{
                          required: true,
                          validator: Validators.date(moment('01.01.1930'), moment().subtract({years: 18}))
                        }],
                        initialValue: {value: params.bdate ? moment(params.bdate).format('DD.MM.YYYY') : ''}
                      })(<HandledMask mask='99.99.9999' placeholder='Введите дату' setActiveName={'bdate'}/>)}
                    </FormItem>
                  </Col>
                  <Col span={11} offset={2}>
                    <FormItem label='Телефон'>
                      {getFieldDecorator('telnum', {
                        initialValue: {value: params.telnum || ''},
                        rules: [{required: true, validator: Validators.simple}]
                      })(
                        <HandledInput prefix={<span>+</span>} placeholder='79990000000' formatter={/[0-9]/}/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label='Город'>
                {getFieldDecorator('city', {
                  rules: [{required: true, validator: Validators.lists(suggests.cities || [])}],
                  initialValue: {value: suggests.cities && params.city ? suggests.cities.find((item: string) => item.toLowerCase() === params.city.toLowerCase()) : params.city || ''}
                })(<HandledAutocomplete placeholder='Выберите город' data={suggests.cities || []} setActiveName={'city'}/>)}
              </FormItem>
              {
                states.vacancy && states.vacancy.toLowerCase().indexOf('водитель') !== -1 && (
                  <React.Fragment>
                    <FormItem>
                      <Row>
                        <Col span={11}>
                          <FormItem label='Страна выдачи ВУ'>
                            {getFieldDecorator('dr_lic_country', {
                              rules: [{
                                required: states.own_auto === 'auto_1',
                                validator: states.own_auto === 'auto_1' ? Validators.lists(suggests.countries || []) : (rule, value, callback) => callback()
                              }],
                              initialValue: params.dr_lic_country && suggests.countries_full ? suggests.countries_full.find(item => item.tag === params.dr_lic_country.replace('_страна_ву', '')).name : ''
                            })(
                              <AutoComplete
                                dataSource={suggests.countries || []}
                                placeholder='Выберите страну выдачи ВУ'
                                filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                              />
                            )}
                          </FormItem>
                        </Col>
                        <Col span={11} offset={2}>
                          <FormItem label='Серия и номер ВУ'>
                            {getFieldDecorator('dr_lic_number', {
                              initialValue: {value: params.dr_lic_number || ''},
                              rules: [{
                                required: states.own_auto === 'auto_1',
                                validator: states.own_auto === 'auto_1' ? Validators.simple : (rule, value, callback) => callback()
                              }]
                            })(<HandledInput placeholder='00000000000' formatter={/[a-zA-Zа-яА-Я0-9]/}/>)}
                          </FormItem>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem>
                      <Row>
                        <Col span={11}>
                          <FormItem label='Дата выдачи ВУ'>
                            {getFieldDecorator('dr_lic_date', {
                              rules: [{
                                required: states.own_auto === 'auto_1',
                                validator: states.own_auto === 'auto_1' ? Validators.date(moment().subtract({years: 40}), moment()) : (rule, value, callback) => callback()
                              }],
                              initialValue: {value: params.dr_lic_date ? moment(params.dr_lic_date).format('DD.MM.YYYY') : ''}
                            })(<HandledMask mask='99.99.9999' placeholder='Введите дату' setActiveName={'dr_lic_date'}/>)}
                          </FormItem>
                        </Col>
                        <Col span={11} offset={2}>
                          <FormItem label='Дата окончания ВУ'>
                            {getFieldDecorator('dr_lic_end_date', {
                              rules: [{
                                required: states.own_auto === 'auto_1',
                                validator: states.own_auto === 'auto_1' ? Validators.date(moment()) : (rule, value, callback) => callback()
                              }],
                              initialValue: {value: params.dr_lic_end_date ? moment(params.dr_lic_end_date).format('DD.MM.YYYY') : ''}
                            })(<HandledMask mask='99.99.9999' placeholder='Введите дату' setActiveName={'dr_lic_end_date'}/>)}
                          </FormItem>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('yauber', {
                        valuePropName: 'checked',
                        initialValue: typeof params.yauber === 'string' ? params.yauber === 'true' : !!params.yauber
                      })(
                        <Checkbox>Yandex + Uber</Checkbox>
                      )}
                    </FormItem>
                  </React.Fragment>
                )
              }
              {
                states.vacancy && states.vacancy.toLowerCase().indexOf('водитель') === -1 && (
                  <React.Fragment>
                    <FormItem label='Дата собеседования'>
                      {getFieldDecorator('date_interview', {
                        rules: [{required: false, validator: Validators.date()}]
                      })(<HandledMask mask='99.99.9999' placeholder='Введите дату' setActiveName={'date_interview'}/>)}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('skype_call', {
                        valuePropName: 'checked',
                        initialValue: false
                      })(
                        <Checkbox>Skype</Checkbox>
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('personal_meeting', {
                        valuePropName: 'checked',
                        initialValue: false
                      })(
                        <Checkbox>Очная встреча</Checkbox>
                      )}
                    </FormItem>
                  </React.Fragment>
                )
              }
            </Form>
          </FormItemWrapper>
        </Col>
      </Row>
    );
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
      dispatch(setFormData(form, VACANCY_FORM_NAME));
    },
    setActive(name: string, state: any) {
      dispatch(setActiveElement(name, state));
    },
    setSuggestByName(name: string, url: string, filter?: any, error?: () => void,
                     type: string = 'get', data: any = {}) {
      dispatch(setSuggestByName(name, url, filter, error, type, data));
    },
    setSuggest(suggest: any) {
      dispatch(addSuggests(suggest));
    },
    async getCityById(id: string) {
      const response: Response = await transport.get(`/node_api/city?city_tag=${id}`);
      const data: any = await response.json();

      dispatch(setActiveElement('city', data.length > 0
        ? {
          city_tag: data[0].option_tag,
          city: data[0].option_name
        }
        : {
          city_tag: '',
          city: ''
        }
      ));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Vacancy));
