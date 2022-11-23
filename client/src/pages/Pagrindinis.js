import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from "../context/MainContext";

const Pagrindinis = () => {
  const { setAlert, setUserInfo, userInfo } = useContext(MainContext);

  const [books, setBooks] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
        // Event.preventDefault();
        setReserved(resp.data);
        console.log(resp.data);

        setRefresh(!refresh);

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

  const handleCancel = (id) => {
    axios
      .post("/api/books/cancel/" + id)
      .then((resp) => {
        // Event.preventDefault();
        setReserved(resp.data);
        // console.log(resp.data);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);

        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  };

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
                    book.book_image
                      ? book.book_image
                      : "https://via.placeholder.com/150"
                  }
                  className="card-img-top"
                  alt="..."
                />

                <div className="card-body">
                  <h5 className="card-title">{book.book_name}</h5>
                  <p className="card-text">Autorius: {book.book_author}</p>

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

                  {book.book_reserved === false && userInfo.role === 0 ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleReservation(book.id)}
                    >
                      Rezervuoti
                    </button>
                  ) : (
                    // if not logged in not show

                    <p></p>
                  )}
                  {book.book_reserved === true && userInfo.role === 0 ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleCancel(book.id)}
                    >
                      Atšaukti
                    </button>
                  ) : (
                    <p></p>
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
