import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function GoGreen({ green }) {
  const { basket, setBasket } = useContext(BasketContext);
  //console.log(green);

  // onclick set "added" to true and display info in basket
  // add remove function that sets "added" to false and automatically removes from basket

  function toggleGreen(props) {
    //console.log("clicked");

    if (
      (green.added === false && basket.gogreenBA.added === undefined) ||
      (green.added === false && basket.gogreenBA.added === false)
    ) {
      setBasket((oldState) => ({
        ...oldState,
        gogreenBA: { ...green, added: true },
      }));
    } else if (basket.gogreenBA.added === true) {
      setBasket((oldState) => ({
        ...oldState,
        gogreenBA: { ...green, added: false },
      }));
    }
  }

  return (
    <div className="go-green-container" onClick={toggleGreen}>
      <button className="add">+</button>

      <h3 className="go-green-header">{green.type}</h3>

      <article>
        <p className="go-green-text">
          To make your festival experience more eco-friendly. This helps us
          clean the area and plant trees when the party's over.{" "}
        </p>

        <p className="green-price">{green.price} DKK</p>
      </article>
    </div>
  );
}
