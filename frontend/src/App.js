import React, {Component} from 'react';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";

import Main from './components/Main.js';
import ProviderMap from './components/ProviderMap';
import './App.css';


export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      providers: []
    }
    // Initialize the App Client
    this.state.client = Stitch.initializeDefaultAppClient("brickcare-vkcbv");

  }


  componentDidMount() {
    // Get a MongoDB Service Client
    // This is used for logging in and communicating with Stitch
    const mongodb = this.state.client.getServiceClient(
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

    this.state.client.callFunction("getSocrataData", []).then(result => {
      console.log(result)
      let providers = []
      result.forEach(place => {
        providers.push(place); 
       //  {
       //    "position": [parseFloat(place.latitude), parseFloat(place.longitude)],
       //    "facility_name": place.facility_name,
       //    "street_number": place.street_number,
       //    "street_name": place.street_name,
       //  });
       });
       this.setState({
        providers: providers
      })
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
            <DropdownItem><Link to="/profile">My Profile</Link></DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <Button style={{float: 'right'}}><Link to="/contact" className="link">Login/Sign Up</Link></Button>
        <Main/>
        <ProviderMap providers={this.state.providers} filters = {this.state.filters}/>
      </div>
    );
  }
};
