import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function Ticket(props) {
  const { basket, setBasket } = useContext(BasketContext);

  function buy() {
    //tjekker om der er flere tickets tilbage
    if (props.ticketsinBasketNo > props.ticketNo) {
      alert("0 tickets left");
    } else {
      if (basket.tickets.find((ticket) => ticket.id === props.ticket.id)) {
        setBasket((old) => {
          const mapped = old.tickets.map((ticket) => {
            if (ticket.id === props.ticket.id) {
              const copy = { ...ticket };

              copy.amount++;

              return copy;
            }

            return ticket;
          });
          return { ...old, tickets: mapped };
        });
      } else {
        // setBasket((oldState) => [...oldState, { ...props.ticket, amount: 1 }]);
        setBasket((oldState) => ({
          ...oldState,
          tickets: [...oldState.tickets, { ...props.ticket, amount: 1 }],
        }));
      }
    }
  }

  return (
    <div
      onClick={buy}
      className="ticket"
      style={
        props.ticket.id === 1
          ? { border: "5px solid #20E3E3", boxShadow: "0px 0px 10px #5AFFFF" }
          : { border: "5px solid #FB3CFF", boxShadow: "0px 0px 10px #FC61FF" }
      }
    >
      <button className="add">+</button>

      <div className="ticket-text">
        <h3>{props.ticket.type}</h3>

        <p>{props.ticket.price} DKK</p>
      </div>
    </div>
  );
}
