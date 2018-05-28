import * as React from 'react';
import {Button, Col, Input, Layout, Radio, Row, Tooltip} from 'antd';

const {Content} = Layout;
const RadioGroup = Radio.Group;

interface IState {
  preloader: boolean;
}

export default class App extends React.Component<any, IState> {
  public render(): JSX.Element {
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
                    <Input placeholder='x'/>
                  </Col>
                  <Col span={6}>
                    <Input placeholder='y'/>
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
                        onClick={() => ''}
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
                    <Input placeholder='x'/>
                  </Col>
                  <Col span={6}>
                    <Input placeholder='y'/>
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
                        onClick={() => ''}
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
          </Content>
        </Layout>
      </Layout>
    );
  }
}
