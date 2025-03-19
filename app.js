const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const isAuthorized = require("./middleware/isAuthorized");
const { get404 } = require("./controllers/404");
const { default: mongoose } = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoUri = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 4000;
const store = new MongoDBStore({
  uri: mongoUri,
  collection: "sessions",
});

//template engine
app.set("view engine", "ejs");
app.set("views", "views");
// app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day (in milliseconds)
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(require("./routes/auth"));
app.use("/religions", require("./routes/religion"));
app.use("/admin", isAuthorized, require("./routes/adminUsers"));
app.use("/admin/religion", isAuthorized, require("./routes/adminReligion"));
app.use("/admin/castes", isAuthorized, require("./routes/adminCast"));
app.use("/casts", require("./routes/caste"));
app.use(get404);
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

mongoose
  .connect(mongoUri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running on: http://localhost:${PORT}/`)
    )
  )
  .catch((err) => console.error(err));

module.exports = app;
