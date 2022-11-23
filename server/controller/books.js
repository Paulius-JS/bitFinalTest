import express from "express";
import db from "../database/connect.js";
import { bookValidator } from "../middleware/validate.js";
import { adminAuth } from "../middleware/auth.js";

const Router = express.Router();

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
