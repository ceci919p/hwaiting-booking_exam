import lightStickImg from "../images/lightstick.svg";
import Footer from "../components/Footer";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

export default function CampingInfo() {
  //useNavigate to be able to make a nextbutton sending you to your last visited URL
  const navigate = useNavigate();

  return (
    <>
      <header id="camping-info-header">
        <h1 className="camping-info-headline">Camping</h1>
        <img
          id="camping-info-img"
          src={lightStickImg}
          alt="illustration of a lightstick"
        ></img>
      </header>
      <main id="camping-info-main">
        <button id="camping-info-back" onClick={() => navigate(-1)}>
          <ArrowLeftOutlined id="arrowleft" /> <p>Go back</p>
        </button>

        <section id="camping-info-section">
          <h2>Camping Area Descriptions</h2>
        </section>
        <section id="camping-info-list">
          <div id="nilfheim-spot" className="camping-info-spot">
            <h3>Nilfheim</h3>
            <p>
              Don't want to be bothered 24/7 but also want to enjoy the wild
              festival life then Nilfheim is for you! Far enough away from any
              stages not to be bothered but also still within walking distance
              you can easily enjoy the festival.{" "}
            </p>
          </div>
          <div id="hellheim-spot" className="camping-info-spot">
            <h3>Hellheim</h3>
            <p>
              Always want to be close to the party? Then Helheim is for you.
              Never quiet Helheim is the camp closest to the stages and most
              central in the festival area. In this camping area you can play
              music and party all night! However during Playtime loud steroes
              are not allowed.
            </p>
          </div>
          <div id="alfheim-spot" className="camping-info-spot">
            <h3>Alfheim</h3>
            <p>
              Want to attend the festival but still want a quiet camping place
              you can return to after the party? Then Alfheim is for you!
              Alfheim is placed furthest away from the stages to keep the noise
              at bay. Furthermore no music is allowed between 22:00-10:00 in
              order to allow people to rest.
            </p>
          </div>
          <div id="svartheim-spot" className="camping-info-spot">
            <h3>Svartheim</h3>
            <p>
              Do you wan't to be left alone and mind your own business?
              Svartheim is for you! With extra Space between camps and on the
              outskirts of the festival you are sure to be left alone during
              your time. Beware that there are no noise restrictions, Svartheim
              is the wild West so parties are inevitable!
            </p>
          </div>
          <div id="muspelheim-spot" className="camping-info-spot">
            <h3>Muspelheim</h3>
            <p>
              Are you are a party animal? Get wild and hot in Muspelheim! Not
              close but not far from the stages Muspelheim is known for it's
              wild parties and big stereos. It is known for it's big anonymous
              parties fueled by home-made giga stereos and speakers.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
