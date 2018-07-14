<h1>Bamazon Store</h1>

**Description:**

This application implements a simple command line based storefront using the npm inquirer package and the MySQL database backend together with the npm mysql package. The application presents two interfaces: customer and manager.

**Customer Interface:**

![Customer View](/images/Customer View1.png)

The customer interface allows the user to view the current inventory of Bamazon store items: item IDs, descriptions, department and price. The user is then able to purchase products by selecting the item from the list and the adding the desired quantity when promted. If the selected quantity is currently available in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order. Once purchase is completed, user is prompted whether they would like to continue shopping.

**Manager Interface:**

![Manager View](/images/Bamazon Manager View.png)

<h5>The manager interface presents a list of four options, as below.</h5>

* The View Product Inventory option allows the user to view the current inventory of store items: item IDs, descriptions, department, price, and the quantity in stock.

* The View Products With Low Inventory option shows the user the items which currently have fewer   than 25 units available.

* The Return/Add Products to Inventory option allows the user to select a given item ID and add additional inventory to the target item.

* The Add New Product option allows the user to enter details about a new product which will be entered into the database upon completion of the form.


[link to my portfolio]()