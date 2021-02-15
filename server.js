// require the Express module
const express = require("express");

// creates an instance of an Express server
const app = express();

//allows us to use query strings params,
//paths params, and body all in the request object
app.use(express.json());

const cartItems = [
    {id: 1, product: '5 pack pencils', price: 4, quantity: 2},
    {id: 2, product: 'Notebook', price: 2, quantity: 10},
    {id: 3, product: 'Pencil sharpener', price: 10, quantity: 1},
    {id: 4, product: '10 pack erasers', price: 1, quantity: 1},
    {id: 5, product: 'Gum', price: 1, quantity: 3}
]

app.get('/cartItems', (req, res) => {
  const maxPrice = req.query.maxPrice;
  const prefix = req.query.prefix;
  const pageSize = req.query.pageSize;

  let items = cartItems;
  if (maxPrice) {
    items = cartItems.filter((item) => {
      return item.price <= maxPrice;       
  }
    )};  
  if (prefix) {
    items = cartItems.filter((item) => 
      item.product.startsWith(prefix));
    } 
 if (pageSize) {
   items = cartItems.splice(0,(pageSize))
 }
  res.status(200);
  res.send(items); 
});

app.get('/cartItems/:id', (req, res) => {
 const item = cartItems.find(itemID => itemID.id === parseInt(req.params.id));
if (!item) return res.status(404).send('Item not found'); // Item not found = 404 error
res.send(item);
});

app.post('/cartItems', (req, res) => {
  const item = {
  id: cartItems.length + 1, 
  product: req.body.product,
  price: req.body.price,
  quantity: req.body.quantity
  };
  cartItems.push(item);
  
  res.status(201);
  res.send(item);  
});

app.put('/cartItems/:id', (req, res) => {
  // look up item
  const item = cartItems.find(itemID => itemID.id === parseInt(req.params.id));
 
  // if item does not exist return 404
  if (!item) return res.status(404).send('Item not found'); // Item not found = 404 error

  // update item
  item.product = req.body.product, item.price = req.body.price, item.quantity = req.body.quantity;

  //return updated item
  res.status(200);
  res.send(item);
});

app.delete('/cartItems/:id', (req, res) => {
   // look up item
   const item = cartItems.find(itemID => itemID.id === parseInt(req.params.id));
 
   // if item does not exist return 404
   if (!item) return res.status(404).send('Item not found'); 

  // Delete
  const index = cartItems.indexOf(item);
  cartItems.splice(index, 1);
  
  res.status(204);
  res.send(item);
});


// define the port
const port = 3000;

// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));