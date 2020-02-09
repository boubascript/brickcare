import React, {Component} from 'react';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';
import Main from './components/Main.js';
import {Link} from 'react-router-dom';
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
import './App.css';

export default class App extends Component{

  render(){
    return(
      <div style={{height: '300px', position: 'relative'}}>
        <UncontrolledButtonDropdown>
          <DropdownToggle caret>
            Dropdown
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><Link to="/projects">Projects</Link></DropdownItem>
            <DropdownItem><Link to="/profile">My Profile</Link></DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <Button style={{float: 'right'}}><Link to="/contact">Login/Sign Up</Link></Button>
        <Main/>
      </div>
    );
  }
};
