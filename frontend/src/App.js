import React, {Component} from 'react';
import {  Dropdown, DropdownMenu, DropdownToggle, Button,
          Form, FormGroup, Badge, Input, Card, CardImg, CardText, CardBody,
          CardTitle, CardSubtitle, Label} from 'reactstrap';
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
      name: "Rochester Regional Office",
      keyopen:false
    }
    // Initialize the App Client
    this.state.client = Stitch.initializeDefaultAppClient("brickcare-vkcbv");

    this.onRegionChange = this.onRegionChange.bind(this);
    this.keytoggle = this.keytoggle.bind(this);
    this.formtoggle = this.formtoggle.bind(this);

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
      //console.log(result);
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

  keytoggle = () => {
    this.setState({
      keyopen: !this.state.keyopen
    });
  }

  formtoggle = () => {
    this.setState({
      formopen: !this.state.formopen
    });
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
          <Dropdown isOpen={this.state.formopen} toggle={this.formtoggle}>
                <DropdownToggle caret>
                  Sign Up
                </DropdownToggle>
                <DropdownMenu>
                  <Form className="loginform">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="exampleName" className="mr-sm-2">Name: </Label>
                      <Input type="name" name="name" id="exampleName" placeholder="First, Last" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="exampleEmail" className="mr-sm-2">Email:</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="example@gmail.com" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="examplePassword" className="mr-sm-2">Password:</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="password" />
                    </FormGroup>
                    <Button>Submit</Button>
                  </Form>
                </DropdownMenu>
          </Dropdown>
          </div>
          <div className="imagekey">

          <Dropdown  isOpen={this.state.keyopen} toggle={this.keytoggle}>
            <DropdownToggle caret>
              Key
              </DropdownToggle>
              <DropdownMenu>
                  <Card className="keycard">
                      <CardBody>
                        <CardTitle>Key</CardTitle>
                        <CardSubtitle > <a href="https://dev.socrata.com/foundry/data.ny.gov/cb42-qumz">What Each Type of Pin Means</a> </CardSubtitle>
                        <CardText> <img src = "fdc.png" /> Family Day Care (FDC)</CardText>
                        <CardText> <img src = "https://lh3.googleusercontent.com/proxy/0iYXZoCU640a_uYyCdlmaFMjgIkf1iRFA8yPqCAQxYlR4pn0Lv09oHzKa4cYqmft02kFtctFERc29JLQ8x7W6KFbX3SSh7I" /> 
                              Group Family Day Care (GFDC)
                        </CardText>
                        <CardText> <img src = "https://i.ya-webdesign.com/images/daycare-clipart-1.png" /> School Age Child Care (SACC) </CardText>
                        <CardText> <img src = "dcc.png" /> Day Care Center  (DCC)* </CardText>
                        <CardText> *A smaller version of this image denotes an SDCC: Small Day Care Center </CardText>

                      </CardBody>
                    </Card>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
};
