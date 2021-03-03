const express = require('express');
const routes = express.Router();

const pool = require('./connection');

const shopping_cart = [
    {id: 1, product: '5 pack pencils', price: 4, quantity: 2},
    {id: 2, product: 'Notebook', price: 2, quantity: 10},
    {id: 3, product: 'Pencil sharpener', price: 10, quantity: 1},
    {id: 4, product: '10 pack erasers', price: 1, quantity: 1},
    {id: 5, product: 'Gum', price: 1, quantity: 3},
];

routes.get("./cart-items", (req, res) => {
  pool.query('SELECT * FROM shopping_cart;').then(result => {
    res.json(result.rows);
  });
});

routes.get('/cart-items', (req, res) => {
  const maxPrice = req.query.maxPrice;
  const prefix = req.query.prefix;
  const pageSize = req.query.pageSize;

  let items = shopping_cart;
  if (maxPrice) {
    items = shopping_cart.filter((item) => {
      return item.price <= maxPrice;       
  }
    )};  
  if (prefix) {
    items = shopping_cart.filter((item) => 
      item.product.startsWith(prefix));
    } 
 if (pageSize) {
   items = shopping_cart.splice(0,(pageSize))
 }
  res.status(200);
  res.send(items); 
});

routes.get('/cart-items/:id', (req, res) => {
pool.query('SELECT * FROM shopping_cart WHERE id=$1', [req.params.id]).then(result => {
    res.json(result.rows);
});
})

//  const item = shopping_cart.find(itemID => itemID.id === parseInt(req.params.id));
// if (!item) return res.status(404).send('Item not found'); // Item not found = 404 error
// res.send(item);
// });

routes.post('/cart-items', function(req, res) {
    pool.query("", [req.body.name]).then(() => {
      res.json(req.body)
    });
  });

//   const item = req.body;
  
//   pool.query(`INSERT INTO shopping_cart (product, price, quantity)
//   VALUES ('paper', '3', '10') `,
//   [
//   item.id, 
//   item.product,
//   item.price,
//   item.quantity,
//   ]
// ).then((results) => {
//   res.status(201);
//   res.send(item);
// });
// });

routes.put('/cart-items/:id', (req, res) => {
   shopping_cart.splice(req.params.id, 1, req.body);
  });

routes.delete("/cart-items/:id", function(req, res) {
    pool.query("DELETE FROM shopping_cart WHERE id=$1", [req.params.id]).then(() => {
        res.sendStatus(204);
    });
});


// export module so it's usable in other files
module.exports = routes;