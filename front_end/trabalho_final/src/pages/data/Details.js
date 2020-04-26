import React from 'react';
import { Container, Jumbotron, Col, Row } from 'react-bootstrap';
import dataService from '../../services/data';
//import './Data.css';


export default class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
        };
    }
    componentDidMount() {
        dataService.getOne(this.props.match.params.id).then(data=>this.setState({data: data[0]})).catch();
        
    }

    render() {
        const {data} = this.state;
      
        return (
            <Container>
                {data !== undefined &&
                    <Jumbotron>
                        <h1>Nome/Localizacao do Rasp</h1>
                        <h5>(Ainda Por implementar)</h5>
                        <br />
                        <h4>{data.data_id}</h4>
                        <h4>{data.date}</h4>

                        <Container>
                            <Row>
                                <Col sm>{data.temp}</Col>
                                <Col sm>{data.air_humidity}</Col>
                                <Col sm>{data.solo_humidity}</Col>
                                <Col sm>{data.isWet}</Col>
                            </Row>
                            <Row>
                                <Col sm>{data.pluviosidade}</Col>
                                <Col sm>{data.vel_vento}</Col>
                                <Col sm>{data.dir_vento}</Col>
                                <Col sm>{data.radiacao}</Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                }

            </Container>
        )
    }
}