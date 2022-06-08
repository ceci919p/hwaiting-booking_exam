export default function TicketReceipt({ id, amount, type, price }) {
  return (
    <li className="basket-list" key={id}>
      <div className="amount-type-wrapper">
        <div className="amount-wrapper">
          <div className="amount-container">
            <p>{amount} </p> <p>x</p>
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
  );
}
