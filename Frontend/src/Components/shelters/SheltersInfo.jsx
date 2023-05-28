import React from 'react'
import './sheltersInfo.css'
import mapboxgl from 'mapbox-gl';

export default function SheltersInfo() {
  
  // mapboxgl.accessToken = 'pk.eyJ1IjoicmVoYW40Nzc4IiwiYSI6ImNsY3JnMXN1eTBmbzUzdm40ZDBld21yOW0ifQ.DwFi1qPHKjtUP2xrxFXpWg';
  // const map = new mapboxgl.Map({
  //   container: 'map',
  //   // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  //   style: 'mapbox://styles/mapbox/streets-v12',
  //   center: [12.550343, 55.665957],
  //   zoom: 8
  // });
  

  return (
    <div className='shelters_container'>

      <div className="shelters_map">
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.0000000000005!2d12.550343!3d55.66595700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465
            2b8f8f8f8f8f8%3A0x4652b8f8f8f8f8f8!2sCopenhagen!5e0!3m2!1sen!2sdk!4v1620000000000!5m2!1sen!2sdk"
            allowFullScreen=""
            loading='lazy'
          ></iframe>
        </div>
      </div>
        
      <div className="shelters_info_container">        
        <div className="shelters_info">

        <table>
          <thead>
            <tr>
              <th>Shelter</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Capacity</th>

            </tr>
          </thead>
          <tbody>

            <tr>
              <td>Shelter 1</td>
              <td>Address 1</td>
              <td>Phone 1</td>
              <td>Capacity 1</td>
            </tr>
            <tr>
              <td>Shelter 1</td>
              <td>Address 1</td>
              <td>Phone 1</td>
              <td>Capacity 1</td>
            </tr>
            <tr>
              <td>Shelter 1</td>
              <td>Address 1</td>
              <td>Phone 1</td>
              <td>Capacity 1</td>
            </tr>
            <tr>
              <td>Shelter 1</td>
              <td>Address 1</td>
              <td>Phone 1</td>
              <td>Capacity 1</td>
            </tr>
          </tbody>
        </table>    

        </div>
        
      </div>  


      {/* <div className="shelters_info_container">
        <div className="shelters_info_box">
         </div> 
      </div> */}


    </div>
  )
}
