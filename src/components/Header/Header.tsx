import * as React from 'react';
import {connect} from 'react-redux';
import {Layout, Row, Col, Button} from 'antd';

import './Header.scss';

const AntdHeader = Layout.Header;

interface IProps {
  user?: any; // TODO: add interface of user
}

class Header extends React.Component<IProps, any> {
  render() {
    const {user = 'Супердлинное имя пользователя'} = this.props;

    return (
      <AntdHeader style={{background: '#fff', padding: 0}}>
        <Row>
          <Col span={8} className='header__logo-text'>Центр найма водителей</Col>
          <Col span={8} offset={4}>{user.length > 20 ? `${user.slice(0, 20)}...` : user}</Col>
          <Col span={2} offset={1}><Button>Выйти</Button></Col>
        </Row>
      </AntdHeader>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
