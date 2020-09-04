import React from 'react';
import { Scatter} from 'react-chartjs-2';
import { Container } from '@material-ui/core';
import DataService from '../../services/data'

export default class Scatter1line extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : {
                datasets: [{
                    data: [this.props.valor, this.props.rest],
                    backgroundColor:[
                        this.props.color,
                        'rgba(100, 100, 100, 0.6)',

                    ],
                }],
               
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Red',
                    'Yellow',
                ],
                
            },
            a:[],
            b:[],

            densityData : {
                label: this.props.title,
                data: [],
                borderColor: 'rgba(0, 99, 132, 0.6)',
                borderWidth: 0,
                showLine: true,
                fill: true,
                hidden: false,
        }
    }
    }
componentDidMount(){
    console.log(this.props.data);
    this.control(this.props.data);

}

control(a){
    let b = [];

    for(let i=0;i<a.length;i++){
        b.push({x:new Date(a[i].date),y:a[i].value})
    }
    this.setState({densityData:{ label:this.state.densityData.label,borderColor:this.state.densityData.borderColor,borderWidth:this.state.densityData.borderWidth,showLine:this.state.densityData.showLine,fill:this.state.densityData.fill,hidden:this.state.densityData.hidden,data:b} });

}
 
    render(){
        if(this.state.densityData.data.length!== 0){
            var planetData = {
                datasets: [this.state.densityData]
              };
            }
          
          var chartOptions = {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        distribution: 'series'
                    }
                }],
            },
            text:"",
          };
        return(
            <Container>
                    {console.log(this.state.densityData)}
                    {this.state.densityData.data.length!==0 &&
                    <Scatter style={{align: 'center'}} data={planetData} options={chartOptions} />
                    }
                    
            </Container>
           
        )
    }
}