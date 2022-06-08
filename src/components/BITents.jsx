import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function BITents({ type, price, amount, id, freezeTents }) {
  const { setBasket } = useContext(BasketContext);

  function remove(id) {
    setBasket((old) => {
      const mapped = old.tentsBA.map((add) => {
        if (add.id === id) {
          const copy = { ...add };
          copy.amount = copy.amount - 1;
          return copy;
        }
        return add;
      });

      return { ...old, tentsBA: mapped.filter((add) => add.amount > 0) };
    });
  }

  return (
    <li className="basket-list">
      <div className="amount-type-wrapper">
        <div className="amount-wrapper">
          <div style={freezeTents ? { display: "none" } : { display: "block" }}>
            <button className="basket-minus" onClick={() => remove(id)}>
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
            </button>
          </div>
          <p>{amount} x </p>
        </div>

        <div className="type-wrapper">
          <p className="basket-font">{type}</p>
        </div>
      </div>

      <p className="basket-font">{price} ,-</p>
    </li>
  );
}
