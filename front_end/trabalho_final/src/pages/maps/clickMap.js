import React from "react";
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import userLocationURL from '../../assets/vinha_location.svg';
import vinhaService from '../../services/vinha';

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [40, 65]
});

export default class ClickMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 6,
      lat:undefined,
      lng:undefined,

    }
  }

  addMarker = (e) => {
      let lat = e.latlng.lat;
      let lng= e.latlng.lng;

      this.setState({lat:lat, lng:lng});

      this.props.parentCallback({lat:lat, lng:lng});

  }


  render() {
    return (
      <div style={mapContainerStyle}>
          <Map onClick={this.addMarker} style={mapContainerStyle} center={[39.3999, -8.2245]} zoom={this.state.zoom} minZoom='4'>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.state.lat !== undefined && this.state.lng !== undefined &&
                <Marker position={[this.state.lat, this.state.lng]}
                icon={myIcon}></Marker>
            }
            
          </Map>

      </div>
    )
  }
}