import React from 'react';
import axios from 'axios';
import { Form, Table } from 'semantic-ui-react';

const cities = [
  'Sandy',
  'Draper',
  'SLC',
  'Orem',
  'Provo',
  'Ogden',
  'Layton',
  'Midvale',
  'Murray',
]


const options = cities.map( c => { return { key: c, text: c, value: c }})

class Cities extends React.Component {
  state = {
    citiy: null,
    properties: [],
    page: 1, 
    total_pages: 0,
  }

  handleChange = (e, {value}) => {
    this.setState({ city: value, properties: [] }, () => {
      this.getProperties(); 
    });
  


  getProperties = () => {
    const { city, properties } = this.state;
    axios.get(`/api/cities/${city}`)
      .then( res => {
        const {properties, total_pages } = res.data;
        this.setState({ properties, total_pages })
      })
  }
  }

}

export default Citites;