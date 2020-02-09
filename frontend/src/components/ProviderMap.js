import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


export default class ProviderMap extends Component {
    constructor(props) {
      super(props);
      this.state = {
          position: [43.0845, -77.6749]
      }
    }

    componentDidMount(){
        
    }
  
    render(){
      return (
        <Map id="map" center={this.state.position} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.props.providers.filter( (provider) => {
            return provider.latitude && provider.longitude;
          }).map( (provider, key) => 
            <Marker key ={key} position={[provider.latitude, provider.longitude]}>
              <ProviderPopup provider = {provider} /> 
            </Marker>
          )
          }
          
        </Map>
      );
    }
  }


const ProviderPopup = (props) => {
    return (
        <Popup> {props.provider.facility_name} <br /> {props.provider.street_number + " " + props.provider.street_name}</Popup>
    );
};