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
    console.log("\n");
    console.log("****************************** BAMAZON MANAGER VIEW ********************************************")
    console.log("You are connected to bamazonDB as a Bamazon Manager id: " + connection.threadId);
    managerSearch();
  });

    function managerSearch() {
        inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Find inventory of products for sale on Bamazon","View products with low inventory","Return products back into inventory","Add a new product",],
        })
        .then(function(answer) {
            switch (answer.action) {
            case "Find inventory of products for sale on Bamazon":
            displayInventory();
            break;
    
            case  "View products with low inventory":
            inventoryView();
            break;
    
            case "Return products back into inventory":
            returnItem();
            break;
    
            case "Add a new product":
            addProduct();
            break;
            }
        });
    }

// DISPLAY INVENTORY FUNCTION:
  function displayInventory() {
    // console.log("Product Search View");
    connection.query("SELECT * FROM Products ", function(err, res) {
        if (err) throw err;
                console.log("\n");
                console.log("                     CURRENT BAMAZON INVENTORY                             ");
                console.log("**************************************************************************");
                var columns = columnify(res);
                console.log(columns);
                for (var i = 0; i < res.length; i++) {
                // console.log("id: " + res[i].id + " || " + res[i].item_name + " || Price: " + res[i].item_price + " ea." + " || Qty in Stock: " + res[i].stock_qty);
                }
                console.log("**************************************************************************");
                console.log("\n");
            });
        connection.end();
  }

//   LOW INVENTORY FUNCTION:
  function inventoryView() {
    // console.log("Low Inventory View");
        var query = "SELECT * FROM Products WHERE stock_qty < 25";
        connection.query(query, function(err, res) {
        if (err) throw err; 
        console.log("\n");
        console.log("                      LOW INVENTORY ON BAMAZON                            ");
        console.log("**************************************************************************");
        for (var i = 0; i < res.length; i++) {
        // console.log("id: " + res[i].id + " || " + res[i].item_name + " || Price: " + res[i].item_price + " ea." + " || Qty in Stock: " + res[i].stock_qty);    
    }
    var columns = columnify(res);
    console.log(columns);
        console.log("**************************************************************************");
        console.log("\n");
    });
    connection.end();
  }

  function validateInteger(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

function validateNumber(value) {
	// Value must be a positive number
	var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Please enter a positive number for the unit price.'
	}
}

// RETURN ITEM FUNCTION:
  function returnItem() {
    // console.log("Return Item View");
    inquirer.prompt([{
        type: "input",
        name: "return",
        message: "What is the item you would like to return?",
        // valdidate: validateInteger,
        // filter: Number
    },
    {
        type: "input",
        name: "return_qty",
        message: "How many are you returning?",
        validate: validateInteger,
        filter: Number
    }
]).then(function(input) {
    var item = input.id;
    var returnQty = input.return_qty;

    connection.query("SELECT * FROM  Products WHERE ?", {item_name: item}, function(err, res) {
        if (err) throw err; 
        if (res.length === 0) {
            console.log("ERROR Invalid Item_ID. Please select a valid Item_ID");
        } else {
            var returnProduct = res[0];
            console.log("Updating Inventory....")
            connection.query('UPDATE Products SET stock_qty = ' + (returnProduct.stock_qty + returnQty) + 'WHERE item_id = ' + item);
            console.log("\n");
            console.log("Inventory Updated for " + item + " New Qty = " + (returnProduct.stock_qty + returnQty)+ ".");
            console.log("****************************************************************************************");
            connection.end();
        }
    })
  })
}

// ADD PRODUCT FUNCTION:
  function addProduct() {
    console.log("Add Product View");
    inquirer.prompt([ 
        {
        type: "input",
        name: "item", 
        message: "What is the name of the new product?",
        },
        {
        type: "input",
        name: "department",
        message: "What department does the new product belong to?",
        },
        {
        type: "input",
        name: "price",
        message: "What is the price per unit?",
        validate: validateNumber,
        },
        {
        type: "input",
        name: "stock_qty",
        message: "How many items are being added to inventory?",
        validate: validateInteger,
        }]).then(function(input) {
            console.log("\n");
            console.log('New Item: \n Item_Name: ' + input.item + ' | Department: ' + input.department + ' | Price:' + input.price + ' | Stock_qty = ' + input.stock_qty + '\n' + 'ADDED TO BAMAZON INVENTORY');
            console.log("\n");

            connection.query("INSERT INTO Products SET ?", {
                    item_name: input.item, 
                    department_name: input.department, 
                    item_price: input.price, 
                    stock_qty: input.stock_qty
                }, 
                function(err) {
                if (err) throw err;
                console.log("You added " + input.item + " to Bamazon inventory");
            });
            managerSearch();
    })
}

