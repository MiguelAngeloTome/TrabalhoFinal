import React from 'react';
import { Scatter} from 'react-chartjs-2';
import { Container } from '@material-ui/core';
import services from '../../services/'

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

            tempData : {
                label: 'Temperature',
                data: [],
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 0,
                showLine: true,
                fill: false,
                hidden: false,
        },
        humData : {
            label: 'Humidade',
            data: [],
            borderColor: 'rgba(7, 216, 240, 1)',
            borderWidth: 0,
            fill: false,
            showLine: true,
            hidden: false,
          },
          soloHumData : {
            label: 'Humidade do Solo',
            data: [],
            borderColor: 'rgba(255, 132, 20, 0.6)',
            borderWidth: 0,
            fill: false,
            showLine: true,
            hidden: true,
          },
          pluvData : {
            label: 'Pluviosidade',
            data: [],
            borderColor: 'rgba(0, 0, 255, 0.6)',
            borderWidth: 0,
            fill: false,
            showLine: true,
            hidden: true,
          },
          velData : {
            label: 'Velocidade do Vento',
            data: [],
            borderColor: 'rgba(0, 255, 0, 0.6)',
            borderWidth: 0,
            fill: false,
            showLine: true,
            hidden: true,
          },
          radData : {
            label: 'Radiação',
            data: [],
            borderColor: 'rgba(240, 232, 0, 0.6)',
            borderWidth: 0,
            fill: false,
            showLine: true,
            hidden: true,
          },
    }
    }
componentDidMount(){
    if(this.props.value ==1){
        this.control(this.props.data)
    }else{
        services.data.getTime(this.props.module,{time1:this.props.dateInic, time2:this.props.dateFim}).then(data=>this.control(data));
    }


}

control(a){
    console.log(a)
    let b = [];
    let c = [];
    let d = [];
    let e = [];
    let f = [];
    let g = [];

    for(let i=0;i<a.length;i++){
        b.push({x:new Date(a[i].date),y:a[i].temp})
        c.push({x:new Date(a[i].date),y:a[i].air_humidity})
        d.push({x:new Date(a[i].date),y:a[i].solo_humidity})
        e.push({x:new Date(a[i].date),y:a[i].pluviosidade})
        f.push({x:new Date(a[i].date),y:a[i].vel_vento})
        g.push({x:new Date(a[i].date),y:a[i].radiacao})
    }
    this.setState({tempData:{ label:this.state.tempData.label,borderColor:this.state.tempData.borderColor,borderWidth:this.state.tempData.borderWidth,showLine:this.state.tempData.showLine,fill:this.state.tempData.fill,hidden:this.state.tempData.hidden,data:b} });
    this.setState({humData:{ label:this.state.humData.label,borderColor:this.state.humData.borderColor,borderWidth:this.state.humData.borderWidth,showLine:this.state.humData.showLine,fill:this.state.humData.fill,data:c} });
    this.setState({soloHumData:{ label:this.state.soloHumData.label,borderColor:this.state.soloHumData.borderColor,borderWidth:this.state.soloHumData.borderWidth,showLine:this.state.soloHumData.showLine,fill:this.state.soloHumData.fill,hidden:this.state.soloHumData.hidden,data:d} });
    this.setState({pluvData:{ label:this.state.pluvData.label,borderColor:this.state.pluvData.borderColor,borderWidth:this.state.pluvData.borderWidth,showLine:this.state.pluvData.showLine,fill:this.state.pluvData.fill,data:e} });
    this.setState({velData:{ label:this.state.velData.label,borderColor:this.state.velData.borderColor,borderWidth:this.state.velData.borderWidth,showLine:this.state.velData.showLine,fill:this.state.velData.fill,hidden:this.state.velData.hidden,data:f} });
    this.setState({radData:{ label:this.state.radData.label,borderColor:this.state.radData.borderColor,borderWidth:this.state.radData.borderWidth,showLine:this.state.radData.showLine,fill:this.state.radData.fill,data:g} });

}
 
    render(){

         
          if(this.state.tempData.data.length!== 0 & this.state.humData.data.length!== 0){
            var planetData = {
                datasets: [this.state.tempData, this.state.humData, this.state.soloHumData, this.state.pluvData, this.state.velData, this.state.radData]
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
                    {this.state.tempData.data.length!==0 &&
                    <Scatter style={{align: 'center'}} data={planetData} options={chartOptions} />
                    }
                    
            </Container>
           
        )
    }
}