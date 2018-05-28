import * as React from 'react';
import styled from 'styled-components';

import './Info.scss';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

interface IProps {
  type: 'Forbidden' | 'Development';
}

interface IState {
}

export default class Info extends React.Component<IProps, any> {
  render() {
    return (
      <Wrapper>
        <div>
          <h1 style={{textAlign: 'center', fontSize: '24pt'}}>В разработке</h1>
          <img className='info__img' src={require(`./imgs/${this.props.type}.svg`)}/>
        </div>
      </Wrapper>
    );
  }
}
