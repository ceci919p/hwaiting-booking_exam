import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function BIGoGreen({ green }) {
  const { setBasket } = useContext(BasketContext);

  function remove() {
    setBasket((oldState) => ({
      ...oldState,
      gogreenBA: { ...green, added: false },
    }));
  }
  return (
    <li className="basket-list">
      {/*   <button className="basket-minus" onClick={remove}> */}
      {/*  <p>-</p> */}

      <div className="amount-type-wrapper">
        <button className="trashcan" onClick={remove}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        </button>
        {/*     <p className="basket-font">{green.amount}</p> */}
        <p className="basket-bold-font">{green.type}</p>
      </div>
      <p className="basket-font">{green.price} ,-</p>
    </li>
  );
}
