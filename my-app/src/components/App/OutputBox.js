import React, { Component } from 'react';

import '../../styles/root.css'
import '../../styles/main.css'

import {request} from '../../services/request';
import {Column, Row, Item} from '../../helpers/flex';

import renderIf from 'render-if';


class OutputBox extends Component{

  state={
    rates: []
  }

  rateSetter(rates){
    if(rates.length>0){
      this.setState({rates: rates});
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps!=this.props){
      console.log('value of props: ', this.props);
      this.rateSetter(this.props.response_data.rates)
    }
  }

  rateBox = (rateItem) => {
    return(
      <Column>
        <Item>
          <Row style={{textDecoration: 'underline'}}>
            <Item style={{fontWeight: 'bold'}}>
              <h2>
                {rateItem.provider}
              </h2>
            </Item>
            <Item>
              <p>
                {rateItem.servicelevel.name}
              </p>
            </Item>
            <Item>
              <img src={rateItem.provider_image_200}
                style={{maxHeight: '100%', maxWidth: '33%'}}
              />
            </Item>
          </Row>
        </Item>        
        <Item>
          <Row>
            <Item>
              <p>
                {rateItem.currency=="USD"?"$":"?"} {rateItem.amount}
              </p>
            </Item>
            <Item/>
            <Item>
              {rateItem.attributes.map((attr, index)=>{
                return(
                  <div 
                    key={index}
                    style={{fontWeight: 'bold', marginRight: '1vw'}}
                  >
                    <p>
                      {attr}
                    </p>
                  </div>
                )
              })}
            </Item>
          </Row>
        </Item>
        <Item>
          <Row>
            <Item style={{fontStyle: 'italic'}}>
              <p>
                {rateItem.duration_terms}
              </p>
            </Item>
          </Row>
        </Item>
        <Item>
          <p>
              We estimate your package will arrive in {rateItem.estimated_days} days
          </p>
        </Item>
      </Column>
    )
  }

  mapRates = () => {
    if(this.state.rates!=[]){
      return(
        <Column>
          {this.state.rates.map((rate, index)=>{
            return(
              <Item key={index}>
                <div className='itemCard'>
                  {this.rateBox(rate)}
                </div>
              </Item>
            )
          })}
        </Column>
      )
    }
  }

  render(){
    return(
      <div className='output paddingHandler'>
        <h1>
          Shipping Output
        </h1>
        <div className='card' style={{marginTop: '1vh', height: '90%'}}>
          {renderIf(this.props.response_status=='Requesting Shipping Data...')(
            <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
              <Column>
                <Item flex='2'/>
                <Item flex='2'>
                  <span style={{fontStyle: 'italic'}}>
                    {this.props.response_status}
                  </span>
                </Item>
                <Item/>
              </Column>
            </div>
          )}
          {renderIf(this.props.response_status=='oh noes, much error')(
            <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
              <Column>
                <Item flex='2'/>
                <Item flex='2'>
                  <span style={{fontStyle: 'italic'}}>      {this.props.response_status}
                  </span>
                  <br/>
                  {this.props.response_error}
                </Item>
                <Item/>
              </Column>
            </div>
          )}
          {renderIf(this.props.response_status=='oh noes, much error')(
            <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
              <Column>
                <Item flex='2'/>
                <Item flex='2'>
                  <span style={{fontStyle: 'italic'}}>      {this.props.response_status}
                  </span>
                  <br/>
                  {this.props.response_error}
                </Item>
                <Item/>
              </Column>
            </div>
          )}
          {renderIf(
            this.props.response_status=='Data Received!' &&
            this.props.response_data.rates!={}
          )(
            <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
              {this.mapRates()}
            </div>
          )}
        </div>
      </div>
    );
  }
}





export default OutputBox;