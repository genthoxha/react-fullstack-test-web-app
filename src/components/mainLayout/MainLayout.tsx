import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import './MainLayout.css';
import { Sidebar } from '../sidebar/Sidebar';
import { UsersComponent } from '../users/UsersComponent';
import { addCheckpoints, calculateUserDistances } from '../../api';
import { MapComponent } from '../map/MapComponent';

export const MainLayout: React.FC = () => {
  React.useEffect(() => {
    (async () => {
      await addCheckpoints();
      await calculateUserDistances();
    })();
  });

  return (
    <BrowserRouter>
      <div className="page page-main">
        <div className="page-sidebar">
          <Sidebar />
        </div>
        <div className="page-content">
          <Switch>
            <Route exact path={'/users'} component={UsersComponent} />
            <Route exact path={'/map'} component={MapComponent} />
            <Route path="*">
              <Redirect to="/users" />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
