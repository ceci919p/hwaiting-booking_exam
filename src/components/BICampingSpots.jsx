export default function BICampingSpot({ area, available, price, spots }) {
  //console.log(props.area);
  return (
    <li className="basket-list">
      <p className="basket-bold-font">{area}</p>
      <p className="basket-font">{price} ,-</p>
    </li>
  );
}
