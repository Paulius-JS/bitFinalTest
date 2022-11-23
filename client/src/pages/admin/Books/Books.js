import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import MainContext from "../../../context/MainContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { alert, setAlert } = useContext(MainContext);

  const handleDelete = (id) => {
    axios
      .delete("/api/books/delete/" + id)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });
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
      .get("/api/books/")
      .then((resp) => setBooks(resp.data))
      .catch((error) => console.log(error));
  }, [alert]);

  return (
    <>
      <div className="d-flex justify-content-between page-heading">
        <h1>Knygų sąrašas</h1>
        <Link to="/admin/books/new" className="btn btn-success">
          Nauja Knyga
        </Link>
      </div>
      {books ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Viršelis</th>
              <th>Pavadinimas</th>
              <th>Autorius</th>
              <th>Aprašymas</th>
              <th>Rezervuota</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.book_image}</td>
                <td>{book.book_name}</td>
                <td>{book.book_author}</td>
                <td>{book.book_description}</td>

                {book.book_reserved === true ? (
                  <td>Rezervuota</td>
                ) : (
                  <td>Laisva</td>
                )}

                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={"/admin/books/edit/" + book.id}
                      className="btn btn-primary"
                    >
                      Redaguoti
                    </Link>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDelete(book.id)}
                    >
                      Ištrinti
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Nėra pridėtų knygų</h3>
      )}
    </>
  );
};

export default Books;
