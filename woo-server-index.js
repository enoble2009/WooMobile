const express = require('express')
var WooCommerceAPI = require('woocommerce-api');
 
var WooCommerce = new WooCommerceAPI({
  url: 'http://localhost/woomobile/',
  consumerKey: 'ck_7da06fc72aaf68df08a75a3d640853fc1fe891b6',
  consumerSecret: 'cs_9866e89fa80f34fd6d69f008cf8725e7d4576fc8',
  wpAPI: true,
  version: 'wc/v3'
});
const app = express()
const port = 3000


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/get-products', (request, response) => {
	WooCommerce.get('products', function(err, data, res) {
	  response.send(res)
	});
})

app.get('/customers/:id', (request, response) => {
  var id = request.params.id;
  WooCommerce.get('customers/'+id, function(err, data, res) {
    response.send(res)
  });
})

app.post('/create-order', (request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    /*response.send(body);*/
    WooCommerce.post('orders', body, function(err, data, res) {
      response.send(res)
    });
  });
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
