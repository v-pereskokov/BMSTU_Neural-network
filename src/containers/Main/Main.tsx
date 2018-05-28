import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Card, Col, Row, Popconfirm} from 'antd';
import styled from 'styled-components';

import {sendPack} from '../../redux/form/form.action';
import {VACANCY_FORM_NAME, TICKET_FORM_NAME, AUTO_FORM_NAME} from '../../service/Constants/Constants';
import Validators from '../../service/Validators/Validators';
import {getAttrs, OktellHandlers} from '../../service/Validators/Validators.oktell';

import Vacancy from '../../components/Vacancy/Vacancy';
import Ticket from '../../components/Ticket/Ticket';
import Auto from '../../components/Auto/Auto';

const CardWrapper = styled.div`
  .ant-card {
    min-height: 740px;
  }
  
  .ant-card-body {
    position: relative;
    top: -16px;
  }
`;

const ButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 25px;
  left: 0px;
`;

interface IProps {
  form?: any;
  suggests?: any;
  ui?: any;
  params?: any;
  submit?: (pack) => void;
  setSendLoading?: (value) => void;
}

interface IState {
  isAllOk: boolean;
}

class Main extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isAllOk: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render(): JSX.Element {
    const {form, ui} = this.props;
    const {isAllOk} = this.state;
    const {states = {}} = form;

    console.log(states.vacancy && states.vacancy.toLowerCase().indexOf('водитель') !== -1, states);

    return (
      <React.Fragment>
        <Row gutter={8}>
          <CardWrapper>
            <Col span={states.vacancy && states.vacancy.toLowerCase().indexOf('водитель') !== -1 ? 8 : 12}>
              <Card title='Вакансия'><Vacancy/></Card>
            </Col>
            {
              states.vacancy && states.vacancy.toLowerCase().indexOf('водитель') !== -1 &&
              <Col span={8}>
                <Card title='Автомобиль'><Auto/></Card>
              </Col>
            }
            <Col span={states.vacancy && states.vacancy.toLowerCase().indexOf('водитель') !== -1 ? 8 : 12}>
              <Card title='Тикет'><Ticket/></Card>
            </Col>
          </CardWrapper>
        </Row>
        <ButtonWrapper>
          <Row gutter={16}>
            <Col span={8} offset={8}>
              <Popconfirm
                title='Вы уверены, что хотите отправить? Не все данные заполнены или заполнены неверно.'
                okText='Да'
                cancelText='Нет'
                visible={!isAllOk}
                onConfirm={() => {
                  this.setState({isAllOk: true});
                  this.props.submit(this.makePack());
                }}
                onCancel={() => this.setState({isAllOk: true})}
              >
                <Button
                  type='primary'
                  style={{marginTop: '10px', width: '100%'}}
                  onClick={this.handleSubmit}
                  loading={ui.isSendLoading}
                >
                  Отправить
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </ButtonWrapper>
      </React.Fragment>
    );
  }

  public handleSubmit(event: any) {
    event.preventDefault();
    this.handleSend();
  }

  public handleSend() {
    const sendPack = this.makePack();

    console.log(sendPack);
    if (sendPack.hasOwnProperty('error')) {
      this.setState({isAllOk: false});
      return;
    }

    this.props.submit(sendPack);
  }

  public formHandle(form: any): any {
    if (!form) {
      return {error: 'bad form'};
    }

    let result = {};
    form.validateFields((err, values) => {
      result = !err ? values : {
        ...values,
        error: 'bad values'
      };

      return result;
    });
    return result;
  }

  protected makePack() {
    const {form, suggests, params} = this.props;
    const validatePack = {
      ...params,
      ...Validators.resultPack({
        ...this.formHandle(form[VACANCY_FORM_NAME]),
        ...this.formHandle(form[AUTO_FORM_NAME]),
        ...this.formHandle(form[TICKET_FORM_NAME])
      })
    };

    const helper = {pack: validatePack, suggests};
    Object.keys(validatePack).forEach(item => {
      if (OktellHandlers.hasOwnProperty(item)) {
        validatePack[item] = OktellHandlers[item].handler(Validators.getValue(validatePack[item]), ...getAttrs(OktellHandlers[item].attrs, helper));
      }
    });

    return validatePack;
  }
}

const mapStateToProps = (state: any) => {
  return {
    form: state.form,
    suggests: state.suggests,
    ui: state.ui,
    params: state.params
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    submit(pack: any) {
      dispatch(sendPack(pack));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
