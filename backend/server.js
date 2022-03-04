const express = require('express')
const app = express()
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();
const url = process.env.RPC_URL

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
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/web3provider', function (req, res, next) {
    res.json({'url':url})
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})