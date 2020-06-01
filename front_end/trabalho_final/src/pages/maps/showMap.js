import React from "react";
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import userLocationURL from '../../assets/vinha_location.svg';
import Container from '@material-ui/core/Container';
import vinhaService from '../../services/vinha';

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [40, 65]
});

export default class ShowMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
      datas: [],
      vinha: undefined,
    }
  }
  componentDidMount() {
    vinhaService.getModulesVinha(this.props.vinha).then(data => this.setState({ datas: data })).catch();
    vinhaService.getOne(this.props.vinha).then(data => this.setState({ vinha: data[0] })).catch();
  }
  render() {
    return (
      <div style={mapContainerStyle}>
        {this.state.vinha !== undefined &&
          <Map style={mapContainerStyle} center={[this.state.vinha.lat, this.state.vinha.lng]} zoom={this.state.zoom} minZoom='4'>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.state.datas.map(data => (
              <Marker
                key={data.module_id}
                position={[data.lat, data.lng]}
                icon={myIcon}>
                <Popup>
                  <h2>{this.state.vinha.Nome}</h2>
                  <h3>{data.localizacao}</h3>
                  <h4>{data.lat + " " + data.lng}</h4>
                </Popup>
              </Marker>
            ))}
          </Map>

        }

      </div>
    )
  }
}