import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Switch} from 'react-router';
import {Layout} from 'antd';

import {parseAll, wordToBeauty} from '../../service/UrlParser/UrlParser';
import {changeDate} from '../../service/Utils/Utils';
import {addParams, setActiveElement} from '../../redux/form/form.action';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './App.scss';

const {Content} = Layout;

interface IProps {
  routes: JSX.Element;
  setParams?: (params) => void;
  setActive?: (name, value) => void;
}

class App extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);

    const params: any = parseAll(window.location.href);
    const {setParams, setActive} = this.props;

    setParams({
      ...params,
      dr_lic_date: changeDate(params.dr_lic_date),
      dr_lic_end_date: changeDate(params.dr_lic_end_date),
      bdate: changeDate(params.bdate),
      id_ticket: params.id_ticket || '0',
      auto_color: params.auto_color ? wordToBeauty(params.auto_color) : ''
    });

    console.log(params);
    setActive('driver_status', params.driver_status);
    setActive('vacancy', params.vacancy);
  }

  public render(): JSX.Element {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Layout>
          <Content style={{margin: '0 16px'}}>
            <Switch>
              {this.props.routes}
            </Switch>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setParams(params: any) {
      dispatch(addParams(params));
    },
    setActive(name: string, state: string) {
      dispatch(setActiveElement(name, state));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
