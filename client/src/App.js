import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Pagrindinis from "./pages/Pagrindinis";

//Admino komponentai
import AdminBooks from "./pages/admin/Books/Books";
import NewBook from "./pages/admin/Books/New";
import EditBook from "./pages/admin/Books/Edit";

//Vartotojo komponentai

//Autentifikacijos komponentai
import Login from "./pages/Login";
import Register from "./pages/Register";

//Kontekstas
import MainContext from "./context/MainContext";

//Baziniai komponentai
import Header from "./components/Header/Header";
import Alert from "./components/Alert/Alert";
import "./App.css";

const App = () => {
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });
  const [userInfo, setUserInfo] = useState({});

  const contextValues = { alert, setAlert, userInfo, setUserInfo };

  useEffect(() => {
    axios.get("/api/users/check-auth/").then((resp) => {
      setUserInfo(resp.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {/* Vieši keliai */}

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="pagrindinis" element={<Pagrindinis />} />

            {/* Admino keliai */}
            {userInfo.role === 1 && (
              <>
                <Route path="admin" element={<AdminBooks />} />
                <Route path="admin/books/new" element={<NewBook />} />
                <Route path="admin/books/edit/:id" element={<EditBook />} />
              </>
            )}

            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
