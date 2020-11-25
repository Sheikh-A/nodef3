const express = require('express'); // importing a CommonJS module
const morgan = require("morgan");


const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//global middleware applies to every request
server.use(express.json()); //built in middleware
server.use(morgan("tiny"));
server.use(gatekeeper); //not invoked

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
  `);
});

server.post('/cars', addMirrors, (req,res) => {
  let car = req.body;

  res.status(200).json(req.car);

})

//Custom Middleware
function gatekeeper(req, res, next) {
  //return 401 when seconds on clock are divisible by 3
  //read the seconds
  //if sec mutiple of 3 reutn 401
  //next
  const seconds = new Date().getSeconds();

  if(seconds % 3 == 0) {
    res.status(401).json({you: "shall not pass"});
  } else {
    next();
  }

  res.status(401).json({you: "Cannot pass!"});

}

function addMirrors(req, res, next) {
  let car = req.body;
  req.car = car;

  car.mirrors = "cool mirrors";

  next();

}

module.exports = server;
