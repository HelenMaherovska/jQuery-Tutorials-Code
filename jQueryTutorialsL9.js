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
  var orderTemplate = '' + // '<li>name: {{name}} drink: {{drink}} </li>';
    '<li>' + 
    '<p><strong>Name: </strong> {{name}} </p>' +
    '<p><strong>Drink:  </strong> {{drink}} </p>' +
    '<button data-id="{{id}}" class="remove" id="remove">X</button>' +
    '</li>'
  ;
  function addOrder(order) { // Changed in Lesson 9 (and added DELETE):
    $orders.append(Mustache.render(orderTemplate, order));
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
      },
      error: function () { // Syntax error was from missing ','.
        console.log('error saving an order.');
      }
    });
  });
  // Lessson 9:
  // $('#remove').on('click', function() { // Does not fire!
  $orders.delegate('#remove', 'click', function() {
    console.log('To remove:', $(this).attr('data-id'));
    var $li = $(this).closest('li');
    $.ajax({
      type: 'DELETE', // default.
      url: 'http://rest.learncode.academy/api/mary/orders/' + $(this).attr('data-id'),
      success: function(response) {
        if (response === null) {
          console.log('Removed empty order.');
        } else {
          console.log(response);
          // $li.fadeOut(500, function () {
          //   $(this).remove();
          // });
          $li.fadeOut(500); // No remove needed -- is gone on next refresh. 
        }
      },
      error: function () { // Syntax error was from missing ','.
        console.log('error removing order.');
      }
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
