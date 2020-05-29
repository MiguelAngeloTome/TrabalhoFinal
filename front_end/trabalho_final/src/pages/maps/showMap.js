import React from "react";
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import userLocationURL from '../../assets/vinha_location.svg';

const mapContainerStyle = {
    height: "70vh",
    width: "78vw",
  };

  const myIcon = L.icon({
    iconUrl: userLocationURL,
    iconSize: [40, 65]
  });

export default class ShowMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 39.23333,
            lng: -8.68333,
            zoom: 10,
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
          <Map style={mapContainerStyle} center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={myIcon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map>
        )
      }
}