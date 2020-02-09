import React, {Component} from 'react';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import Main from './components/Main.js';
import {Link} from 'react-router-dom';
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
import './App.css';

export default class App extends Component{

  componentDidMount() {
    // Initialize the App Client
    this.client = Stitch.initializeDefaultAppClient("brickcare-vkcbv");
    // Get a MongoDB Service Client
    // This is used for logging in and communicating with Stitch
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "brick-atlas"
    );
    // Get a reference to the todo database
    this.db = mongodb.db("brickcaredb");
    this.db.collection("providers").find({}).asArray().then((err, result) => {
      if (err) throw err;
      console.log(result);
      return result;
    });
  }

  render(){
    return(
      <div style={{height: '300px', position: 'relative'}}>
        <UncontrolledButtonDropdown>
          <DropdownToggle caret>
            Dropdown
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><Link to="/projects">Projects</Link></DropdownItem>
            <DropdownItem><Link to="/contact">Contact Info</Link></DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <Main/>
      </div>
    );
  }
};
