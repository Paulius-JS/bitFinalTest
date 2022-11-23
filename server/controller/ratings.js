import express from "express";
import db from "../database/connect.js";
import { ratingsValidator } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// make a rating for a book
router.post("/rate/:id", auth, ratingsValidator, async (req, res) => {
  try {
    const rating = await db.Ratings.findOne({
      where: {
        bookId: req.params.id,
        userId: req.user.id,
      },
    });

    if (rating) {
      return res.status(400).send("Jūs jau įvertinote šią knygą");
    }

    const newRating = await db.Ratings.create({
      bookId: req.params.id,
      userId: req.user.id,
      rating: req.body.rating,
    });

    res.json(newRating);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});
// show ratings for a book
router.get("/rating/:id", async (req, res) => {
  try {
    const ratings = await db.Ratings.findAll({
      where: {
        bookId: req.params.id,
      },
      include: [
        {
          model: db.Users,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.json(ratings);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

export default router;
