import twitterLogo from "../images/twitter.svg";
import fbLogo from "../images/fb.svg";
import igLogo from "../images/ig.svg";
import ytLogo from "../images/yt.svg";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="contact-column">
        <h4>Phone</h4>
        <p className="footer-contact">+45 12 34 56 78</p>
      </div>

      <div className="contact-column">
        <h4>E-mail</h4>
        <p className="footer-contact">Support@hwaiting.com</p>
      </div>

      <div className="footer-wrapper">
        <h4>Socials</h4>
        <div id="footer-socials">
          <button id="footer-twitter" className="footer-social-wrapper">
            <img className="footer-social" src={twitterLogo} alt="Twitter" />
          </button>

          <button id="footer-ig" className="footer-social-wrapper">
            <img className="footer-social" src={igLogo} alt="Instagram" />
          </button>

          <button id="footer-yt" className="footer-social-wrapper">
            <img className="footer-social" src={ytLogo} alt="Youtube" />
          </button>

          <button id="footer-fb" className="footer-social-wrapper">
            <img className="footer-social" src={fbLogo} alt="Facebook" />
          </button>
        </div>
      </div>
    </footer>
  );
}
