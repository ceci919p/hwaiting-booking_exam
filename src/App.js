import { Link, Route, Routes } from "react-router-dom";

import { useRef, useState, useEffect } from "react";
import { BasketProvider } from "./contexts/basket";
import { gsap } from "gsap";

import Home from "./routes/Home";
import CampingInfo from "./routes/CampingInfo";
import ContactInfo from "./routes/Contact";
import Booking from "./routes/Booking";
import Confirmation from "./routes/Confirmation";

import logo from "./images/logo_light.svg";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  function ToggleBurgermenu() {
    setMenuOpen((old) => !old);
  }

  const menuRef = useRef();

  useEffect(() => {
    gsap.from(menuRef.current, { x: 1200 });
    gsap.to(menuRef.current, { duration: 0.8, x: 0 });
  });

  return (
    <div className="App">
      <section id="navigation">
        <nav>
          <div id="logo_wrapper">
            <Link to="/">
              {" "}
              <img src={logo} className="logo" alt="" />
            </Link>

            <p>8/8-14/8</p>
          </div>
          <div id="menu" ref={menuRef} className={menuOpen ? null : "inactive"}>
            <ul>
              <li>
                <Link
                  id="header_link"
                  className="nav-link"
                  to="/"
                  onClick={ToggleBurgermenu}
                >
                  {" "}
                  <p className="link-p">HOME</p>{" "}
                </Link>
              </li>
              <li>
                <Link
                  id="header_link"
                  className="nav-link"
                  to="/camping-info"
                  onClick={ToggleBurgermenu}
                >
                  {" "}
                  <p className="link-p">CAMPING INFO</p>{" "}
                </Link>
              </li>

              <li>
                <Link
                  id="header_link"
                  className="nav-link"
                  to="/contact"
                  onClick={ToggleBurgermenu}
                >
                  {" "}
                  <p className="link-p">CONTACT US</p>{" "}
                </Link>
              </li>

              <li>
                <Link
                  id="header_link"
                  className="nav-link"
                  to="/booking"
                  onClick={ToggleBurgermenu}
                >
                  {" "}
                  <p className="link-p">BUY TICKETS</p>{" "}
                </Link>
              </li>
            </ul>
          </div>
          <div id="burgermenu" onClick={ToggleBurgermenu}>
            <span id="bar1" className={menuOpen ? "active1" : null}></span>
            <span id="bar2" className={menuOpen ? "active2" : null}></span>
            <span id="bar3" className={menuOpen ? "active3" : null}></span>
          </div>
        </nav>
      </section>
      <BasketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="camping-info" element={<CampingInfo />} />
          <Route path="contact" element={<ContactInfo />} />

          <Route path="booking/*" element={<Booking />} />

          <Route path="confirmation" element={<Confirmation />} />
        </Routes>
      </BasketProvider>
    </div>
  );
}

export default App;
