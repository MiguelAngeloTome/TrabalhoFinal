import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { Container } from '@material-ui/core';
import { Chart } from 'react-chartjs-2';

Chart.pluginService.register({
    beforeDraw: function(chart) {
      var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;
  
      ctx.restore();
      var fontSize = (height / 114).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
  
      var text = "27°",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
  
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  });

export default class Exa extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : {
                datasets: [{
                    data: [27,33],
                    backgroundColor:[
                        'rgba(255, 0, 0, 1)',
                        'rgba(100, 100, 100, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                    ],
                }],
                
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Red',
                    'Yellow',
                ],
                text: '23%'
                
            },
        };
    }

    
 
    render(){
        return(
            <Container>
                <h1 style={{textAlign: 'center'}}>Temperatura</h1>
            <Doughnut style={{align: 'center'}} data={this.state.data} options={{legend: {
                display: false
            },rotation:1.5708}} />
            </Container>
           
        )
    }
}



