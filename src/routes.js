import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './pages/list/list';
import Detail from './pages/detail/detail';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/detail/:id" component={Detail} />
    </Switch>
  )
}

export default Routes;