import React, {Component} from 'react';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button,
          Form, FormGroup, Badge, Input, Card, CardImg, CardText, CardBody,
          CardTitle, CardSubtitle} from 'reactstrap';
import {Link} from 'react-router-dom';
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";

import Main from './components/Main.js';
import ProviderMap from './components/ProviderMap';
import './App.css';

const regions = ["ARO",  "BRO",  "LIRO", "RRO",  "SRO",  "YRO"];

const regionInfo = {
  "ARO": {
    "name" : "Albany Regional Office",
    "location": [42.6526,-73.7562]
  },
  "BRO" : {
    "name" : "Buffalo Regional Office",
    "location": [42.8864,-78.8784]
  },
  "LIRO" : {
    "name" : " Long Island Regional Office",
    "location": [40.7891,-73.1350]
  },
  "RRO" : {
    "name" : "Rochester Regional Office",
    "location": [43.0845, -77.6749]
  },
  "SRO" : {
    "name" : "Syracuse Regional Office",
    "location": [43.0481,-76.1474]
  },
  "YRO" : {
    "name" : "Spring Valley Regional Office",
    "location": [41.1132,-74.0438]
  }
}

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      providers: [],
      region:"RRO",
      location: [43.0845, -77.6749],
      name: "Rochester Regional Office"
    }
    // Initialize the App Client
    this.state.client = Stitch.initializeDefaultAppClient("brickcare-vkcbv");

    this.onRegionChange = this.onRegionChange.bind(this);

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

    this.state.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then( () => {
        this.state.client.callFunction("getSocrataData", [this.state.region]).then(result => {
          console.log(result)
          let providers = []
          result.forEach(place => {
            providers.push(place); 
           });
           this.setState({
            providers: providers
          })
       });
      })
      .catch(console.error);

  }

  componentDidUpdate(){
    if(this.state.update){
      this.state.client.callFunction("getSocrataData", [this.state.region]).then(result => {
        console.log(result)
        let providers = []
        result.forEach(place => {
          providers.push(place); 
         });
         this.setState({
          providers: providers,
          update:false,
          location: regionInfo[this.state.region].location,
          name: regionInfo[this.state.region].name,
          region:""
        })
     });
    }
  }

  onRegionChange = (event) => {
    event.preventDefault();
    console.log(event)

    this.setState({
      region: event.target.value
    })

    if(regions.includes(event.target.value)){
      this.setState({update:true})
    }
  }

  render(){
    return(
      <div className="App" style={{position: 'relative'}}>
        <ProviderMap providers={this.state.providers} filters = {this.state.filters} location = {this.state.location}/>
        <div className="overlay">
          <div className="menu">
          <label>
          <h3> <Badge color="secondary">Choose Region:</Badge></h3>
          <h4><Badge color="primary">{this.state.name}</Badge></h4>
          <Input id = "regionInput" list="data" value={this.state.region} placeholder="Choose Region: Rochester Regional Office (RRO)" onChange={this.onRegionChange} />
          </label>
            <datalist id="data">
              {regions.map((item, key) =>
                <option key={key} value={item}> {regionInfo[item].name} </option>
              )}
            </datalist>
          </div>
          <div className="loginmenu">
            <UncontrolledButtonDropdown>
                <DropdownToggle caret>
                  Sign Up
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><Link to="/projects">Already a member? Sign In</Link></DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
          </div>
          <div className="imagekey">
            <Card>
              <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
};
