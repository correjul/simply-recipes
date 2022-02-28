//code from inclass examples

const express = require ('express'); 
const axios = require('axios');  
const cors = require('cors');  
const dotenv = require('dotenv').config()

const ROOT_URL = process.env.ROOT_URL || '' 
const API_KEY = process.env.API_KEY || ''
const PORT = process.env.PORT || 5000

const app	= express()

// middleware
app.use( cors() )          
app.use( express.json() )  
app.use(ROOT_URL+'/', express.static('public')) 

app.get(ROOT_URL+'/api/:date', (req, res) => { 

  //import axios from "axios";

  const options = {
    method: 'GET',
    url: 'https://api.spoonacular.com/recipes/complexSearch/',
    params: {
      apiKey: process.env.API_KEY, 
      addRecipeInformation: true,
      titleMatch: req.params.date,
      instructionsRequired: 'true',
      number: '100'
    }
  };
  
  // axios makes requests from the API
  axios.request(options).then((response) => { 
    // relay the response from the API back to the frontend.
    res.send(  response.data ) 
  }).catch( (error) => {
    // if there is an error, send a message to the frontend.
    res.send( { error: error.message })
  })
  })

  //a second request is needed as it uses a different Root URL
  app.get(ROOT_URL+'/ingredients/:id', (req, res) => { 

    //import axios from "axios"; 
    const options = {
      method: 'GET',
      url: 'https://api.spoonacular.com/recipes/'+req.params.id+'/ingredientWidget.json',
      params: {
        apiKey: process.env.API_KEY
      }
    };
    
    // axios makes requests from the API
    axios.request(options).then((response) => { 
      // relay the response from the API back to the frontend.
      res.send(  response.data ) 
    }).catch( (error) => {
      // if there is an error, send a message to the frontend.
      res.send( { error: error.message })
    })
    })



app.listen(PORT, () => {
    console.log("We are live on port "+PORT )
})

