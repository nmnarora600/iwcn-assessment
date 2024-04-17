import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(props) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let location = useLocation();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg fixed-top bg-body-tertiary"
        data-bs-theme="dark"
        style={{ marginBottom: 0 }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Assessment
          </Link>
          <button
            className={`navbar-toggler ${isMenuOpen ? "collapse" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                  onClick={() => {
                    handleScrollToTop();
                    closeMenu();
                  }}
                >
                  &nbsp; Task 2   &nbsp;
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/task3" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/task3"
                  onClick={() => {
                    handleScrollToTop();
                    closeMenu();
                  }}
                >
                   &nbsp; Task 3   &nbsp;
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/xyz" ? "active" : ""
                  }`}
                  to="https://namanarora.in"
                  target="_blank"
                  rel="noreferrer"
                >
                  &nbsp;  Dev Profile   &nbsp;
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
