import React, {Component} from 'react';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';
import Main from './components/Main.js';
import {Link} from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
import './App.css';

const position = [43.0845, -77.6749]

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      providers: []
    }
  }


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

    this.client.callFunction("getSocrataData", []).then(result => {
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
        console.log(providers[0])
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
        <Button style={{float: 'right'}}><Link to="/contact">Login/Sign Up</Link></Button>
        <Main/>
        <ProviderMap providers = {this.state.providers}/>
      </div>
    );
  }
};

class ProviderMap extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    console.log(this.props.providers) // && this.props.providers[0].position)
    return (
      <Map id="map" center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {this.props.providers.filter( (provider) => {
          return provider.latitude && provider.longitude;
        }).map( (provider, key) => 
          <Marker key ={key} position={[provider.latitude, provider.longitude]}>
            <Popup> {provider.facility_name} <br /> {provider.street_number + " " + provider.street_name}</Popup>
          </Marker>
        )
        }
        
      </Map>
    );
  }
}