# Лабораторная работа 6 (№9 по методичке)

## Алгоритмы кластерного анализа данных

### Цель
Исследовать применение основных алгоритмов кластерного анализа, включая их модификации, на примере различных типов данных.

### Данные
Алгоритм: *k-средних*
Исходные кластеризуемые данные: *Координатные точки на форме приложения*
Метрика: *Евклида, Чебышева*

### Выполнение и результаты

#### Исходные данные
![Имж 1](/imgs/begin.png)

#### Результат
![Имж 2](/imgs/end.png)

#### Лог с точками, принадлежащим разнличным кластерам
![Имж 3](/imgs/log.png)

### Исходный код
- [Точка входа](/src/index.tsx)
- [Само приложение](/src/containers/App.tsx)

#### index.tsx
```typescript jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './containers/App';

import './static/main.scss';

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
```

#### App.tsx
```typescript jsx
import * as React from 'react';
import {Button, Col, Input, Layout, Radio, Row, Tooltip} from 'antd';
import * as _ from 'lodash';

const {Content} = Layout;
const RadioGroup = Radio.Group;

const HEX_SYMBOLS: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

let CLUSTERS: Array<{ x: number, y: number }> = [];
let DOTS: Array<{ x: number, y: number }> = [];

interface IState {
  xDot: string;
  yDot: string;
  xCluster: string;
  yCluster: string;
  metrika: boolean;
  preloader: boolean;
}

export default class App extends React.Component<any, IState> {
  private canvas: CanvasRenderingContext2D;

  constructor(props) {
    super(props);

    this.state = {
      xDot: '',
      yDot: '',
      xCluster: '',
      yCluster: '',
      metrika: true,
      preloader: false
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
                    onClick={() => this.clusterisation()}
                    style={{width: '100%'}}
                    loading={preloader}
                  />
                </Tooltip>
              </Col>
              <Col span={6}>
                <Tooltip title='Сброс' mouseLeaveDelay={0}>
                  <Button
                    icon='rollback'
                    type='default'
                    onClick={() => {
                      DOTS = [];
                      CLUSTERS = [];

                      this.canvas.clearRect(0, 0, 600, 600);
                    }}
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

  protected clusterisation() {
    const {metrika} = this.state;

    this.setState({preloader: true});
    setTimeout(() => {
      let clusterObj = {};
      CLUSTERS.forEach((item, index) => clusterObj[index] = {dots: []});

      for (let i in _.range(DOTS.length)) {
        const metriks: Array<any> = [];

        for (let j in _.range(CLUSTERS.length)) {
          const [a1, a2] = [DOTS[i], CLUSTERS[j]];
          metriks.push(metrika ? Euclid(a1, a2) : Chebyshev(a1, a2));
        }

        clusterObj[metriks.indexOf(Math.min(...metriks))].dots.push(i);
      }


      CLUSTERS.forEach((item, index) => {
        const x: number = clusterObj[index].dots.reduce((sum, current) => sum + DOTS[current].x, 0) / clusterObj[index].dots.length;
        const y: number = clusterObj[index].dots.reduce((sum, current) => sum + DOTS[current].y, 0) / clusterObj[index].dots.length;

        this.setRect(CLUSTERS[index].x, CLUSTERS[index].y);
        this.setRect(x, y, randomColor());


        CLUSTERS[index] = {x, y};
        clusterObj[index].center = {x, y};

        const color: string = randomColor();
        clusterObj[index].dots.forEach(item => this.setCircle(DOTS[item].x, DOTS[item].y, color));
      });

      console.log(clusterObj);
      this.setState({preloader: false});
    }, 1000);
  }

  protected setRect(x: number, y: number, color: string = '#ffffff') {
    this.canvas.fillStyle = color;
    this.canvas.fillRect(x, y, 10, 10);
  }

  protected setCircle(x: number, y: number, color: string = '#000') {
    this.canvas.fillStyle = color;
    this.canvas.beginPath();
    this.canvas.arc(x, y, 3, 0, Math.PI * 2);
    this.canvas.closePath();
    this.canvas.fill();
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
```

### Выполнял
Перескоков Владислав Андреевич,   
МГТУ им. Баумана,  
ИУ-8, 3 курс, 61 группа,  
Вариант 13  
