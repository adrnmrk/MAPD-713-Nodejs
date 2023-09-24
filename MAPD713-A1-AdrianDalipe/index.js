let SERVER_NAME = 'products-api'
let PORT = 5050;
let HOST = '127.0.0.1';
//Processed requests counter
let getCount = 0;
let postCount = 0;
let deleteCount = 0;

let errors = require('restify-errors');
let restify = require('restify')



  // Get a persistence engine for the products
  , productsSave = require('save')('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('%s method: GET, POST, DELETE', server.url )
  console.log('**** Resources: ****')
  console.log('********************')
  console.log(' /products')
  console.log(' /products/:id')  
})

server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());

// Get all products in the system
server.get('/products', function (req, res, next) {
  console.log('products GET: received request');
  console.log('GET /products params=>' + JSON.stringify(req.params));

  // Find every entity within the given collection
  productsSave.find({}, function (error, products) {

    // Return all of the products in the system
    res.send(products)
  })
  console.log('products GET: response sent');
  getCount++;
  console.log('Processed Request Count> GET ', getCount, ', POST: ', postCount, ', DELETE: ', deleteCount);

})

// Get a single product by their product id
server.get('/products/:id', function (req, res, next) {
  console.log('products GET: received request');
  console.log('GET /products/:id params=>' + JSON.stringify(req.params));
  console.log('products GET: sending response')

  // Find a single product by their id within save
  productsSave.findOne({ _id: req.params.id }, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new Error(JSON.stringify(error.errors)))

    if (product) {
      // Send the product if no issues
      res.send(product)
      getCount++;
      console.log('Processed Request Count> GET: ', getCount, ', POST: ', postCount, ', DELETE: ', deleteCount);

    } else {
      // Send 404 header if the product doesn't exist
      res.send(404)
    }
  })
})

// Create a new product
server.post('/products', function (req, res, next) {
  console.log('products POST: received request')
  console.log('POST /products params=>' + JSON.stringify(req.params));
  console.log('POST /products body=>' + JSON.stringify(req.body));
  console.log('products POST: response sent')

  // validation of manadatory fields
  if (req.body.name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('name must be supplied'))
  }
  if (req.body.price === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('price must be supplied'))
  }
  if (req.body.quantity === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('quantity must be supplied'))
  }
//JSON paylod for new products
  let newproduct = {
    productId: req.body.productId,
		name: req.body.name, 
		price: req.body.price,
    quantity: req.body.quantity
	}

  // Create the product using the persistence engine
  productsSave.create( newproduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new Error(JSON.stringify(error.errors)))

    // Send the product if no issues
    res.send(201, product)
  })
  postCount++;
  console.log('Processed Request Count> GET ', getCount, ', POST: ', postCount, ', DELETE: ', deleteCount);

})

// Update a product by their id
server.put('/products/:id', function (req, res, next) {
  console.log('POST /products params=>' + JSON.stringify(req.params));
  console.log('POST /products body=>' + JSON.stringify(req.body));
  // validation of manadatory fields
  if (req.body.productId === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('productID must be supplied'))
  }
  if (req.body.name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('name must be supplied'))
  }
  if (req.body.price === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('price must be supplied'))
  }
  if (req.body.quantity === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('quantity must be supplied'))
  }
  
  let newproduct = {
    _id: req.params.id,
		productId: req.body.productId,
		name: req.body.name, 
		price: req.body.price,
    quantity: req.body.quantity
	}
  
  // Update the product with the persistence engine
  productsSave.update(newproduct, function (error, product) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new Error(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
  })
})

// Delete product with the given id
server.del('/products/:id', function (req, res, next) {
  console.log('products DELETE: received request');
  console.log('POST /products params=>' + JSON.stringify(req.params));
  // Delete the product with the persistence engine
  productsSave.delete(req.params.id, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new Error(JSON.stringify(error.errors)))

    // Send a 204 response
    res.send(204)
  })
  console.log('products DELETE: response sent');
  
  deleteCount++;
  console.log('Processed Request Count> GET ', getCount, ', POST: ', postCount, ', DELETE: ', deleteCount);

})


