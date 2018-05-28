import * as React from 'react';
import {Route} from 'react-router';

import Main from './containers/Main/Main';

export const PATHS = {
  MAIN: '/'
};

export const routes: JSX.Element = (
  <React.Fragment>
    <Route exact path={PATHS.MAIN} component={Main}/>
  </React.Fragment>
);
