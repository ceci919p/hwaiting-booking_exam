import { Link } from "react-router-dom";
import GoGreen from "../components/GoGreen";
import TentOption from "../components/TentOption";

export default function Step3(props) {
  //update freezeTents to new state where the boolean is true
  //which means when the next button is clicked, the function freezeTents() is called and tents are now "frozen"

  function freezeTents() {
    props.setFreezeTents(true);
  }
  return (
    <section id="additional" className="steps">
      <div className="heading-wrapper">
        <h2 className="h1margin">
          Step 3 <span className="fullsteps">/ 5</span>
        </h2>
        <p>Additionals?</p>
      </div>

      <div className="options-wrapper">
        <section className="prepared-tents">
          <h3 className="tents-headline">Prepared Tents</h3>
          <div className="tents-container">
            {props.additionals.map((a) => (
              <TentOption
                add={a}
                key={a.id}
                ticketsinBasketNo={props.ticketsinBasketNo}
                fullAmountOfPers={props.fullAmountOfPers}
              />
            ))}
          </div>
        </section>

        <section className="go-green">
          <h3 className="tents-headline">Green Camping</h3>

          <GoGreen green={props.gogreen} key={props.gogreen.id}></GoGreen>
        </section>
      </div>
      <div>
        <Link
          className="next-step"
          id="extrapadding"
          to="/booking/information"
          onClick={freezeTents}
        >
          Next
        </Link>
      </div>
    </section>
  );
}
