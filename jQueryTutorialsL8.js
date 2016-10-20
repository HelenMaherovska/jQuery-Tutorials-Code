/* RESTful API to use for practice!: http://rest.learncode.academy/ */

/*
See notes at end of this file.
Video uses a localhost server for db. He does not describe the setup at all.
He refers in the notes to an online db: http://rest.learncode.academy/
I used a user name of Mary and a collection of orders.
 http://rest.learncode.academy/api/mary/orders
The PUT code added here adds orders to the collection. 
I still have not been able to put data in with the other tools,
 so there must be something about this db that is not working correctly. 
*/
// 'use strict'; moved to fix linting errors.
$(function() {
  'use strict';
  var $orders = $('#orders'),
    $name = $('#name'),
    $drink = $('#drink')
  ; // Casche the DOM orders.
  function addOrder(order) {
    $orders.append('<li>name: ' + order.name +
         ' , drink: ' + order.drink + '</li>'
    );
  }
  $.ajax({
    type: 'GET', // default.
    url: 'http://rest.learncode.academy/api/mary/orders', // example for db.
    success: function(orders) {
      if (orders.length === 0) {
        console.log('orders from db is empty array.');
        // Define first element:
        orders[0] = {name: "Empty db Test Name", drink: "Test Drink"};
      }   
      $.each(orders, function (indx, order) { 
        addOrder (order);
      //   $orders.append('<li>name: ' + order.name +
      //    ' , drink: ' + order.drink + '</li>');
      });
    },
    error: function() {
      console.log('error loading orders.');
    }
  });
  // Post to db: ~ Lessosn 8.
  $('#add-order').on('click', function () {
    var order = {
      name: $name.val(),
      drink: $drink.val()
    };
   
    $.ajax({
      type: 'POST', // default.
      url: 'http://rest.learncode.academy/api/mary/orders', // example for db.
      data: order,
      success: function(newOrder) {
        if (newOrder === null) {
          console.log('New order to db is empty.');
        }
        addOrder (newOrder);
        // $orders.append('<li>name: ' + newOrder.name +
        //    ' , drink: ' + newOrder.drink + '</li>');
      }
      // error: function () {
      //   console.log('error saving order.');
      // }
    });
  });
});
/*
I am using http://rest.learncode.academy/api/mary/orders
but not yet able to send data other than an id.
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
