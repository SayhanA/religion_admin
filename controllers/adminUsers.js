const User = require("../models/user");

const getUsersPage = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("users/users", {
        pageTitle: "Admin Panel",
        path: "users",
        authorized: false,
        users: users || [],
        href: ''
      });
    })
    .catch((err) => console.log(err));
};

module.exports = { getUsersPage };
