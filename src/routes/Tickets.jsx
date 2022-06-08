import { Link } from "react-router-dom";

import Ticket from "../components/Ticket";

export default function Step1(props) {
  //console.log(props.dataCamping);
  function freezeTickets() {
    props.setFreezeTickets(true);
  }

  return (
    <section id="tickets" className="steps">
      <div className="heading-wrapper">
        <h2 className="h1margin">
          Step 1 / <span className="fullsteps">5</span>
        </h2>
        <p>Please pick a ticket</p>
      </div>

      <article className="ticket-container">
        <div className="ticket-wrapper">
          {props.ticketData.map((t) => (
            <Ticket
              ticketNo={props.ticketNo}
              dataCamping={props.dataCamping}
              key={t.id}
              ticket={t}
              ticketsinBasketNo={props.ticketsinBasketNo}
            />
          ))}
        </div>
      </article>
      <div>
        <Link
          className="next-step"
          style={
            props.ticketsinBasketNo > 0
              ? { display: "block" }
              : { display: "none" }
          }
          onClick={freezeTickets}
          to="/booking/campingspots"
        >
          Next
        </Link>
      </div>
    </section>
  );
}
