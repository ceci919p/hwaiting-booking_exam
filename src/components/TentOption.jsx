import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function TentOption(props) {
  const { basket, setBasket } = useContext(BasketContext);

  //add is defined in additionals.jsx line 27 and is the tentoption component for each prepared tents (theres 2 types)

  //the total amount of persons in prepared tents cannot be greater than the persons
  //booked for the festival (tickets in basket)
  //that means if you booked 3 tickets, you cannot choose 2 x 2 persons tents

  function choose() {
    //if the total amount of pers in prepared tents is greater or equal to tickets in basket OR
    //pers in the tentoption is greater than tickets in basket, then make alert
    if (
      props.fullAmountOfPers >= props.ticketsinBasketNo ||
      props.add.pers > props.ticketsinBasketNo
    ) {
      alert("The number of tickets does not match the size of the tents");
    } else {
      //**if inside else**
      //if a tent option in the basket with the same id as the chosen tent option is found,
      if (basket.tentsBA.find((add) => add.id === props.add.id)) {
        //then setBasket from old state to new state (const mapped) which is a value found
        //by mapping through old state's tent option array in basket (BA)
        //and finding add (tent option)

        setBasket((old) => {
          const mapped = old.tentsBA.map((add) => {
            //if the tent option matches the id of the chosen tent -
            if (add.id === props.add.id) {
              //make a copy
              const copy = { ...add };

              //increment copy (plus the tent option with 1)
              copy.amount++;

              //return copy of tent option
              return copy;
            }
            //else (no of the same tent option ID's) return add (that was found in old state's tentsBA (array in basket))
            return add;
          });

          //return copy of old state (spread operator) but change tentsBA to value of the new state (value of mapped)
          return { ...old, tentsBA: mapped };
        });
      } else {
        //if there isn't found a tentoption ID in basket that matches the chosen tent option's ID
        //then update state of basket with a copy of old state but update tentsBA
        //with the added element which is the chosen tent option added to basket
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
