import { DataTypes } from "sequelize";

const Books = (sequelize) => {
  const Schema = {
    book_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    book_author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_reserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  };

  return sequelize.define("books", Schema);
};

export default Books;
