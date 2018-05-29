import * as React from 'react';
import {Button, Col, Input, Layout, Radio, Row, Tooltip} from 'antd';

const {Content} = Layout;
const RadioGroup = Radio.Group;

interface IState {
  preloader: boolean;
  xDot: string;
  yDot: string;
  xCluster: string;
  yCluster: string;
}

export default class App extends React.Component<any, IState> {
  private canvas: HTMLCanvasElement;

  constructor(props) {
    super(props);

    this.state = {
      preloader: false,
      xDot: '',
      yDot: '',
      xCluster: '',
      yCluster: ''
    }
  }

  public render(): JSX.Element {
    const {preloader, xDot, yDot, xCluster, yCluster} = this.state;

    return (
      <Layout style={{minHeight: '100vh'}}>
        <Layout>
          <Content style={{margin: '0 16px'}}>
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={6}>
                    <p>Точки:</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Input placeholder='x' value={xDot} onChange={event => this.setState({xDot: event.target.value})}/>
                  </Col>
                  <Col span={6}>
                    <Input placeholder='y' value={yDot} onChange={event => this.setState({yDot: event.target.value})}/>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Tooltip title='Добавить' mouseLeaveDelay={0}>
                      <Button
                        icon='plus'
                        type='default'
                        onClick={() => ''}
                        style={{width: '100%'}}
                      />
                    </Tooltip>
                  </Col>
                  <Col span={6}>
                    <Tooltip title='Генерировать' mouseLeaveDelay={0}>
                      <Button
                        icon='setting'
                        type='default'
                        onClick={() => this.setRandom(true)}
                        style={{width: '100%'}}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={6}>
                    <p>Кластер:</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Input placeholder='x' value={xCluster}
                           onChange={event => this.setState({xCluster: event.target.value})}/>
                  </Col>
                  <Col span={6}>
                    <Input placeholder='y' value={yCluster}
                           onChange={event => this.setState({yCluster: event.target.value})}/>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Tooltip title='Добавить' mouseLeaveDelay={0}>
                      <Button
                        icon='plus'
                        type='default'
                        onClick={() => ''}
                        style={{width: '100%'}}
                      />
                    </Tooltip>
                  </Col>
                  <Col span={6}>
                    <Tooltip title='Генерировать' mouseLeaveDelay={0}>
                      <Button
                        icon='setting'
                        type='default'
                        onClick={() => this.setRandom()}
                        style={{width: '100%'}}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Row>
                  <Col span={6}>
                    <p>Метрика:</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <RadioGroup name="radiogroup" defaultValue={1}>
                      <Radio value={1}>Евклид</Radio>
                      <Radio value={2}>Чебышев</Radio>
                    </RadioGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Tooltip title='Старт' mouseLeaveDelay={0}>
                  <Button
                    icon='check'
                    type='default'
                    onClick={() => ''}
                    style={{width: '100%'}}
                  />
                </Tooltip>
              </Col>
              <Col span={6}>
                <Tooltip title='Сброс' mouseLeaveDelay={0}>
                  <Button
                    icon='rollback'
                    type='default'
                    onClick={() => ''}
                    style={{width: '100%'}}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <canvas
                  width='600px'
                  height='600px'
                  style={{background: 'white', marginTop: '10px'}}
                  ref={canvas => this.canvas = canvas}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }

  protected setRandom(type: boolean = false) {
    type
      ? this.setState({xDot: random(5, 550).toString(), yDot: random(5, 550).toString()})
      : this.setState({xCluster: random(5, 550).toString(), yCluster: random(5, 550).toString()})
  }
}

function random(min, max): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
