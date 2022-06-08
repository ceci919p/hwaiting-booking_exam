import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function BITicket({
  id,
  amount,
  type,
  price,
  ticketNo,
  ticketsinBasketNo,
  freezeTickets,
}) {
  const { setBasket } = useContext(BasketContext);
  //const [bTicketError, setBTicketError] = useState(false);

  //lyt til at vi er på campingspot

  function remove(id) {
    setBasket((old) => {
      const mapped = old.tickets.map((ticket) => {
        if (ticket.id === id) {
          const copy = { ...ticket };
          copy.amount = copy.amount - 1;
          return copy;
        }
        return ticket;
      });

      return { ...old, tickets: mapped.filter((ticket) => ticket.amount > 0) };
    });
  }

  function buymore(id) {
    //tjekker om der er flere tickets tilbage
    if (ticketsinBasketNo > ticketNo) {
      alert("0 tickets left");
    } else {
      setBasket((old) => {
        const mapped = old.tickets.map((ticket) => {
          if (ticket.id === id) {
            const copy = { ...ticket };
            copy.amount = copy.amount + 1;
            return copy;
          }
          return ticket;
        });
        return {
          ...old,
          tickets: mapped.filter((ticket) => ticket.amount > 0),
        };
      });
    }
  }

  return (
    <>
      <li className="basket-list" key={id}>
        <div className="amount-type-wrapper">
          <div className="amount-wrapper">
            <div
              style={freezeTickets ? { display: "none" } : { display: "block" }}
            >
              <button className="basket-minus" onClick={() => remove(id)}>
                <p>-</p>
              </button>
            </div>
            <p>{amount}</p>
            <div
              style={freezeTickets ? { display: "none" } : { display: "block" }}
            >
              <button className="basket-plus" onClick={() => buymore(id)}>
                {" "}
                <p>+</p>
              </button>
            </div>
          </div>

          <div className="type-wrapper">
            <p className="basket-font"> {type} </p>
          </div>
        </div>
        <div className="price-wrapper">
          <p className="basket-font"> {price} ,-</p>
        </div>
      </li>
    </>
  );
}
