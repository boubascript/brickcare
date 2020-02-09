import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Contact from './contact';
import Projects from './projects';

const Main = () => (
  <Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/contact" component={Contact}/>
  <Route path="/projects" component={Projects}/>
  </Switch>
)

export default Main;
