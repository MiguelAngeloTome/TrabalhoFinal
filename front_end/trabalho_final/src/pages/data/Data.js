import React from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import dataService from '../../services/data'
import './Data.css';


export default class DataListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
        };
    }
    componentDidMount() {
        dataService.getAll ().then(data => this.setState({datas: data})).catch();
    }

    render() {
            const {datas} = this.state;
            
        return (

            <Container>
                <Table striped bordered hover variant="dark" className="table_data" >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map ((datas, index)=>(
                            <tr key={`datas${index}`}>
                            <td>{datas.data_id}</td>
                            <td>{datas.date}</td>
                            <td><Button variant="info" 
                            onClick={()=>this.props.history.push(
                                `/data/details/${datas.data_id}`
                            )}
                            >Info</Button></td>
                        </tr>
                        ))}
                        
                    </tbody>
                </Table>
            </Container>
        );
    }
}