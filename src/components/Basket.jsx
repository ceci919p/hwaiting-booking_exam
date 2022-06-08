import { useContext } from "react";
import { BasketContext } from "../contexts/basket";
import BICampingSpots from "./BICampingSpots";
import BITicket from "./BITicket";
import Timer from "./Timer";
import BITents from "./BITents";
import BIGoGreen from "./BIGoGreen";

export default function Basket({
  dataCamping,
  ticketData,
  ticketNo,
  setTicketNo,
  ticketsinBasketNo,
  gogreen,
  fullAmountOfPers,
  reservationData,
  freezeTickets,
  fullPrice,
  freezeTents,
}) {
  const { basket } = useContext(BasketContext);

  return (
    <article className="basket">
      <div>
        {reservationData !== undefined ? (
          <Timer reservationData={reservationData}></Timer>
        ) : null}

        <ul>
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
          {basket.campingSpot.map((spot) => {
            return <BICampingSpots key={spot.area} {...spot}></BICampingSpots>;
          })}
          {basket.tentsBA.map((add) => {
            return (
              <BITents
                key={add.id}
                {...add}
                freezeTents={freezeTents}
              ></BITents>
            );
          })}
          {basket.gogreenBA.added ? (
            <BIGoGreen green={gogreen} key={gogreen.type}></BIGoGreen>
          ) : (
            <></>
          )}
          {/*    <BIGoGreen green={gogreen} key={gogreen.type}></BIGoGreen> */}
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
