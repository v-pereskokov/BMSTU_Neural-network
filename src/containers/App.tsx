import * as React from 'react';
import {Button, Col, Input, Layout, Radio, Row, Tooltip} from 'antd';

const {Content} = Layout;
const RadioGroup = Radio.Group;

const HEX_SYMBOLS: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
const CLUSTERS: Array<{ x: number, y: number }> = [];
const DOTS: Array<{ x: number, y: number }> = [];

interface IState {
  preloader: boolean;
  xDot: string;
  yDot: string;
  xCluster: string;
  yCluster: string;
  metrika: boolean;
}

export default class App extends React.Component<any, IState> {
  private canvas: CanvasRenderingContext2D;

  constructor(props) {
    super(props);

    this.state = {
      preloader: false,
      xDot: '',
      yDot: '',
      xCluster: '',
      yCluster: '',
      metrika: true
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
                        onClick={() => {
                          this.canvas.fillStyle = randomColor();
                          this.canvas.beginPath();
                          this.canvas.arc(+xDot, +yDot, 3, 0, Math.PI * 2);
                          this.canvas.closePath();
                          this.canvas.fill();

                          DOTS.push({x: +xDot, y: +yDot});
                        }}
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
                        onClick={() => {
                          this.canvas.fillStyle = randomColor();
                          this.canvas.fillRect(+xCluster, +yCluster, 10, 10);
                          CLUSTERS.push({x: +xCluster, y: +yCluster});
                        }}
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
                    <RadioGroup name='metrika' defaultValue={1}
                                onChange={event => this.setState({metrika: +event.target.value === 1})}>
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
                  ref={canvas => this.canvas = canvas ? canvas.getContext('2d') : null}
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

function Euclid(a1: { x: number, y: number }, a2: { x: number, y: number }): number {
  return Math.sqrt(((a1.x - a2.x) + (a1.y - a2.y)) ** 2);
}

function Chebyshev(a1: { x: number, y: number }, a2: { x: number, y: number }): number {
  return Math.max(Math.abs(a1.x - a2.x), Math.abs(a1.y - a2.y));
}

function randomColor(): string {
  return HEX_SYMBOLS.reduce((color, current, index) => index < 6 ? color + HEX_SYMBOLS[random(0, 15)] : color, '#');
}
