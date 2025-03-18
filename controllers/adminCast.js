const Caste = require("../models/caste");
const Religion = require("../models/religion");

//GET /admin/caste
const getCasts = async (req, res, next) => {
  try {
    const castes = await Caste.find();

    const formattedCastes = await Promise.all(
      castes.map(async (caste) => {
        const casteObj = caste.toObject();
        const religion = await Religion.findById(caste.religionId).catch(
          (err) => {
            console.error("Error fetching religion:", err);
            return null;
          }
        );

        return {
          ...casteObj,
          religion,
          createdOn: caste.createdOn
            ? new Date(caste.createdOn).toLocaleDateString("en-BD", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A",
          updatedOn: caste.updatedOn
            ? new Date(caste.updatedOn).toLocaleDateString("en-BD", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A",
        };
      })
    );

    res.render("casts/caste", {
      pageTitle: "Cast | Admin Panel",
      path: "caste",
      authorized: false,
      castes: formattedCastes || [],
      religions: await Religion.find(),
      href: "/admin/castes/add",
    });
  } catch (err) {
    console.error("Error fetching castes:", err);
    res.redirect("/");
  }
};

const updateCaste = async (req, res, next) => {
  try {
    const { id, name, description } = req.body;

    if (id) {
      const updatedCasts = await Caste.findByIdAndUpdate(
        id,
        {
          name,
          description,
          updatedOn: new Date(),
        },
        { new: true }
      );

      if (!updatedCasts) {
        return res.status(404).json({ message: "caste not found" });
      }
      return res.redirect("/admin/castes");
    }
    // return res.status(200).redirect("/admin/castes");
  } catch (error) {
    console.error("Error updating Caste:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteCaste = (req, res, next) => {
  console.log(req.query.id);
  const id = req.query.id;
  Caste.deleteOne({ _id: id })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
  res.redirect("/admin/castes");
};

const getAddCaste = async (req, res, next) => {
  const religions = await Religion.find();

  res.render("casts/casteForm.ejs", {
    pageTitle: "Add caste form | Admin",
    path: "casteForm",
    religions,
  });
};

const createCaste = async (req, res, next) => {
  const newCaste = new Caste({ ...req.body });
  const religions = await Religion.find();

  newCaste
    .save()
    .then((caste) => {
      console.log({ caste });
      res.redirect("/admin/castes");
    })
    .catch((err) => {
      res.render("casts/casteForm.ejs", {
        pageTitle: "Add caste form | Admin",
        path: "casteForm",
        religions,
        errorMessage: err.message,
      });
    });
};

const deleteAllCastes = (req, res, next) => {
  Caste.deleteMany()
    .then((data) => {
      res.redirect("/admin/castes");
    })
    .catch((err) => {
      console.log("err");
      res.redirect("/");
    });
};

module.exports = {
  getCasts,
  updateCaste,
  createCaste,
  deleteCaste,
  getAddCaste,
  deleteAllCastes
};
