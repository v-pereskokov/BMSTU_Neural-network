import * as React from 'react';

interface IState {
  preloader: boolean;
}

export default class App extends React.Component<any, IState> {
  public render(): JSX.Element {
    return <div>Текст</div>;
  }
}
