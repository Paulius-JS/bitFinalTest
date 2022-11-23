import { DataTypes } from "sequelize";

const Ratings = (sequelize) => {
  const Schema = {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    book_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };

  return sequelize.define("ratings", Schema);
};

export default Ratings;
