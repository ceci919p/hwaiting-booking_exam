import { Link } from "react-router-dom";
import backgroundimage from "../images/background-filter.webp";
import vinylImg from "../images/vinyl.svg";
import hwaitingSign from "../images/hwaiting2.svg";
import Footer from "../components/Footer";

export default function Home(props) {
  return (
    <>
      <main id="home">
        <section
          id="background"
          style={{ backgroundImage: `url(${backgroundimage})` }}
        >
          <div className="heading-wrapper">
            <h1 id="glow-h1">HWAITING</h1>
            <p>Scandinavias biggest K-pop festival!</p>
          </div>

          <div className="header-link-wrapper">
            <a
              id="home-artistlink"
              href="https://hwaiting.pandapoob.com/"
              target="_blank"
              rel="noreferrer"
            >
              <button id="home-artistbutton">
                <p className="link-p">See Program</p>
              </button>
            </a>

            <Link to="/booking">
              <button id="home-buylink">
                <p className="link-p">Buy Tickets</p>
              </button>
            </Link>
          </div>
        </section>
        <section id="home-divider">
          <p>화이팅</p> <p>HWAITING</p> <p>화이팅</p> <p>HWAITING</p>{" "}
          <p>화이팅</p>
        </section>

        <h2 className="pm_font">Meaning of Hwaiting</h2>
        <section id="home-info">
          <div className="home-info-container">
            <div className="left-col">
              <p className="dark-text">
                Hwaiting (파이팅) is a korean word for support or encouragement.{" "}
                <br /> <br />
                This festival was created as a way to celebrate and support the
                creativity, hard work and talent of korean artists and K-pop
                music. <br />
                <br />
                Based in Denmark, Hwaiting brings this colorful and energetic
                culture phenomenon to Northern Europe by hosting the biggest
                K-pop festival in Scandinavia! <br /> <br />
                Join the festival to meet up with other K-pop lovers from all
                around the world to share your love and excitement for your
                favorite artists with others.
              </p>
            </div>

            <div className="home-info-graphics">
              <img
                className="home-info-img"
                src={hwaitingSign}
                alt="hwaiting written with korean signs"
              ></img>
              <p className="dark-text"> Pronounced [pʰaitʰiŋ]</p>
            </div>
          </div>
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
        <Footer />
      </main>
    </>
  );
}
