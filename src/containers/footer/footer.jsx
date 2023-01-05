import React from "react";
import "./footer.css";
import logo from "../../assets/logo.png";
function footer() {
  return (
    <div className="cr__footer section-margin">
      <div className="cr__footer-content">
        <div className="cr__footer-content-list1">
          <ul>
            <li>
              <img src={logo} alt="logo" />
            </li>
            <li>
             
              Arraging car hire in 1 country & 2 languages.<br /> Car rental is the
              biggest online car service in Poland. <br />Working with leading
              suppliers, we offer<br /> great prices on all car groups
            </li>
            <li>
              <ul className="socials">
                <li>
                  <i className="fa-brands fa-facebook fa-xl"></i>
                </li>
                <li>
                  <i className="fa-brands fa-instagram fa-xl"></i>
                </li>
                <li>
                  <i className="fa-brands fa-youtube fa-xl"></i>
                </li>
              </ul>{" "}
            </li>
          </ul>
        </div>
        <div className="cr__footer-content-list2">
          <h2>Our Services</h2>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#work">How it works</a>
            </li>
            <li>
              <a href="#popular">Rental Deals</a>
            </li>
            <li>
              <a href="#whyUs">Why Choose Us</a>
            </li>
          </ul>
        </div>
        <div className="cr__footer-content-list3">
          <h2>Locations</h2>
          <ul>
            <li>Warszawa</li>
            <li>Krakow</li>
            <li>Poznan</li>
            <li>Wroclaw</li>
            <li>Czestochowa</li>
          </ul>
        </div>
        <div className="cr__footer-content-list4">
          <h2>Vehicle Model</h2>
          <ul>
            <li>Opel</li>
            <li>Ferrari</li>
            <li>Toyota</li>
            <li>Mercedes</li>
            <li>Golf</li>
          </ul>
        </div>
        <div className="cr__footer-content-list5">
          <h2>Contact</h2>
          <ul>
            <li>
              <i className="fa-solid fa-phone"></i>+48 292 123 004
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>carRental@carRental.com
            </li>
            <li>
              <i className="fa-solid fa-location-dot"></i>Czestochowa, Jasna Gora
            </li>
          </ul>
        </div>
      </div>
      <div className="cr_footer-copyrights">
        Copyright © Mateusz Karaś & Michał Bebłociński, All rights reserved
      </div>
    </div>
  );
}

export default footer;
