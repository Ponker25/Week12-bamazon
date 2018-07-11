DROP DATABASE IF EXISTS bamazonDB;

CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE Products (
  id INTEGER NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100)  NOT NULL,
  item_price DECIMAL(10 ,2) NOT NULL,
  stock_qty INTEGER(100) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Golf Shoes", "Footwear", 125.50, 100);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Hiking Boots", "Footwear", 175.00, 75);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Moisture Wicking Socks", "Footwear", 15.75, 34);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Therapeutic Insoles", "Footwear", 33.25, 15);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Cargo Shorts", "Outerwear", 34.50, 34);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Moisture Wicking Shirt", "Outerwear", 63.50, 25);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Innertube", "Bicycles", 23.75, 12);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Bicycle", "Bicycles", 403.25, 3);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Water Filter", "Hydration", 14.50, 300);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Camp Chef Kitchen", "Outdoor Cookwear", 123.50, 15);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Camel Back", "Hydration",  33.25, 175);

INSERT INTO Products (item_name, department_name, item_price, stock_qty)
VALUES ("Colapsable Bowl", "Outdoor Cookwear", 3.25, 85);