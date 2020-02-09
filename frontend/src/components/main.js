import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Community from './Community';
import Projects from './Projects';

const Main = () => (
  <Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/community" component={Community}/>
  <Route path="/projects" component={Projects}/>
  </Switch>
)

export default Main;
