const express = require('express');
const logger = require('morgan');

const PORT = process.env.PORT || 4040;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('*', (req, res) => {
  res.send('Welcome');
})

app.post('/', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body;
  if(text == '') {
    // First response, note how we start the response with CON
    let response = `CON What would you want to check
    1. My Account
    2. My Phone Number`
    res.send(response);
  } else if (text == '1') {
   // Business logic for first level response
  let response = `CON Choose account information you want to view
  1. Account number
  2. Account balance`
  res.send(response)
  } else if (text == '2') {
    // Businsess logic for first level response
    let response = `END Your phone number is ${phoneNumber}`;
    res.send(response);
  } else if (text == '1*1') {
    // Business logic for first level response
    let accountNumber = `ACC1001`
    // This is a terminal request. Note how we start the reponse with END
    let response = `END Your account number is ${accountNumber}`;
    res.send(response)
  } else if (text == '1*2') {
    // This is a second level response where the user selected 1 in the first instance
    let balance = 'NGN 10, 000'
    // This is a terminal request, note how we start it with END
    let response = `END Your balance is ${balance}`;
    res.send(response)
  } else {
    res.status(400).send('Bad request')
  }
})

app.post('/test', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body;
  if (text == '') {
    let response = `CON Welcome to FoodBank
    Select Food Bundle
    1. Rice
    2. Oil
    3. Flour`
    res.send(response);
  } else if (text == '1') {
    let response = `CON You chose Rice
    Please select payment method
    1. Credit Card
    2. Debit Card`
    res.send(response)
  } else {
    res.status(400).send('Bad request')
  }
})

app.post('/symptoms-checker', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body;
  if (text == '') {
    let response = `CON Welcome to Symptoms Checker
    Have you travelled to Lagos, Abuja, or any place known
    to have high number of confirmed cases in the last 14 days
    1. Yes
    2. No`
    res.send(response);
  } else {
    res.status(400).send('Bad request')
  }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))