import React from 'react';
import 'chartjs-plugin-zoom';
import { Scatter} from 'react-chartjs-2';
import { Container } from '@material-ui/core';

export default class HumGraph extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : {
                datasets: [{
                    data: [this.props.corte, this.props.rest],
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
            m:true,
            densityData : {
                label: this.props.title,
                data: [],
                borderColor: 'rgba(0, 99, 132, 0.6)',
                borderWidth: 0,
                showLine: true,
                fill: true,
                hidden: false,
        },
            gravityData : {
            label: 'corte',
            data: [],
            borderColor: 'rgba(99, 132, 0, 0.6)',
            borderWidth: 0,
            showLine: true,
            fill: true,
            hidden: false,
            },
        t: []
    }
    }
componentDidMount(){
    this.setState({m:!this.state.m})
    if(this.props.value === 0){
        this.control(this.props.data);
    }
    if(this.props.value === 1){
        this.control1(this.props.data);
    }
    

}

control(a){
    this.setState({m:!this.state.m})
    let b = [];
    let c = [];
    for(let i=0;i<a.length;i++){
        b.push({x:new Date(a[i].inic),y:a[i].inichum})
        b.push({x:new Date(a[i].fim),y:a[i].fimhum})
        let d = new Date(a[i].fim);
        d.setMinutes(d.getMinutes() + 1);
        b.push({x:d ,y:null})
    }
    c.push({x:new Date(a[0].inic),y:this.props.corte})
    c.push({x:new Date(a[a.length -1].fim),y:this.props.corte})
    this.setState({densityData:{ label:this.state.densityData.label,borderColor:this.state.densityData.borderColor,borderWidth:this.state.densityData.borderWidth,showLine:this.state.densityData.showLine,fill:this.state.densityData.fill,hidden:this.state.densityData.hidden,data:b} });
    this.setState({gravityData:{ label:this.state.gravityData.label,borderColor:this.state.gravityData.borderColor,borderWidth:this.state.gravityData.borderWidth,showLine:this.state.gravityData.showLine,fill:this.state.gravityData.fill,data:c} });
}

control1(a){
    this.setState({m:!this.state.m})
    let b = [];
    for(let i=0;i<a.length;i++){
        b.push({x:new Date(a[i].date),y:a[i].avg})
    }
    this.setState({densityData:{ label:this.state.densityData.label,borderColor:this.state.densityData.borderColor,borderWidth:this.state.densityData.borderWidth,showLine:this.state.densityData.showLine,fill:this.state.densityData.fill,hidden:this.state.densityData.hidden,data:b} });
}
 
    render(){
        if(this.props.data.length!== 0){
            var planetData;
            if(this.props.value ===0){
                planetData = {
                    datasets: [this.state.densityData, this.state.gravityData]
                  };
            }
            if (this.props.value ===1){
                planetData = {
                    datasets: [this.state.densityData]
                  };
            }
            
            }
          
          var chartOptions = {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            hour: 'MMMM Do YYYY, h:mm:ss a'
                        }
                    }
                }],
                yAxes:[{
                    ticks: {
                        max: 100,
                        min: 0,
                        
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