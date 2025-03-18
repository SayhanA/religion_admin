const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/",
    authorized: false,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  try {
    user.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(500).render("auth/login", {
          pageTitle: "Login",
          path: "/",
          authorized: false,
          values: { ...req.body },
          errorMessage: [{ message: "Invalid User email" }],
        });
      }

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(500).render("auth/login", {
              pageTitle: "Login",
              path: "/",
              authorized: false,
              values: { ...req.body },
              errorMessage: [{ message: "Invalid Password" }],
            });
          }
          req.session.isLoggedIn = true;
          req.session.user = user;
          console.log({user});
          console.log("User authenticated successfully");
          return res.redirect("/admin");
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).render("auth/login", {
            pageTitle: "Login",
            path: "/",
            authorized: false,
            values: { ...req.body },
            errorMessage: [{ message: "Error authenticating user" }],
          });
        });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("auth/login", {
      pageTitle: "Login",
      path: "/",
      authorized: false,
      values: { ...req.body },
      errorMessage: [{ message: "An unexpected error occurred" }],
    });
  }
};

exports.getlogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
    }
    res.redirect("/");
  });
};

exports.getSignUp = (req, res, next) => {
  console.log({ session: req.session.isLoggedIn });

  res.render("auth/signup", {
    pageTitle: "SignUp",
    path: "/signup",
    authorized: false,
    values: { name: "", email: "" },
  });
};

exports.postSignUp = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error hashing password");
      }

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          if (user) {
            res.render("auth/login", {
              pageTitle: "Login",
              path: "/login",
              authorized: false,
              values: { ...req.body },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).render("auth/signup", {
            pageTitle: "SignUp",
            path: "/signup",
            authorized: false,
            values: { ...req.body },
            errorMessage: "Error saving user. Please try again.",
          });
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("auth/signup", {
      pageTitle: "SignUp",
      path: "/signup",
      authorized: false,
      values: { ...req.body },
      errorMessage: "Error saving user. Please try again.",
    });
  }
};
