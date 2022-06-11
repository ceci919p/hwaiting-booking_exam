import { useContext } from "react";
import { BasketContext } from "../contexts/basket";
import BICampingSpots from "./BICampingSpots";
import BITicket from "./BITicket";
import Timer from "./Timer";
import BITents from "./BITents";
import BIGoGreen from "./BIGoGreen";

export default function Basket({
  ticketData,
  ticketNo,
  ticketsinBasketNo,
  gogreen,
  reservationData,
  freezeTickets,
  fullPrice,
  freezeTents,
}) {
  const { basket } = useContext(BasketContext);

  return (
    <article className="basket">
      <div>
        {/*if reservation is not undefined then use Timer component and pass reservation data to component
        else just return it as null*/}

        {reservationData !== undefined ? (
          <Timer reservationData={reservationData}></Timer>
        ) : null}

        <ul>
          {/*    for each ticket in the basket array (added to basket) make BITicket component (BI = basket item)*/}
          {basket.tickets.map((ticket) => {
            return (
              <BITicket
                ticketsinBasketNo={ticketsinBasketNo}
                ticketNo={ticketNo}
                key={ticket.id}
                ticketData={ticketData}
                {...ticket}
                freezeTickets={freezeTickets}
              ></BITicket>
            );
          })}
          {/*    use the component BICampingSpots to show campingspot in the basket  */}
          {basket.campingSpot.map((spot) => {
            return <BICampingSpots key={spot.area} {...spot}></BICampingSpots>;
          })}
          {/*    for each add (tent) make a BITents component  */}
          {basket.tentsBA.map((add) => {
            return (
              <BITents
                key={add.id}
                {...add}
                freezeTents={freezeTents}
              ></BITents>
            );
          })}

          {/*    if gogreen is added to the basket, then use component BIGoGreen else return empty tag  */}
          {basket.gogreenBA.added ? (
            <BIGoGreen green={gogreen} key={gogreen.type}></BIGoGreen>
          ) : (
            <></>
          )}
        </ul>
        <hr />
        <div className="totalprice">
          <p>Total:</p>
          <p className="basket-price"> {fullPrice} DKK</p>
        </div>
      </div>
    </article>
  );
}
