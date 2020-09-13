import React from 'react';
import { Scatter} from 'react-chartjs-2';
import { Container } from '@material-ui/core';
import DataService from '../../services/data'

export default class CompareGraph extends React.Component{

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
                label: 'Temperature',
                data: [],
                borderColor: 'rgba(0, 99, 132, 0.6)',
                borderWidth: 0,
                showLine: true,
                fill: false,
                hidden: true,
        },
        gravityData : {
            label: 'Humidity',
            data: [],
            borderColor: 'rgba(99, 132, 0, 0.6)',
            borderWidth: 0,
            fill: false,
            showLine: true,
          },
    }
    }
componentDidMount(){
 
DataService.getTime(this.props.module,{time1:"2020-01-01 10:00:10", time2:"2020-01-01 13:25:10"}).then(data=>this.control(data));

}

control(a){
    let b = [];
    let c = [];

    for(let i=0;i<a.length;i++){
        b.push({x:new Date(a[i].date),y:a[i].temp})
    }
    for(let i=0;i<a.length;i++){
        c.push({x:new Date(a[i].date),y:a[i].air_humidity})
    }
    this.setState({densityData:{ label:this.state.densityData.label,borderColor:this.state.densityData.borderColor,borderWidth:this.state.densityData.borderWidth,showLine:this.state.densityData.showLine,fill:this.state.densityData.fill,hidden:this.state.densityData.hidden,data:b} });
    this.setState({gravityData:{ label:this.state.gravityData.label,borderColor:this.state.gravityData.borderColor,borderWidth:this.state.gravityData.borderWidth,showLine:this.state.gravityData.showLine,fill:this.state.gravityData.fill,data:c} });

}
 
    render(){

         
          if(this.state.densityData.data.length!== 0 & this.state.gravityData.data.length!== 0){
            var planetData = {
                datasets: [this.state.densityData, this.state.gravityData]
              };
            }
          
          var chartOptions = {
            scales: {
                xAxes: [{
                    type: 'time',
                }],
            },
            text:"",
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