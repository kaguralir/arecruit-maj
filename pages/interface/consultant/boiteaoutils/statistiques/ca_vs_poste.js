import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Coiffeur',
      backgroundColor: 'cyan',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      data: [35, 29, 50, 51, 26]
    }
    ,
    {
        label: 'Chaudronnier',
        backgroundColor: 'grey',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56]
    }
    ,
    {
        label: 'Developpeur',
        backgroundColor: 'blue',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [45, 39, 60, 61, 36]
    }
    ,
    {
        label: 'Consultant',
        backgroundColor: 'orange',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [55, 49, 70, 71, 46]
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