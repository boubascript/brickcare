import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer} from 'react-leaflet';
import L from 'leaflet';

const icons = {
    'FDC' : new L.Icon({
                iconUrl: 'fdc.png',
                iconRetinaUrl: '',
                iconAnchor: null,
                popupAnchor: new L.Point(0, 10),
                shadowUrl: "",
                shadowSize: null,
                shadowAnchor: null,
                iconSize: new L.Point(30, 45),
                className: 'leaflet-div-icon'
            }),
    'GFDC' : new L.Icon({
                iconUrl: 'https://lh3.googleusercontent.com/proxy/0iYXZoCU640a_uYyCdlmaFMjgIkf1iRFA8yPqCAQxYlR4pn0Lv09oHzKa4cYqmft02kFtctFERc29JLQ8x7W6KFbX3SSh7I',
                iconRetinaUrl: '',
                iconAnchor: null,
                popupAnchor: new L.Point(0, 10),
                shadowUrl: "",
                shadowSize: null,
                shadowAnchor: null,
                iconSize: new L.Point(50, 50),
                className: 'leaflet-div-icon'
            }),
    'SACC' : new L.Icon({
                iconUrl: 'https://i.ya-webdesign.com/images/daycare-clipart-1.png',
                iconRetinaUrl: '',
                iconAnchor: null,
                popupAnchor: new L.Point(0, 10),
                shadowUrl: "",
                shadowSize: null,
                shadowAnchor: null,
                iconSize: new L.Point(40, 25),
                className: 'leaflet-div-icon'
            }),
    'DCC' : new L.Icon({
                iconUrl: 'dcc.png',
                iconRetinaUrl: '',
                iconAnchor: null,
                popupAnchor: new L.Point(0, 10),
                shadowUrl: "",
                shadowSize: null,
                shadowAnchor: null,
                iconSize: new L.Point(70, 70),
                className: 'leaflet-div-icon'
            }),
    'SDCC' : new L.Icon({
                iconUrl: 'dcc.png',
                iconRetinaUrl: '',
                iconAnchor: null,
                popupAnchor: new L.Point(0, 10),
                shadowUrl: "",
                shadowSize: null,
                shadowAnchor: null,
                iconSize: new L.Point(30, 30),
                className: 'leaflet-div-icon'
            }),
    'default' : new L.Icon.Default()
}


export default class ProviderMap extends Component {
    constructor(props) {
      super(props);
      this.state = {
          position: [43.0845, -77.6749]
      }
    }

    componentDidMount(){
        
    }

    getIcon = (type, status) => {
        if (["Suspended", "Pending Denial", "Pending Revocation & Denial"].includes(status)){
            return icons['default']
        }
        else {
            return (icons[type] ? icons[type] : icons['default']);
        }
    }
  
    render(){
      return (
        <Map id="map" center={this.props.location} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.props.providers.filter( (provider) => {
            return provider.latitude && provider.longitude;
          }).map( (provider, key) => 
            <Marker key ={key} icon = { this.getIcon(provider.program_type, provider.facility_status) } position={[provider.latitude, provider.longitude]}>
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
        <Popup> <strong>{props.provider.facility_name} </strong> <br /> 
                <em>{props.provider.street_number + " " + props.provider.street_name + ", " + props.provider.city + ", " + props.provider.state + ", " + props.provider.zip_code} </em> <br/>
                <p> Type of Program: {props.provider.program_type}</p>
                <p> Phone Number: {props.provider.phone_number}</p>
                <p> Status: {props.provider.facility_status}</p>
                <p> Capacity: {props.provider.capacity_description} </p>
                {props.additional_information && props.additional_information.url && <a href={props.additional_information.url}> View Site</a>}
        </Popup>
    );
};