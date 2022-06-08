import { Link } from "react-router-dom";
import backgroundimage from "../images/background-filter.webp";
import vinylImg from "../images/vinyl.svg";

export default function Home(props) {
  return (
    <main id="home">
      <section
        id="background"
        style={{ backgroundImage: `url(${backgroundimage})` }}
      >
        <div className="heading-wrapper">
          <h1 id="glow-h1">HWAITING</h1>
          <p>Scandinavias biggest K-pop festival!</p>
        </div>
        <Link to="/booking">
          <button id="home-buylink">
            <p className="link-p">Buy Tickets</p>
          </button>
        </Link>
      </section>
      <section id="home-divider">
        <p>화이팅</p> <p>HWAITING</p> <p>화이팅</p> <p>HWAITING</p>{" "}
        <p>화이팅</p>
      </section>
      <section id="home-program-section">
        <div>
          <h2 className="pm_font">Curious about the lineup?</h2>
          <p id="home-program-text">
            Click on the vinyl record and check it out!
          </p>
        </div>

        <a
          id="home-program-link"
          href="https://hwaiting.pandapoob.com/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <img id="home-program-img" src={vinylImg} alt="Vinyl"></img>
        </a>
      </section>
    </main>
  );
}
