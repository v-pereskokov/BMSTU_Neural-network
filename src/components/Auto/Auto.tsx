import * as React from 'react';
import {connect} from 'react-redux';
import {AutoComplete, Form, Icon, Input, Row, Col, Switch, Radio} from 'antd';

import {FormItemWrapper} from '../../themes/form';
import {addSuggests, setActiveElement, setFormData, setSuggestByName} from '../../redux/form/form.action';
import {AUTO_FORM_NAME, VACANCY_FORM_NAME} from '../../service/Constants/Constants';
import Data from '../../service/Data/Data';
import transport from '../../service/Transport/Transport';
import Validators from '../../service/Validators/Validators';

import HandledInput from '../HandledInput/HandledInput';
import HandledRadio from '../HandledRadio/HandledRadio';
import HandledAutocomplete from '../HandledAutocomplete/HandledAutocomplete';
import HandledMask from '../HandledMask/HandledMask';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface IProps {
  form: any;
  formInfo?: any;
  params?: any;
  suggests?: any;
  setData?: (form) => void;
  setActive?: (name, state) => void;
  onMarkSelect?: (model) => void;
  setSuggestByName?: (name, url, filter?, errorCallback?, type?, data?) => void;
  setSuggests?: () => void;
  setSuggest?: (any) => void;
  getParkById?: (id) => void;
  getAutoById?: (id) => void;
}

interface IState {
}

class Auto extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const {getAutoById, getParkById, setSuggestByName, params, formInfo} = this.props;

    if (params && params.auto_model) {
      getAutoById(params.auto_model);
    }

    if (params && params.park) {
      getParkById(params.park);
    }

    const city: string = formInfo.states.city || params.city || null;
    setSuggestByName(
      'marks',
      '/node_api/get_marks',
      result => result.map(item => item.id)
    );
    setSuggestByName(
      'colors',
      '/node_api/colors',
      result => result.map(item => item.name)
    );
    setSuggestByName(
      'taxiparks',
      '/node_api/taxiparks',
      result => city
        ? result
          .filter(item => item.city.toLowerCase() == city.toLowerCase())
          .map(item => item.taximeter_name)
        : []
    );
  }

  public componentDidMount() {
    const {form, setData} = this.props;
    setData(form);
  }

  public render(): JSX.Element {
    const {form, formInfo, params, suggests, onMarkSelect} = this.props;
    const {getFieldDecorator} = form;
    const {states = {}} = formInfo;

    let ownAutoValue = 'auto_1';
    if (typeof params.own_auto === 'string') {
      if (params.own_auto !== 'true') {
        ownAutoValue = 'auto_2';
      }
    }

    const city = formInfo.states.city || null;
    const parks = city && suggests.taxiparks_full
      ? suggests.taxiparks_full
        .filter(item => item.city.toLowerCase().indexOf(city.toLowerCase()) !== -1)
        .map(item => item.taximeter_name)
        .filter((value, index, self) => self.indexOf(value) === index)
      : [];

    return (
      <Row>
        <Col>
          <FormItemWrapper>
            <Form>
              <FormItem>
                {getFieldDecorator('own_auto', {
                  rules: [{required: true, validator: Validators.radio}],
                  initialValue: {value: ownAutoValue}
                })(<HandledRadio name='auto' setActiveName={'own_auto'}/>)}
              </FormItem>
              {
                states.own_auto === 'auto_1' && (
                  <React.Fragment>
                    <FormItem>
                      <Row>
                        <Col span={11}>
                          <FormItem label='Марка'>
                            {getFieldDecorator('mark', {
                              rules: [{required: states.own_auto === 'auto_1', validator: Validators.lists(suggests.marks || [])}],
                              initialValue: {value: formInfo.states && formInfo.states.auto ? formInfo.states.auto.mark : ''}
                            })(<HandledAutocomplete placeholder='Выберите марку' data={suggests.marks || []} setActiveName='mark' onPick={onMarkSelect}/>)}
                          </FormItem>
                        </Col>
                        <Col span={11} offset={2}>
                          <FormItem label='Модель'>
                            {getFieldDecorator('model', {
                              rules: [{required: states.own_auto === 'auto_1', validator: Validators.lists(suggests.models || [])}],
                              initialValue: formInfo.states && formInfo.states.auto ? formInfo.states.auto.model : ''
                            })(
                              <AutoComplete
                                dataSource={suggests.models || []}
                                placeholder='Выберите модель'
                                filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                              />
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem>
                      <Row>
                        <Col span={11}>
                          <FormItem label='Госномер'>
                            {getFieldDecorator('auto_number', {
                              initialValue: {value: params.auto_number || ''},
                              rules: [{required: states.own_auto === 'auto_1', validator: Validators.simple}]
                            })(<HandledInput placeholder='A000AA777' formatter={/[a-zA-Zа-яА-Я0-9]/}/>)}
                          </FormItem>
                        </Col>
                        <Col span={11} offset={2}>
                          <FormItem label='Год выпуска'>
                            {getFieldDecorator('auto_year', {
                              rules: [{required: states.own_auto === 'auto_1', validator: Validators.lists(Data.years(1991))}],
                              initialValue: params.auto_year ? params.auto_year.replace('_год_выпуска', '') : ''
                            })(
                              <AutoComplete
                                dataSource={Data.years(1991).reverse()}
                                placeholder='Выберите год выпуска'
                                filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                              />
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem label='Цвет'>
                      {getFieldDecorator('auto_color', {
                        rules: [{required: states.own_auto === 'auto_1', validator: Validators.lists(suggests.colors || [])}],
                        initialValue: params.auto_color || ''
                      })(
                        <AutoComplete
                          dataSource={suggests.colors || []}
                          placeholder='Выберите цвет'
                          filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />
                      )}
                    </FormItem>
                  </React.Fragment>
                )
              }
              <FormItem label='Таксопарк'>
                {getFieldDecorator('park', {
                  rules: [{required: true, validator: Validators.lists(parks || [])}],
                  initialValue: formInfo.states && formInfo.states.park ? formInfo.states.park.park : ''
                })(
                  <AutoComplete
                    dataSource={parks}
                    placeholder='Выберите таксопарк'
                    filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  />
                )}
              </FormItem>
              <FormItem label='Дата визита'>
                {getFieldDecorator('date_visit', {
                  rules: [{required: false}]
                })(<HandledMask mask='99.99.9999' placeholder='Введите дату' setActiveName={'date_visit'}/>)}
              </FormItem>
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
      dispatch(setFormData(form, AUTO_FORM_NAME));
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
    async getParkById(id: string) {
      const response: Response = await transport.get(`/node_api/get_park?db_uuid=${id}`);
      const park: any = await response.json();

      dispatch(setActiveElement('park', park.city
        ? {
          park_tag: id,
          park: park.taximeter_name
        }
        : {
          park_tag: '',
          park: 'Неверный id'
        }
      ));
    },
    async getAutoById(id: string) {
      const response: Response = await transport.get(`/node_api/get_auto_by_id?_id=${id}`);
      const auto: any = await response.json();
      const [mark, model] = auto.option_name
        ? auto.option_name.split('::')
        : ['', ''];

      dispatch(setActiveElement('auto', {mark, model}));

      if (mark) {
        try {
          const result: any = await (await transport.post('/node_api/get_model', {model: mark})).json();

          dispatch(addSuggests({
            models_full: result,
            models: result.map(item => item.value)
          }));
        } catch (e) {
          console.log('models', '/node_api/get_model', e);
        }
      }
    },
    onMarkSelect(model: string) {
      dispatch(setSuggestByName(
        'models',
        '/node_api/get_model',
        result => result.map(item => item.value),
        null,
        'post',
        {model}
      ));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Auto));
