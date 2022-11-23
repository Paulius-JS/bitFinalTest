import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from "../context/MainContext";

const Pagrindinis = () => {
  const { setAlert, setUserInfo, userInfo } = useContext(MainContext);

  const [books, setBooks] = useState([]);
  const [reserved, setReserved] = useState([]);

  useEffect(() => {
    axios
      .get("/api/books/")
      .then((resp) => setBooks(resp.data))

      .catch((error) => console.log(error));
  }, []);

  const handleReservation = (id) => {
    axios
      .post("/api/books/reserve/" + id)
      .then((resp) => {
        setReserved(resp.data);
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
      });
  };

  // make search if search is not empty display all books

  return (
    <>
      <div className="d-flex justify-content-between page-heading">
        <h1>Knygų sąrašas</h1>
      </div>

      {books ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {books.map((book) => (
            <div key={book.id} className="col">
              <div className="card h-100">
                <img
                  src={
                    book.cover ? book.cover : "https://via.placeholder.com/150"
                  }
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{book.book_name}</h5>
                  <p className="card-text">Autorius: {book.book_author}</p>
                  {/* book ganre */}
                  <p className="card-text">Žanras: {book.book_genre}</p>
                  <p className="card-text">
                    Aprašymas: {book.book_description}
                  </p>
                  <p>
                    {book.book_reserved === false ? (
                      <span className="badge bg-success"> Laisva</span>
                    ) : (
                      <span className="badge bg-danger"> Rezervuota</span>
                    )}
                  </p>
                  {/* if user role == 0 make rezervation button */}
                  {book.book_reserved === false && userInfo.role === 0 ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleReservation(book.id)}
                    >
                      Rezervuoti
                    </button>
                  ) : (
                    <button className="btn btn-primary" disabled>
                      Rezervuoti
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nėra knygų</p>
      )}
    </>
  );
};

export default Pagrindinis;
