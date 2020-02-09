import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Projects from './Projects';
import Profile from './Profile';
const Main = () => (
  <Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/contact" component={Contact}/>
  <Route path="/projects" component={Projects}/>
  <Route path="/profile" component={Profile}/>
  </Switch>
)

export default Main;
