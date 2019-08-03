import React, { Component } from 'react';

import {request} from '../../services/request';
import {Column, Row, Item} from '../../helpers/flex';

import '../../styles/root.css'
import '../../styles/main.css'

import renderIf from 'render-if';



class InputBox extends Component{

  InputColumn = (inputObjKey) => {
    let subObj = this.props.inputColumns[inputObjKey];
    console.log('value of subObj: ', subObj)
    return(
      <div>
        <Column>
          <Item>
            <h2 style={{paddingLeft: '1vw', textDecoration: 'underline'}}>
              {inputObjKey}
            </h2>
          </Item>
          <Item>
            <ul>
              {
                Object.keys(subObj).map((key, index)=>{
                  console.log('value of key in inner loop: ', key)
                  return(
                    <li style={{width: '100%'}}>
                      <Row>
                        <Item/>
                        <Item>
                          <p>
                            {key}
                          </p>
                        </Item>
                        <Item/>
                        <Item flex='5'>
                          {renderIf(subObj[key]=='')(
                            <input
                              onChange={(e)=>{this.props.stateHandler(key, e.target.value)}}
                            />
                          )}
                          {renderIf(subObj[key]!=''&&inputObjKey!='address_to')(
                            <span style={{fontStyle: 'italic'}}>
                              *fake* {subObj[key]}
                            </span>
                          )}
                          {renderIf(subObj[key]!=''&&inputObjKey=='address_to')(
                            <span>
                              {subObj[key]}
                            </span>
                          )}
                        </Item>
                        <Item/>
                      </Row>
                    </li>
                  )
                })
              }
            </ul>
          </Item>
        </Column>
      </div>
    );
  }

  render(){
    return(
      <div className='input paddingHandler'>
        <Row style={{height: '5vh'}}>
          <Item flex='5'>
            <h1>
              Input Shipping Details
            </h1>
          </Item>
          <Item>
            <div className='button'
              onClick={()=>{
                this.props.multiStateHandler({response_status: 'Requesting Shipping Data...'});
                request(this.props.inputColumns)
                .then(response=>{
                  console.log('value of request response: ', response)
                  let objRet = {
                    response_error_bool: false,
                    response_error: null,
                    response_data: response.data,
                    response_status: 'Data Received!'
                  };
                  this.props.multiStateHandler(objRet);
                })
                .catch(error=>{
                  let objRet = {
                    response_status: 'oh noes, much error',
                    response_error: error.toString()
                  }
                  this.props.multiStateHandler(objRet);
                })
              }}
            >
              shippo!
            </div>
          </Item>
        </Row>
        <div className='card' style={{marginTop: '1vh', height: '90%', overflow:'hidden'}}>
          { 
            Object.keys(this.props.inputColumns).map((key, index)=>{
              return(
                <div key={key}>
                  {this.InputColumn(key)}
                </div>
              )
            })
          }
          <div 
            className='button'
            style={{position: 'absolute', bottom: '5px', right: '5px'}}
            onClick={()=>{
              this.props.useDummyData();
            }}
          >
            use dummy data
          </div>  
        </div>  
      </div>
    );
  }
}

export default InputBox