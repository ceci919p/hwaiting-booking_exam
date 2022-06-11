import { useContext } from "react";
import { BasketContext } from "../contexts/basket";
import { useNavigate } from "react-router-dom";

import BICampingSpots from "../components/BICampingSpots";
//import BITicket from "../components/BITicket";
//import BITents from "../components/BITents";

import TicketReceipt from "../components/TicketReceipt";
import TentsReceipt from "../components/TentsReceipt";
import GoGreenReciept from "../components/GoGreenReciept";

export default function Confirmation({ ticketData, fullPrice }) {
  const navigateFinished = useNavigate();

  //confirmation confirms the order of the tickets + campingspots (like a receipt)
  //therefor we need everything the user has choosen (basketContext)
  const { basket, setBasket } = useContext(BasketContext);

  function getFullPrice() {
    //getting ticket price
    //reduce to return the sum of all the elements in an array (tickets)
    const initialvalue = 0;
    const ticketSum = basket.tickets.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.amount * currentValue.price,
      initialvalue
    );

    //getting booking price
    //reduce to return the sum of all the elements in an array (campingspot)
    const bookingSum = basket.campingSpot.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price,
      initialvalue
    );

    //getting green price
    let gogreenSum;
    if (basket.gogreenBA.added === true) {
      gogreenSum = basket.gogreenBA["price"];
    } else {
      gogreenSum = 0;
    }

    //getting tent price
    //reduce to return the sum of all the elements in an array (tentsBA)
    const tentSum = basket.tentsBA.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.amount * currentValue.price,
      initialvalue
    );

    //get full basket price
    //add all the values and get the full basket price
    return ticketSum + bookingSum + gogreenSum + tentSum;
  }

  function transactionComplete() {
    // empty / reset basket --> empty all arrays + object
    setBasket((oldState) => ({
      oldState,
      tickets: [],
      campingSpot: [],
      tentsBA: [],
      gogreenBA: {},
    }));

    //do not navigate to another route
    navigateFinished("/");
  }

  return (
    <section id="confirmation">
      <div id="confirmation-wrapper">
        <div className="heading-wrapper">
          <h1>Thank you!</h1>
          <p>
            Your order is complete and the receipt will be sent to your email
            shortly
          </p>
        </div>
        <div id="background-color">
          <h3>Your order: </h3>
          <ul>
            {basket.tickets.map((ticket) => {
              return (
                <TicketReceipt
                  key={ticket.id}
                  ticketData={ticketData}
                  {...ticket}
                ></TicketReceipt>
              );
            })}
            {basket.campingSpot.map((spot) => {
              return (
                <BICampingSpots key={spot.area} {...spot}></BICampingSpots>
              );
            })}
            {basket.tentsBA.map((add) => {
              return <TentsReceipt key={add.id} {...add}></TentsReceipt>;
            })}
            {basket.gogreenBA.added ? <GoGreenReciept></GoGreenReciept> : null}
          </ul>
          <hr />
          <div className="totalprice">
            <p>Total:</p>
            <p className="basket-price">{getFullPrice()} DKK</p>
          </div>
        </div>
        <div className="finished-step" onClick={transactionComplete}>
          <p>Back to home</p>
        </div>
      </div>
    </section>
  );
}
