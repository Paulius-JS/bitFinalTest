import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from "../../../context/MainContext";

const NewBook = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/books/new", form)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });

        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);

        setAlert({
          message: error.response.data,
          status: "danger",
        });

        if (error.response.status === 401) navigate("/login");
      });
  };

  return (
    <>
      <div className="container mw-50">
        <div className="page-heading">
          <h1>Naujos knygos pridėjimas</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group mb-2">
            <label className="mb-1">Pavadinimas:</label>
            <input
              type="text"
              name="book_name"
              className="form-control"
              onChange={handleForm}
            />
          </div>
          <div className="form-group mb-2">
            <label className="mb-1">Knygos viršelis:</label>
            <input
              type="text"
              name="book_image"
              className="form-control"
              onChange={handleForm}
            />
          </div>
          <div className="form-group mb-2">
            <label className="mb-1">Žanras:</label>
            <input
              type="text"
              name="book_genre"
              className="form-control"
              onChange={handleForm}
            />
          </div>
          <div className="form-group mb-2">
            <label className="mb-1">Knygos autorius:</label>
            <input
              type="text"
              name="book_author"
              className="form-control"
              onChange={handleForm}
            />
          </div>
          <div className="form-group mb-2">
            <label className="mb-1">Knygos aprašymas:</label>
            <input
              type="text"
              name="book_description"
              className="form-control"
              onChange={handleForm}
            />
          </div>

          <button className="btn btn-success">Pridėti knygą</button>
        </form>
      </div>
    </>
  );
};

export default NewBook;
