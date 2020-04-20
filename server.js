const express = require('express');
const logger = require('morgan');

const PORT = process.env.PORT || 4040;
let houseAddress = null;
let pin = null;

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

app.post('/foodbank', async (req, res) => {
  // let address = ''
  let {sessionId, serviceCode, phoneNumber, text} = req.body;
  if (text == '') {
    let response = `CON Welcome to FoodBank
    Select Food Bundle
    1. View packages
    2. Subscribe to a package`
    res.send(response);
  } else if (text == '1') {
    let response = `CON Select a package to view
    1. Basket for 1 person
    2. Basket for 2 people
    3. Basket for 3 people
    4. Basket for 4 people
    5. Basket for 5 people
    `
    res.send(response)
  } else if (text == '2') {
    let response = `CON Select a package to subscribe to
    1. Basket for 1 person
    2. Basket for 2 people
    3. Basket for 3 people
    4. Basket for 4 people
    5. Basket for 5 people
    `
    res.send(response);
  } else if (text == '2*1') {
    let response = `CON You have selected Basket 1
    1. Location 1
    2. Location 2
    3. Location 3
    4. Location 4
    5. Location 5
    `
    res.send(response)
  } else if (text == '2*1*1') {
    let response = `CON You selected Location 1
    Please choose from selected dates
    1. 1st April
    2. 8th April
    3. 15th April
    4. 22nd April
    5. 29th April
    `
    res.send(response);
  } else if (text == '2*1*1*1') {
    let temp = text;
    text = ''
    let response = `CON Please enter your phone number and address
    `
    // should require await here
    houseAddress = await text;
    text = temp;
    res.send(response);
  } else if (houseAddress) {
    let response = `CON Please select payment method
    1. Cash on delivery
    2. Mobile money
    `
    houseAddress = null;
    res.send(response);
  } else if (text == '2*1*1*1*1') {
    let response = 'END Thank you'
    res.send(response);
  } else if (text == '2*1*1*1*2') {
    let temp = text;
    text = ''
    let response = 'CON Please enter your PIN';
    // should require await
    pin = await text
    text = temp;
    res.send(response)
  } else if (pin) {
    let response = 'END PIN recieved, Thank you'
    res.send(response);
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