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
          <div id="contact-options-wrapper">
            <div id="contact-options-container">
              <div id="contact-tel-number">
                <h3>Tel</h3>
                <p>+45 12 34 56 78</p>
              </div>
              <div id="contact-email">
                <h3>E-mail</h3>
                <p>Support@hwaiting.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
