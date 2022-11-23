import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainContext from "../../context/MainContext";
import axios from "axios";
import logo from "./Logo.svg";
import "./Header.css";

const Header = () => {
  const { userInfo, setUserInfo, setAlert } = useContext(MainContext);

  const [filter, setFilter] = useState([]);

  const [showResults, setShowResults] = useState(false);
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get("/api/users/logout/").then((resp) => {
      setUserInfo({});
      setAlert({
        message: resp.data,
        status: "success",
      });

      navigate("/pagrindinis");
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value === "") return setShowResults(false);
    axios
      .get("/api/books/search/" + e.target.value)
      .then((resp) => {
        setFilter(resp.data);
        setShowResults(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/pagrindinis"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img src={logo} alt="Beauty Parlor" style={{ maxWidth: "40px" }} />
            <div className="d-block ms-3 lh-1">
              <h6 className="mb-0">Kauno</h6>
              <span className="text-uppercase fs-7 fw-semibold">
                Biblioteka
              </span>
            </div>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
            <li>
              <Link to="/pagrindinis" className="nav-link px-2 nav-link-active">
                Visos Knygos
              </Link>
            </li>

            {userInfo.role === 0 && (
              <li>
                <Link to="/orders" className="nav-link px-2">
                  Rezervuotos
                </Link>
              </li>
            )}
            {userInfo.role === 1 && (
              <li>
                <Link to="/admin" className="nav-link px-2">
                  Administratorius
                </Link>
              </li>
            )}
          </ul>

          <div className="searchBar">
            <input
              type="text"
              className="SearchBarInput"
              placeholder="Search for book..."
              onChange={(e) => handleSearch(e)}
              onBlur={(e) => {
                if (e.target.value === "") setShowResults(false);
              }}
            />

            {showResults && (
              <div className="searchDropDown">
                <ul>
                  {filter.map((book) => (
                    <li key={books.id}>
                      <Link to={"/profile/" + book.id}>
                        <div className="searchBarImg">
                          <img src={book.book_image} alt="" />
                        </div>
                        {book.book_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="text-end">
            {userInfo.id ? (
              <button onClick={handleLogout} className="btn btn-success">
                Atsijungti
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-success me-2">
                  Prisijungimas
                </Link>
                <Link to="/register" className="btn btn-success">
                  Registracija
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
