const Religion = require('../models/religion')

const getReligions = (req, res, next) => {
  Religion.find()
    .then((religions) => {
      const formattedReligions = religions.map((religion) => ({
        ...religion._doc,
        createdOn: religion.createdOn
          ? religion.createdOn.toLocaleDateString("en-BD", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A",
        updatedOn: religion.updatedOn
          ? religion.updatedOn.toLocaleDateString("en-BD", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A",
      }));

      res.render("religions/religion", {
        pageTitle: "Religion | Admin Panel",
        path: "religion",
        authorized: false,
        religions: formattedReligions || [],
        href: "",
      });
    })
    .catch((err) => {
      console.error("Error fetching religions:", err);
      res.status(500).send("Internal Server Error");
    });
};

const updateReligion = async (req, res, next) => {
  try {
    const { id, name, description, isActive } = req.body;

    // Convert isActive to a boolean before updating or saving
    const isActiveBool = isActive === "on"; // 'on' means true, otherwise false

    if (id) {
      const updatedReligion = await Religion.findByIdAndUpdate(
        id,
        {
          name,
          description,
          isActive: isActiveBool,
          updatedOn: new Date(),
        },
        { new: true }
      );

      if (!updatedReligion) {
        return res.status(404).json({ message: "Religion not found" });
      }
      return res.redirect("/admin/religion");
    } else {
      const newReligion = new Religion({
        name,
        description,
        isActive: isActiveBool,
      });
      newReligion
        .save()
        .then((user) => {
          if (user) {
            return res.status(200).redirect("/admin/religion");
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).redirect("/admin/religion");
        });
    }

    // return res.status(200).redirect("/admin/religion");
  } catch (error) {
    console.error("Error updating religion:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteReligion = (req, res, next) => {
  console.log(req.query.id);
  const id = req.query.id;
  Religion.deleteOne({ _id: id })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
  res.redirect("/admin/religion");
};

const deleteAllReligions = (req, res, next) => {
  Religion.deleteMany()
    .then((data) => {
      res.redirect("/admin/religion");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getReligions, updateReligion, deleteReligion, deleteAllReligions };
