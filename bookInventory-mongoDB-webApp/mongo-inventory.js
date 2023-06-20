const { MongoClient } = require("mongodb");
const express = require("express");
var app = express();
var expressHandlebars = require("express-handlebars");
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
// MongoDB connection
const uri =
"mongodb+srv://username:password@databaseName.xdstcuh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDb() {
  await client.connect();
}
connectDb().catch(console.error);
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
          <p>Developer: AMAY SHAH | 500909580 | Lab 8</p>
          <p><a href="/bookinventory/add" class="btn btn-primary">Add a new book</a></p>
          <p><a href="/bookinventory/list" class="btn btn-secondary">View book inventory</a></p>
        </div>
      </body>
    </html>
  `);
});

app.get("/bookinventory/list", async function (req, res) {
  try {
    const collection = client.db("Library").collection("books");
    const books = await collection.find({}).toArray();
    let html = '<div class="container">';
    for (var i = 0; i < books.length; i++) {
      html += `
        <div class="row">
          <div class="col-sm">
            <b>Title:</b> ${books[i].title}
          </div>
          <div class="col-sm">
            <b>Author:</b> ${books[i].author}
          </div>
          <div class="col-sm">
            <b>Publisher:</b> ${books[i].publisher}
          </div>
          <div class="col-sm">
            <b>Date:</b> ${books[i].date}
          </div>
          <div class="col-sm">
            <b>Website:</b> ${books[i].website}
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
  } catch (err) {
    console.error("Error:", err);
  }
});

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

app.post("/bookinventory/addbook", async function (req, res) {
  console.log(req.body);
  var new_book = {
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    date: req.body.date,
    website: req.body.website,
  };

  try {
    const collection = client.db("Library").collection("books");
    const result = await collection.insertOne(new_book);
    res.send(
      "Book: " +
        new_book.title +
        ' added! <br> <a href="/bookinventory/list">View Inventory</a>'
    );
  } catch (err) {
    console.error("Error:", err);
  }
});

app.listen(3000, function () {
  console.log(
    "ENTRY SUCCESSFUL: " + "Server running at http://localhost:3000/"
  );
});