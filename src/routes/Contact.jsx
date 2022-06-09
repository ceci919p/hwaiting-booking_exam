import kheart from "../images/kheart.svg";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <header id="contact-info-header">
        <h1 id="contact-info-headline">Support</h1>
        <img
          id="contact-info-img"
          src={kheart}
          alt="illustration of a lightstick"
        ></img>
      </header>

      <main id="contact-main">
        <section id="camping-info-section">
          <h2>How Would you Like to Contact us?</h2>
        </section>
        <section id="contact-options">
          <div id="nilfheim-spot" className="camping-info-spot">
            <h3>Nilfheim</h3>
            <p>
              Don't want to be bothered 24/7 but also want to enjoy the wild
              festival life then Nilfheim is for you! Far enough away from any
              stages not to be bothered but also still within walking distance
              you can easily enjoy the festival.{" "}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
