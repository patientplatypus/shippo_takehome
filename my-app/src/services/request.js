import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `ShippoToken shippo_test_e63bc5d2d64da142a61f88b657bdc3bd6259c09c`//¡ACHTUNG! should typically be held in .env files - for now a private github should suffice 

export const request = (data) => {
  console.log('inside request and data; ', data)

  let dataSend = {
    "address_to": data.address_to, 
    "address_from": data.address_from, 
    "parcels": [data.parcel]
  }

  console.log('value of dataSend: ', dataSend)

  return new Promise((resolve, reject)=>{
    axios.post('https://api.goshippo.com/shipments/', dataSend, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response=>{
      console.log('response from server: ', response);
      resolve(response)
    })
    .catch(error=>{
      console.log('error from server: ', error)
      reject(error)
    })
  })

  
} 

