import React from 'react';
import { Scatter} from 'react-chartjs-2';
import { Container } from '@material-ui/core';

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
                    ticks: {
                        major: {
                           enabled: true, // <-- This is the key line
                           fontStyle: 'bold', //You can also style these values differently
                           fontSize: 14 //You can also style these values differently
                        },
                    }
                }],
            },
            text:"",
            plugins: {
                zoom: {
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: true,
    
                        // Panning directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'xy'
                    },
    
                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,
    
                        // Zooming directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'xy',
                    }
                }
            }
          };
        return(
            <Container>
                    {this.state.densityData.data.length!==0 &&
                    <Scatter style={{align: 'center'}} data={planetData} options={chartOptions} />
                    }
                    
            </Container>
           
        )
    }
}