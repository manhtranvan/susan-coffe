import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkAdmin, checkLogin } from "../services/AuthService";
import { useShoppingContext } from "../contexts/ShoppingContext";

export const Header = () => {
  const [isLogin, setIsLogin] = useState("");
  const [isADM, setIsADM] = useState("");
  const { cartQty } = useShoppingContext()

  // Hook useEffect được sử dụng để gọi API lấy danh sách danh mục khi component được render
  useEffect(() => {
    const checkIsLogin = checkLogin();
    const checkIsAdmin = checkAdmin();
    setIsLogin(checkIsLogin);
    setIsADM(checkIsAdmin);
  }, []);

  const onLogout = () => {
    localStorage.clear();
    //navigate(`/`);
    window.location.href = "/";
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <Link to={`/`} className="navbar-brand">
            Sussan<small>Coffee</small>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={`/`} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/services`} className="nav-link">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/about`} className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="room.html"
                  id="dropdown04"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Hi {isLogin && <span>{isLogin.fullname}</span>}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown04">
                  {!isLogin && (
                    <>
                      <Link to={`/login`} className="dropdown-item">
                        Login
                      </Link>
                      <Link to={`/login`} className="dropdown-item">
                        Register
                      </Link>
                    </>
                  )}
                  {isADM && (
                    <>
                      <Link to={`/admin-products`} className="dropdown-item">
                        Product magagment
                      </Link>
                      <Link to={`/admin-categories`} className="dropdown-item">
                        Category magagment
                      </Link>
                    </>
                  )}
                  {isLogin && (
                    <>
                      <Link to={`/`} className="dropdown-item">
                        My Account
                      </Link>

                      <Link
                        to={`/admin/categories`}
                        className="dropdown-item"
                        onClick={onLogout}
                      >
                        Logout
                      </Link>
                      <li>
                        <a onClick={onLogout}>Đăng Xuất</a>
                      </li>
                    </>
                  )}
                </div>
              </li>
              <li className="nav-item">
                <Link to={`/contact`} className="nav-link">
                  Contact
                </Link>
              </li>
              <li className="nav-item cart">
                <Link to={`/cart`} className="nav-link">
                  <span className="icon icon-shopping_cart" />
                  <span className="bag d-flex justify-content-center align-items-center">
                    <small>{cartQty}</small>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* END nav */}
      <section className="home-slider owl-carousel owl-loaded owl-drag">
        <div
          className="slider-item"
          style={{ backgroundImage: "url(images/bg_3.jpg)" }}
          data-stellar-background-ratio="0.5"
        >
          <div className="overlay" />
          <div className="container">
            <div className="row slider-text justify-content-center align-items-center">
              <div className="col-md-7 col-sm-12 text-center ftco-animate fadeInUp ftco-animated">
                <h1 className="mb-3 mt-5 bread">Order Online</h1>
                <p className="breadcrumbs">
                  <span className="mr-2">
                    <a href="index.html">Home</a>
                  </span>{" "}
                  <span>Shop</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
