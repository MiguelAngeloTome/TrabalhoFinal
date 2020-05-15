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
  
      var text = chart.config.data.text,
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
                text: this.props.valor
                
            },
        };
    }

 
    render(){
        return(
            <Container>
                <h2 style={{textAlign: 'center'}}>{this.props.title}</h2>
            <Doughnut style={{align: 'center'}} data={this.state.data} options={{legend: {
                display: false
            },rotation:1.5708}} />
            </Container>
           
        )
    }
}



