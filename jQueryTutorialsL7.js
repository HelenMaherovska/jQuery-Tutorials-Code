/* RESTful API to use for practice!: http://rest.learncode.academy/ */

/*
See notes at end of this file.
Video uses a localhost server for db. He does not describe the setup at all.
He refers in the notes to an online db: http://rest.learncode.academy/
I used a user name of Mary and a collection of orders.
 http://rest.learncode.academy/api/mary/orders
I have not been able to put data into it except for and id. 
*/
// 'use strict'; moved to fix linting errors.
$(function() {
  'use strict';
  var $orders = $('#orders'); // Casche the DOM orders.
  $.ajax({
    // What url to get and how to get that info.
    type: 'GET', // default.
    // url: '/api/orders', // In video with localhost:3000.
    // The notes in the video show RESTful API to use for practice!:
    url: 'http://rest.learncode.academy/api/mary/orders', // example for db.
    success: function(orders) {
      // console.log("db orders received:", orders); // For testing - empty array.
      if (orders.length === 0) {
        console.log('orders from db is empty array.');
        // Define first element:
        orders[0] = {name: "Empty db Test Name", drink: "Test Drink"};
      }   
      // console.log("db orders now:", orders); // For testing.
      $.each(orders, function (indx, order) {
        // console.log('this order = ', order); // name: Joseph, ...
        // Add to html:  Will do with templating engine in next video.
        $orders.append('<li>name: ' + order.name +
         ' , drink: ' + order.drink + '</li>');
        // console.log("Now my displayed local orders are:", $orders[0]);
      });
    }
  });
});
/*
Note: My posts to http://rest.learncode.academy/api/mary/orders are only 
  producing an id, not the data.
I did this with two tools: postman and with Simple REST client.
Backend Team Notes:
API
---- 
Get All Orders
GET request to /api/orders
Sample Response:
[
  { id: 1,
    name: 'James',
    drink: 'Coffee'
  },
  { id: 2,
    name: 'John',
    drink: 'Latte'
  },
]
--- 
Add an Order
POST request to /api/orders
Type: JSON
Sample Post:
{ name: 'James',
  drink: 'Coffee',
}
localhost:3000/api/orders ?=>? { id: 1, name: "Will", drink: "Americaso w/ Creme"}, ...?
Get a collection: GET /api/:user/:collection
(Choose any username except learncode and collection name you like)
                  GET /api/mary/orders [?]
$.ajax({
  type: 'GET',
  url: 'http://rest.learncode.academy/api/mary/orders',
  success: function(data) {
    console.log("I have orders!", data); //returns all of mary's orders
  }
});
*/

// ?name="Fred"&drink="Coke"
// POST /api/mary/orders/?name="Fred"&amp;drink="Coke" HTTP/1.1
// Host: rest.learncode.academy
// Content-Type: application/json
// Cache-Control: no-cache
// Postman-Token: d984bd5d-5cdf-5bd5-4e04-31500053a5c9
