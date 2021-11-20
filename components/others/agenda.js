import React, { Component, useEffect,useState} from 'react'
import axios from 'axios';


export default function agenda(props) {



  useEffect(() => {

      const head = document.querySelector('head');
      const script = document.createElement('script');
      script.setAttribute('src',  'https://assets.calendly.com/assets/external/widget.js');
      head.appendChild(script);
    
  }, [])
 
  return (
    <div id="schedule_form" style={{margin: '0 auto', width:'100%'}}>
      {props.url ? <div 
        className="calendly-inline-widget"
        data-url={props.url}
        style={{ 
              marginTop:'1em',
              minWidth: '300px', 
              height: 'max-content'
          }} />
      :<div>VEUILLEZ CHOISIR UN CONSULTANT DANS LA SECTION INFO SUR MON ENTREPRISE</div>}
    </div>
  )
}


/*
export default class Calendly extends Component {

    state ={
      consultant_calendly:''    
    }

    componentDidMount() {
      

    }

  

    render({}){
      console.log(url)
      return (
          
          
      );
    }
  }*/