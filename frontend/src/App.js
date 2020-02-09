import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Container, Row, Col  } from 'reactstrap';
import Main from './components/main';
import {Link} from 'react-router-dom';

class App extends Component{
  render(){
  return(
    <div style={{height: '300px', position: 'relative'}}>
      <UncontrolledButtonDropdown>
         <DropdownToggle caret>
           Dropdown
         </DropdownToggle>
         <DropdownMenu>
           <DropdownItem><Link to="/resume">Resume</Link></DropdownItem>
           <DropdownItem><Link to="/aboutme">About me</Link></DropdownItem>
           <DropdownItem><Link to="/projects">Projects</Link></DropdownItem>
           <DropdownItem><Link to="/contact">Contact Info</Link></DropdownItem>
         </DropdownMenu>
       </UncontrolledButtonDropdown>
       <Main/>
    </div>



  );
}
}
export default App;
