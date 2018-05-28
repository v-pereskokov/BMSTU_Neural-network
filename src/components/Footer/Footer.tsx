import * as React from 'react';
import {Layout} from 'antd';

const AntdFooter = Layout.Footer;

export default class Footer extends React.Component {
  public render(): JSX.Element {
    return (
      <AntdFooter style={{textAlign: 'center'}}>
        © 2009–{new Date().getFullYear()} ООО «Яндекс.Такси»
      </AntdFooter>
    );
  }
}
