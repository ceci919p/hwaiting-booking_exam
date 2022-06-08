import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function GoGreenReciept() {
  const { basket } = useContext(BasketContext);

  return (
    <li>
      <p>{basket.gogreenBA.type}</p>
      <p>{basket.gogreenBA.price},-</p>
    </li>
  );
}
