import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="page-footer grey lighten-4">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="indigo-text text-danken-5">Salam Market Uz</h5>
            <p className="indigo-text text-danken-5">
              Eng sifatli, eng ishochli, eng hamyonbop mahsulotlar faqat bizda
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="indigo-text text-danken-5">Links</h5>
            <ul className="footer-text-color">
              <li>
                <a
                  className="indigo-text text-danken-5"
                  href="https://t.me/salammarket_uz"
                >
                  <i className="fab fa-telegram"></i> Telegram
                </a>
              </li>
              <li>
                <a className="indigo-text text-danken-5" href="#!">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a className="indigo-text text-danken-5" href="#!">
                  <i className="fab fa-facebook"></i> Facebook
                </a>
              </li>
              <li>
                <a className="indigo-text text-danken-5" href="#!">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <span className="indigo-text text-danken-5">
            © 2022 Copyright Text
          </span>
          {/* <a className="indigo-text text-danken-5 right" href="#!">
            More Links
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
