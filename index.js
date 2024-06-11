const express = require("express");
const app = express();
const PORT = 3030;

const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const Router = require("./routes/index.route");

const database = require("./config/database");
database.connect();

app.set("views", `${__dirname}/views`);
app.set("views engine", "pug");
app.use(express.static(`${__dirname}/public`));

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser("quangtruong1703"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

Router(app);
app.listen(PORT, () => {
  console.log("http://localhost:3030/");
});
