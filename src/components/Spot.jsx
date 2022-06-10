import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function Spot(props) {
  const { basket, setBasket } = useContext(BasketContext);

  //
  function choose() {
    if (props.spot.available < props.ticketsinBasketNo) {
      alert(
        "Your number of tickets exceeds the number of available spots, please pick another camp"
      );
    } else {
      if (
        //find the first element in the campingSpot (BA) array with the same ProductType as the chosen campingspot
        //in CampingSpots.jsx line 77 we defined spot for each campingspot
        //which means "if you find a campingspot in basket that matches the chosen campingspot" (all campingspots have the same productType),
        //then update the state of the basket with the new chosen campingspot and add 1 in amount

        basket.campingSpot.find(
          (spot) => spot.productType === props.spot.productType
        )
      ) {
        setBasket((oldState) => ({
          ...oldState,
          campingSpot: [{ ...props.spot, amount: 1 }],
        }));
      } else {
        //if there's enough availables spots and there isn't any other campingspot in basket, then add just the chosen campingspot to basket

        setBasket((oldState) => ({
          ...oldState,
          campingSpot: [{ ...props.spot, amount: 1 }],
        }));
      }
    }
  }
  return (
    <div
      className="campingspot"
      onClick={choose}
      style={
        props.spot.available >= props.ticketsinBasketNo
          ? { border: "5px solid #20E3E3", boxShadow: "0px 0px 10px #5AFFFF" }
          : { border: "5px solid #FB3CFF", boxShadow: "0px 0px 10px #FC61FF" }
      }
    >
      <h3>{props.spot.area}</h3>
      <p>Available: {props.spot.available}</p>
    </div>
  );
}
