var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("****************************************************************************************");
    console.log("You are connected to bamazonDB as a Customer id: " + connection.threadId);
    start();
  });

function start() {
    // query the database for all items sold
    connection.query("SELECT * FROM Products ", function(err, res) {
        if (err) throw err;
        // once we have the items in the table, prompt user what they would like to buy. 
        
        inquirer.prompt([ {
            name: "choice",
            type: "list",
            message: "What item(s) would you like to purchase?",
            choices: function() {
                var itemArray = [];
                console.log("\n");
                console.log("=============================== WELCOME TO BAMAZON =====================================");
                console.log("                            ITEMS FOR SALE ON BAMAZON                                   ");
                console.log("****************************************************************************************");
                var columns = columnify(res);
                console.log(columns);
                for (var i = 0; i < res.length; i++) {
                // console.log("id: " + res[i].id + " || " + res[i].item_name + " || Price: " + res[i].item_price + " ea." + " || Qty in Stock: " + res[i].stock_qty);
                    itemArray.push(res[i].item_name);
                }
                console.log("****************************************************************************************");
                return itemArray;
            },

            message: "What are you interested in purchasing today?"
            },
            {
                name: "sale",
                type: "input",
                message: "How many would you like to add to your cart?"
            }])
        .then(function(answer) {
               var chosenItem;
               for (var i = 0; i < res.length; i++) {
                   if (res[i].item_name === answer.choice) {
                    chosenItem = res[i];
                   }
               }
        // is there enough in stock?
               if (chosenItem.stock_qty > parseInt(answer.sale)) {
                   var updatedQty = chosenItem.stock_qty-parseInt(answer.sale);
                   console.log("New Qty= " +updatedQty);
                   connection.query("UPDATE Products SET ? WHERE ?",[{stock_qty: updatedQty},{item_id: chosenItem.id}],function(err) {
                           if (err) throw err;
                           var total = chosenItem.item_price*answer.sale;
                           console.log("=============================================================================");
                           console.log("Item(s) successfully purchased!");
                           console.log("\n");
                           console.log("Your grand total is: " + total);
                           console.log("=============================================================================");
                           continueShopping();
                       }
                   );
               } 
               else {
                   console.log("==============================================================================");
                   console.log("We are sorry... Not enough " + chosenItem.item_name + "(s)in stock to complete your order. Please try a smaller amount.");
                   continueShopping();
               }
            });
        });
    }

function continueShopping() {
    inquirer.prompt([ {
        name: "continue",
        type: "confirm",
        message: "Would you like to keep shopping?"
    }]).then(function(answer) {
        if(answer.continue) {
            start();
        } else {
        console.log("*****************************************************************************************************************************************")
        console.log("THANK YOU FOR SHOPPING AT BAMAZON... PLEASE COME AGAIN SOON!");
        }
        connection.end();
    })
}
