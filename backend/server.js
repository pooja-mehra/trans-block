const express = require('express')
const app = express()
const cors = require('cors')
const Web3 = require("web3") 
const port = 3000
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.RPC_URL
const chainlink_address = process.env.CHAINLINK_ADDRESS

app.options('*', cors()) 
const corsOpts = {
    origin: 'http://localhost:4200',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
app.use(cors(corsOpts));
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // next();
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With', 'X-HTTP-Method-Override');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
    });


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/price', function (req, res, next) {
  const web3 = new Web3(url);
  const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, chainlink_address)
  priceFeed.methods.latestRoundData().call()
      .then((roundData) => {
          // Do something with roundData
          const latestPrice = (roundData.answer * 10 ** -8).toFixed(2);
          res.json({'price':latestPrice})
      })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})