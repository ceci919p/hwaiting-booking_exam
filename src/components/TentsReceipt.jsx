export default function TentsReceipt({ type, price, amount, id }) {
  return (
    <li className="basket-list">
      <div className="amount-type-wrapper">
        <div className="amount-wrapper">
          <div className="amount-container">
            <p className="amount-p">{amount} </p>
            <p>x</p>
          </div>
        </div>

        <div className="type-wrapper">
          <p className="basket-font">{type}</p>
        </div>
      </div>

      <p className="basket-font">{price} ,-</p>
    </li>
  );
}
