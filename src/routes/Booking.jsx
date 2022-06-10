import Basket from "../components/Basket";

import Tickets from "./Tickets";
import CampingSpots from "./CampingSpots";
import Additionals from "./Additionals";
import Information from "./Information";
import Payment from "./Payment";
import Confirmation from "./Confirmation";

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function Booking() {
  const [campingData, setCampingData] = useState([]);
  const [ticketNo, setTicketNo] = useState(0);
  const [reservationData, setReservationData] = useState();
  const [freezeTickets, setFreezeTickets] = useState(false);
  const [freezeTents, setFreezeTents] = useState(false);
  const [ticketHolderData, setTicketHolderData] = useState({});
  const { basket } = useContext(BasketContext);

  // console.log(reservationData);

  //our tickets this is the data we use to display it on the bookingpage

  const tickets = [
    {
      id: 1,
      type: "Regular Ticket",
      price: 799,
      productType: "ticket",
    },
    {
      id: 2,
      type: "VIP Ticket",
      price: 1299,
      productType: "ticket",
    },
  ];

  //our additionals - like tickets we use this data to pass it to relevant functions and display it on the DOM

  const additionals = [
    {
      type: "2 person tent",
      productType: "tent",
      price: 399,
      id: 1,
      pers: 2,
    },
    {
      type: "3 person tent",
      productType: "tent",
      price: 599,
      id: 2,
      pers: 3,
    },
  ];

  //gogreen is on its own since it has a boolean value and because it cannot be added more than once. It simply
  //works a little different compared to our additionals array which holds our prepared tents

  const gogreen = {
    type: "Go Green",
    productType: "gogreen",
    price: 249,
    id: 3,
    added: false,
  };

  useEffect(
    () => {
      //use effect to only call it once, otherwise it would loop because when you call the function getCampingData, it would change and trigger setProducts once again (infinite loop)

      //getCampingData fetches data from the URL
      async function getCampingData() {
        const res = await fetch(
          "https://hwaiting.herokuapp.com/available-spots"
        );
        const data = await res.json();

        //maps through each json data and gives it a price and a productType
        //this modified data is now called fullCampingData

        let fullCampingData = data.map((b) => {
          b.price = 99;
          b.productType = "camping";
          return b;
        });

        //we now update the current state with the modified data as a parameter (which is the new state)
        setCampingData(fullCampingData);

        //availableArr destruturing each fullCampingData's object attributes and using the object's rest operator
        //which inits an object called rest with all of the object attributes minus the ones specified before ("available" in this case)
        //we're trying to find the number of available spots. available gives us theese numbers

        let availableArr = fullCampingData.map(({ available, ...rest }) => {
          return available;
        });

        //AvailableArr has a list of the numbers of the available spots.
        //in this loop the number can only increment as long as it is lesser than availableArr.length
        //+= means take the current value of ticketNumber and add the value stored in the array at index i.
        //now set the state of Ticket number to a new state which is the value of ticketNumber
        //ticketNo is the number of tickets left in the available spot (this is how we know how many tickets that can be sold)

        let ticketNumber = 0;
        for (let i = 0; i < availableArr.length; i++) {
          ticketNumber += availableArr[i];
        }
        setTicketNo(ticketNumber);
      }

      //this call executes the code of the function

      getCampingData();
    },
    [
      //tomt array hvor man kan putte variables ind som hvis ændrede sig ville køre funktionen igen
    ]
  );

  //finding number of tickets in basket
  let ticketAmount = basket.tickets.map(({ amount, ...rest }) => {
    return amount;
  });

  let ticketsinBasketNo = 0;

  for (let i = 0; i < ticketAmount.length; i++) {
    ticketsinBasketNo += ticketAmount[i];
  }

  //check how many tents are selected
  let tentsAmount = basket.tentsBA.map(({ amount, ...rest }) => {
    return amount;
  });

  //check how many persons that tent can fit so we can compare it to number of tickets
  let persAmount = basket.tentsBA.map(({ pers, ...rest }) => {
    return pers;
  });
  let allPersInBasketNo = 0;

  for (let i = 0; i < persAmount.length; i++) {
    allPersInBasketNo += persAmount[i];
  }

  let fullAmountOfPers = tentsAmount * allPersInBasketNo;

  //---- full amount in basket calculation-----

  //getting ticket price
  const initialvalue = 0;
  const ticketSum = basket.tickets.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.amount * currentValue.price,
    initialvalue
  );

  //getting booking price
  const bookingSum = basket.campingSpot.reduce(
    (previousValue, currentValue) => previousValue + currentValue.price,
    initialvalue
  );

  //getting green price
  let gogreenSum;
  if (basket.gogreenBA.added === true) {
    gogreenSum = basket.gogreenBA["price"];
  } else {
    gogreenSum = 0;
  }

  //getting tent price

  const tentSum = basket.tentsBA.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.amount * currentValue.price,
    initialvalue
  );

  //get full basket price
  let fullPrice = ticketSum + bookingSum + gogreenSum + tentSum;

  return (
    <section id="booking">
      {/* <Timer></Timer> */}

      <Routes>
        <Route
          path=""
          element={
            <Tickets
              ticketNo={ticketNo}
              ticketData={tickets}
              dataCamping={campingData}
              ticketsinBasketNo={ticketsinBasketNo}
              setFreezeTickets={setFreezeTickets}
            />
          }
        />
        <Route
          path="campingspots"
          element={
            <CampingSpots
              ticketsinBasketNo={ticketsinBasketNo}
              dataCamping={campingData}
              reservationData={reservationData}
              setReservationData={setReservationData}
            />
          }
        />
        <Route
          path="additional"
          element={
            <Additionals
              additionals={additionals}
              gogreen={gogreen}
              ticketsinBasketNo={ticketsinBasketNo}
              fullAmountOfPers={fullAmountOfPers}
              setFreezeTents={setFreezeTents}
            />
          }
        />
        <Route
          path="information"
          element={
            <Information
              reservationData={reservationData}
              ticketsinBasketNo={ticketsinBasketNo}
              setTicketHolderData={setTicketHolderData}
            />
          }
        />
        <Route
          path="payment"
          element={
            <Payment
              reservationData={reservationData}
              ticketHolderData={ticketHolderData}
              setFreezeTickets={setFreezeTickets}
            />
          }
        />
        <Route
          element={<Confirmation ticketData={tickets} fullPrice={fullPrice} />}
        />
      </Routes>
      <Basket
        gogreen={gogreen}
        additionals={additionals}
        ticketNo={ticketNo}
        ticketData={tickets}
        dataCamping={campingData}
        ticketsinBasketNo={ticketsinBasketNo}
        reservationData={reservationData}
        freezeTickets={freezeTickets}
        fullPrice={fullPrice}
        freezeTents={freezeTents}
      ></Basket>
    </section>
  );
}
