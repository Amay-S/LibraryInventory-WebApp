var express = require("express");
var fs = require("fs");
var app = express();
var expressHandlebars = require("express-handlebars");
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

var inventory;
try {
  inventory = JSON.parse(fs.readFileSync("inventory.json", "utf8"));
} catch (err) {
  // If the file doesn't exist or contains invalid JSON, start with an empty inventory.
  console.error(
    "Failed to load inventory from file, starting with empty inventory"
  );
  inventory = [];
}
/*
app.get("/", function (req, res) {
  res.send(
    `<h1 style="text-align: center;">CCPS530 - 6A0 Book Inventory System</h1>
    <p style="text-align: center;">Developer: AMAY SHAH | 500909580</p>
    <p style="text-align: center;"><button><a href="/bookinventory/add">Add a new book</a></p>
    <p style="text-align: center;"><button><a href="/bookinventory/list">View book inventory</a></p>`
  );
});
*/

app.get("/", function (req, res) {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      </head>
      <body>
        <div class="container text-center">
          <h1>CCPS530 - 6A0 Book Inventory System</h1>
          <p>Developer: AMAY SHAH | 500909580</p>
          <p><a href="/bookinventory/add" class="btn btn-primary">Add a new book</a></p>
          <p><a href="/bookinventory/list" class="btn btn-secondary">View book inventory</a></p>
        </div>
      </body>
    </html>
  `);
});

/*
app.get("/bookinventory/list", function (req, res) {
  var html = "<p>";
  for (var i = 0; i < inventory.length; i++) {
    html += `<b>Title:</b> ${inventory[i].title} <br>
    <b>Author:</b> ${inventory[i].author} <br>
    <b>Publisher:</b> ${inventory[i].publisher} <br>
    <b>Date:</b> ${inventory[i].date} <br>
    <b>Website:</b> ${inventory[i].website} <br><hr>`;
  }
  html += "</p>";
  res.send("Inventory: <br>" + html);
});
*/

app.get("/bookinventory/list", function (req, res) {
  var html = '<div class="container">';
  for (var i = 0; i < inventory.length; i++) {
    html += `
      <div class="row">
        <div class="col-sm">
          <b>Title:</b> ${inventory[i].title}
        </div>
        <div class="col-sm">
          <b>Author:</b> ${inventory[i].author}
        </div>
        <div class="col-sm">
          <b>Publisher:</b> ${inventory[i].publisher}
        </div>
        <div class="col-sm">
          <b>Date:</b> ${inventory[i].date}
        </div>
        <div class="col-sm">
          <b>Website:</b> ${inventory[i].website}
        </div>
      </div>
      <hr>`;
  }
  html += "</div>";
  res.send(`<!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      </head>
      <body>
        <div class="container text-center">
          <h1>Inventory</h1>
          ${html}
        </div>
      </body>
    </html>`);
});

/*
app.get("/bookinventory/add", function (req, res) {
  var html = `<form action="/bookinventory/addbook" method="post">
        <br>
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title"><br>
        <label for="author">Author:</label><br>
        <input type="text" id="author" name="author"><br>
        <label for="publisher">Publisher:</label><br>
        <input type="text" id="publisher" name="publisher"><br>
        <label for="date">Date:</label><br>
        <input type="date" id="date" name="date"><br>
        <label for="website">Website:</label><br>
        <input type="url" id="website" name="website"><br><br>
        <input type="submit" value="Submit"><br>
      </form>`;
  res.send(
    "Insert a book: " +
      html +
      '<br><button><a href="/bookinventory/list">View Inventory</a>'
  );
});
*/

app.get("/bookinventory/add", function (req, res) {
  var html = `<form action="/bookinventory/addbook" method="post" class="container">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" class="form-control">
        </div>
        <div class="form-group">
          <label for="author">Author:</label>
          <input type="text" id="author" name="author" class="form-control">
        </div>
        <div class="form-group">
          <label for="publisher">Publisher:</label>
          <input type="text" id="publisher" name="publisher" class="form-control">
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" name="date" class="form-control">
        </div>
        <div class="form-group">
          <label for="website">Website:</label>
          <input type="url" id="website" name="website" class="form-control">
        </div>
        <input type="submit" value="Submit" class="btn btn-primary">
      </form>`;
  res.send(`<!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      </head>
      <body>
        <div class="container text-center">
          <h1>Add a New Book</h1>
          ${html}
        </div>
      </body>
    </html>`);
});

app.post("/bookinventory/addbook", function (req, res) {
  console.log(req.body);
  var new_book = {
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    date: req.body.date,
    website: req.body.website,
  };

  inventory.push(new_book);

  fs.writeFile(
    "inventory.json",
    JSON.stringify(inventory),
    "utf8",
    function (err) {
      if (err) {
        console.error("Failed to write inventory to file");
        return;
      }

      res.send(
        "Book: " +
          new_book.title +
          ' added! <br> <a href="/bookinventory/list">View Inventory</a>'
      );
    }
  );
});

app.listen(3000, function () {
  console.log(
    "ENTRY SUCCESSFUL: " + "Server running at http://localhost:3000/"
  );
});