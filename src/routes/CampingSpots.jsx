import { Link } from "react-router-dom";
import { BasketContext } from "../contexts/basket";
import { useContext } from "react";
import Spot from "../components/Spot";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function Step2(props) {
  const { basket } = useContext(BasketContext);

  let areaInBasket = basket.campingSpot.map(({ area, ...rest }) => {
    return area.toString();
  });

  let areaAsString = areaInBasket.shift();

  function reserve() {
    fetch("https://hwaiting.herokuapp.com/reserve-spot", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area: areaAsString,
        amount: props.ticketsinBasketNo,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => props.setReservationData(data))
      .catch((err) => console.error(err));
  }

  let campPrice = props.dataCamping.map(({ price, ...rest }) => {
    return price;
  });

  function nextButton() {
    if (props.ticketsinBasketNo === 0 || basket.campingSpot.length === 0) {
      return "none";
    } else {
      return "block";
    }
  }

  return (
    <section id="campingspots" className="steps">
      <div className="heading-wrapper">
        <h2>
          Step 2 <span className="fullsteps">/ 5</span>
        </h2>
        <p>Please pick a camping spot </p>
        <p>Booking fee: {campPrice[0]} DKK</p>
      </div>

      <div>
        <article className="map">
          <div className="campingspots-wrapper">
            <div className="campingspots-container">
              {props.dataCamping.map((s) => (
                <Spot
                  ticketsinBasketNo={props.ticketsinBasketNo}
                  key={s.area}
                  spot={s}
                />
              ))}
            </div>
          </div>
        </article>
        <p id="cs-link-text">
          Not sure? Read more about our campingspots{" "}
          <Link id="cs-link" to="/camping-info">
            here
          </Link>
        </p>
      </div>
      <div id="spot-buttons">
        <div className="back-step">
          <Link to="/booking/" id="back-link">
            {" "}
            <ArrowLeftOutlined id="arrowleft" />
          </Link>
        </div>
        <div>
          <Link
            id="cs-next"
            style={{ display: nextButton() }}
            onClick={reserve}
            to="/booking/additional"
          >
            Next
          </Link>
        </div>
      </div>
    </section>
  );
}
