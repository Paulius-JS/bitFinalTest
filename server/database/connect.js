import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import { Users, Books, Ratings } from "../model/index.js";

const database = {};
const credentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "Biblioteka",
};

try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  });

  await connection.query(
    "CREATE DATABASE IF NOT EXISTS " + credentials.database
  );

  const sequelize = new Sequelize(
    credentials.database,
    credentials.user,
    credentials.password,
    { dialect: "mysql" }
  );

  database.Users = Users(sequelize);
  database.Books = Books(sequelize);
  database.Ratings = Ratings(sequelize);

  database.Books.hasMany(database.Ratings);
  database.Ratings.belongsTo(database.Books);

  database.Users.hasOne(database.Ratings);
  database.Ratings.belongsTo(database.Users);

  database.Users.hasMany(database.Books);
  database.Books.belongsTo(database.Users);

  await sequelize.sync({ alter: true });
} catch (error) {
  console.log(error);
  console.log("Nepavyko prisijungti prie duomenų bazės");
}

export default database;
