import { Link } from "react-router-dom";
import { BasketContext } from "../contexts/basket";
import { useContext } from "react";
import Spot from "../components/Spot";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function Step2(props) {
  const { basket } = useContext(BasketContext);

  //take area from basket context > campingSpot array (BA) and make area a string so we can use the string in the PUT method
  //we use toString() to make it a string
  let areaInBasket = basket.campingSpot.map(({ area, ...rest }) => {
    return area.toString();
  });

  //right now it is still an array but it is a string inside the array.
  //to make it a string without the array we use shift() to remove first element from an array and return that removed object
  //areaAsString is now the selected area as a string.

  let areaAsString = areaInBasket.shift();

  //------our PUT request to reserve campingspot
  //here we use areaAsString to define the selected area
  //we use props.ticketsinBasketNo to get the number of tickets that should be reserved

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
      .then((data) => props.setReservationData(data)) //update state of reservationData with the data
      .catch((err) => console.error(err));
  }

  //the campprice is the same no matter which campingspot is selected.
  //we can get it by mapping through the array and take price
  let campPrice = props.dataCamping.map(({ price, ...rest }) => {
    return price;
  });

  //if there is no tickets in the basket of or if there isn't any campingspots in the basket, do NOT show the next-button
  //if there is, then show the next-button
  function nextButton() {
    if (props.ticketsinBasketNo === 0 || basket.campingSpot.length === 0) {
      return "none";
    } else {
      return "block";
    }
  }

  //campPrice is an array of prices (a price for each campingspot, which we defined in booking.jsx line 90)
  //because the price has to be 99 no matter which campingspot is chosen, we say "take the element from index 0 in the array"
  //this way, we only get the fixed booking fee (99) once
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
