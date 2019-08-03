import React, { Component } from 'react';

import '../styles/root.css'
import '../styles/main.css'

import {request} from '../services/request';
import {Column, Row, Item} from '../helpers/flex'

import InputBox from '../components/App/InputBox'
import OutputBox from '../components/App/OutputBox'


import renderIf from 'render-if';


class App extends Component{

  state={
    response_status: 'none',
    response_error:'',
    response_data: {
      rates: []
    },
    filter: false, 
    address_to:{
      "object_id": "0476d70c612a423f9509ba5f807569db",
      "is_complete": true,
      "validation_results": {},
      "name": "Mr Hippo",
      "street1": "965 Mission St #572",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94103",
      "country": "US",
      "phone": "4151234567",
      "email":"mrhippo@goshippo.com"
    },
    inputColumns:{
      address_from:{
        "name": "Mrs Hippo",
        "street1": "1092 Indian Summer Ct",
        "city": "San Jose",
        "state": "CA",
        "zip": "95122",
        "country": "US",
        "phone": "4159876543",
        "email": "mrshippo@goshippo.com"
      },
      address_to:{
        "name": "",
        "street1": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": "",
        "phone": "",
        "email": ""
      },
      parcel:{
        "length": "10",
        "width": "15",
        "height": "10",
        "distance_unit": "in",
        "weight": "1",
        "mass_unit": "lb"
      },
    }
  }

  useDummyData(){
    let newState = Object.assign({}, this.state);
    for (var key in this.state.inputColumns.address_to){
      newState['inputColumns']['address_to'][key] = this.state.address_to[key];
    }
    this.setState(newState);
  }

  multiStateHandler(objRet){
    let newState = Object.assign({}, this.state);
    Object.keys(objRet).forEach(key=>{
      newState[key] = objRet[key];
    })
    this.setState(newState)
  }

  render(){
    return(
      <div className={`wrapper filterTransition ${this.state.filter?'filter':''}`}>
        <div className='header'>
          <img
            className='icon'
            src='https://shippo-static.s3.amazonaws.com/img/logo-v2/shippo-logo-charcoal-small.svg'
            alt='a_very_shippo_hippo'
          />
          <div className='filterIcon'
            onClick={()=>{
              this.setState({filter: !this.state.filter})
            }}
            style={{color: 'purple'}}
          >
            {this.state.filter?'☽':'☼️'}
          </div>
        </div>
        <InputBox
          inputColumns={this.state.inputColumns}
          useDummyData={()=>this.useDummyData()}
          multiStateHandler={(objRet)=>{this.multiStateHandler(objRet)}}
        />
        <OutputBox
          response_status={this.state.response_status}
          response_error={this.state.response_error}
          response_data={this.state.response_data}
        />
      </div>
    );
  }
}
export default App;
