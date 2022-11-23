import { DataTypes } from "sequelize";

const Ratings = (sequelize) => {
  const Schema = {
    book_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };

  return sequelize.define("ratings", Schema);
};

export default Ratings;
