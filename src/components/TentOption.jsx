import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function TentOption(props) {
  const { basket, setBasket } = useContext(BasketContext);

  function choose() {
    console.log("clicked");

    if (
      props.fullAmountOfPers >= props.ticketsinBasketNo ||
      props.add.pers > props.ticketsinBasketNo
    ) {
      alert("The number of tickets does not match the size of the tents");
    } else {
      if (basket.tentsBA.find((add) => add.id === props.add.id)) {
        setBasket((old) => {
          const mapped = old.tentsBA.map((add) => {
            if (add.id === props.add.id) {
              const copy = { ...add };

              copy.amount++;

              return copy;
            }

            return add;
          });
          return { ...old, tentsBA: mapped };
        });
      } else {
        // setBasket((oldState) => [...oldState, { ...props.ticket, amount: 1 }]);
        setBasket((oldState) => ({
          ...oldState,
          tentsBA: [...oldState.tentsBA, { ...props.add, amount: 1 }],
        }));
      }
    }
  }

  return (
    <article
      className="tent-option"
      onClick={choose}
      style={
        props.add.type === "2 person tent"
          ? {
              border: "5px solid #20E3E3",
              boxShadow: "0px 0px 10px #5AFFFF",
            }
          : {
              border: "5px solid #FB3CFF",
              boxShadow: "0px 0px 10px #FC61FF",
              marginTop: "3rem",
            }
      }
    >
      <div className="product-and-button">
        <button className="add">+</button>

        <p>{props.add.type}</p>
      </div>
      <p className="price">{props.add.price} DKK</p>
    </article>
  );
}
