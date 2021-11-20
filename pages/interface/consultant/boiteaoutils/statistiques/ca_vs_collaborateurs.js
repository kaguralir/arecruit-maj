import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Albert',
      backgroundColor: 'orange',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56]
    }
    ,
    {
        label: 'James',
        backgroundColor: 'grey',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56]
    }
    ,
    {
        label: 'Axel',
        backgroundColor: 'blue',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56]
    }
  ]
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}