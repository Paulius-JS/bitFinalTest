import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MainContext from "../../../context/MainContext";

const EditBook = () => {
  const { setAlert } = useContext(MainContext);
  const { id } = useParams();
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
      .put("/api/books/edit/" + id, form)
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

  useEffect(() => {
    axios
      .get("/api/books/single/" + id)
      .then((resp) => setForm(resp.data))
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [id, setAlert]);

  return (
    <>
      <div className="container mw-50">
        <div className="page-heading">
          <h1>Knygos redagavimas</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group mb-2">
            <label className="mb-1">Pavadinimas:</label>
            <input
              type="text"
              name="book_name"
              className="form-control"
              onChange={handleForm}
              value={form.book_name}
            />
          </div>
          <div className="form-group mb-2">
            <label className="mb-1">knygos žanras:</label>
            <input
              type="text"
              name="book_genre"
              className="form-control"
              onChange={handleForm}
              value={form.book_genre}
            />
          </div>
          <div className="form-group mb-2">
            <label className="mb-1">Knygos autorius:</label>
            <input
              type="text"
              name="book_author"
              className="form-control"
              onChange={handleForm}
              value={form.book_author}
            />
          </div>
          <div className="form-group mb-2">
            <label className="mb-1">Knygos aprašymas:</label>
            <input
              type="text"
              name="book_description"
              className="form-control"
              onChange={handleForm}
              value={form.book_description}
            />
          </div>
          <button className="btn btn-primary">Išsaugoti</button>
        </form>
      </div>
    </>
  );
};

export default EditBook;
