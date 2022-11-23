import express from "express";
import db from "../database/connect.js";
import { bookValidator } from "../middleware/validate.js";
import { adminAuth } from "../middleware/auth.js";
import { Op } from "sequelize";

const Router = express.Router();

Router.get("/search/:keyword", async (req, res) => {
  try {
    const book = await db.Books.findAll({
      where: {
        book_name: {
          [Op.like]: "%" + req.params.keyword + "%",
        },
      },

      attributes: ["id", "book_name", "book_image"],
    });
    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

// Router.post("/reserve/:id", async (req, res) => {
//   try {
//     const user = await db.Users.findOne({
//         where: {
//             id: req.user.id,
//         },
//     });

//     const book = await db.Books.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (book.book_reserved === 1) {
//       return res.status(400).send("Knyga jau rezervuota");
//     }

//     book.book_reserved = 1;
//     await book.save();

//     res.json(book);
//   } catch (error) {
//     console.log(error);
//     res.status(418).send("server error");
//   }
// });

// cancel book reservation
Router.post("/cancel/:id", async (req, res) => {
  try {
    const book = await db.Books.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (book.book_reserved === 0) {
      return res.status(400).send("Knyga nebuvo rezervuota");
    }

    book.book_reserved = 0;
    await book.save();

    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

Router.get("/", async (req, res) => {
  const options = {};

  if (req.query.sort === "1") {
    options.order = [["name", "ASC"]];
  }

  if (req.query.sort === "2") {
    options.order = [["name", "DESC"]];
  }

  try {
    const Books = await db.Books.findAll(options);
    res.json(Books);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida");
  }
});

Router.get("/single/:id", adminAuth, async (req, res) => {
  try {
    const Books = await db.Books.findByPk(req.params.id);
    res.json(Books);
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida išssaugant duomenis");
  }
});

Router.post("/new", adminAuth, bookValidator, async (req, res) => {
  try {
    await db.Books.create(req.body);

    res.send("Knyga sėkmingai sukurtas");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida išssaugant duomenis");
  }
});

Router.put("/edit/:id", adminAuth, bookValidator, async (req, res) => {
  try {
    const Books = await db.Books.findByPk(req.params.id);
    await Books.update(req.body);
    res.send("Knyga sėkmingai atnaujinta");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida išssaugant duomenis");
  }
});

Router.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const Books = await db.Books.findByPk(req.params.id);
    await Books.destroy();
    res.send("Knyga sėkmingai ištrinta");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko klaida");
  }
});

export default Router;
