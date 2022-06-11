import { useNavigate } from "react-router-dom";
//import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";
import { useState } from "react";

export default function Step5({
  reservationData,
  ticketHolderData,
  setFreezeTickets,
}) {
  //current state of expireDate is set to false
  const [expireDate, setExpireDate] = useState(false);
  const navigate = useNavigate();

  //id is the bookingID from our put request (reservationData) from CampingSpot.jsx
  let id = reservationData["id"];

  //when payment info is submitted
  //preventdefault makes sure it does not refresh the page when submitting
  //update expireDate to false
  const onSubmit = (e) => {
    e.preventDefault();
    setExpireDate(false);

    //----validation on expiry date. NumberFormat from "react-number-format" is used to solve this-----

    //to make validation on expiry date we have to get the current month and year
    //and the written month and year in the input field
    //this way, we can compare the two

    //CURRENT MONTH
    //now display this format "date Sat Jun 11 2022" in the console
    const now = new Date();

    //currentMonth displays the month as a month fx june = 6
    let currentMonth = now.getMonth() + 1;

    //CURRENT YEAR

    //make it a string (2022)
    let year = now.getFullYear().toString();

    //we only want 2 digits from year (the last two) fx 2023 --> 23
    let currentYear = year.slice(2, 4);

    //INDTASTET MONTH + YEAR
    //only get the 2 first digits (slice 0,2) fx february --> 02
    let valueMonth = e.target.elements.expirydate.value.slice(0, 2);

    //only get the last 2 digits (slice 3,5) fx 2023 --> 23
    let valueYear = e.target.elements.expirydate.value.slice(3, 5);

    //Number() makes it a number instead of string so we can compare them in a conditional (if-statement)
    let cleanCurrentMonth = Number(currentMonth);
    let cleanCurrentYear = Number(currentYear);
    let cleanValueMonth = Number(valueMonth);
    let cleanValueYear = Number(valueYear);

    //check the expiry data is expired or not
    //if the year written in the input is less than the current year, then set expireDate to true (its expired)
    if (cleanValueYear < cleanCurrentYear) {
      setExpireDate(true);
    } else if (
      //if the written month is lesser than the current month AND the written year is the same as the current year (it's expired)
      cleanValueMonth < cleanCurrentMonth &&
      cleanCurrentYear === cleanValueYear
    ) {
      setExpireDate(true);
    } else {
      //else it is not expired and payment can be confirmed
      paymentConfirmed();
    }
  };

  //----POST RESERVATIONS

  function paymentConfirmed() {
    //URL TO FULLFILL RESERVATION
    fetch("https://hwaiting.herokuapp.com/fullfill-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //our booking ID from reservationData
        id: id,
      }),
    })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    //when the reservation is fullfilled, we want to put the information from step 4 and step 5
    //into our own database
    //we call the function that does exactly that
    postPersonalData();
  }

  function postPersonalData() {
    const postFullData = JSON.stringify(ticketHolderData);
    console.log(ticketHolderData);
    //our endpoint to our own database
    fetch("https://hwaitingbookings-94dc.restdb.io/rest/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //apikey allows us to put content into the database
        "x-apikey": "6290a5a6ccc2033946f4ab6b",
      },
      body: postFullData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    //.catch((err) => console.error(err));

    //freezeTickets to true as tickets cannot be changed anymore
    setFreezeTickets(true);

    //call to function - "execute the action"
    navigateto();
  }

  //goes to next page (confirmation)
  function navigateto() {
    navigate("/confirmation");
  }

  //limit on card number input - NumberFormat from "react-number-format" is used to solve this
  //how we get the format of the month
  //called from the cardExpiry format function (line 139)

  function limit(val, max) {
    //max = 12
    //val = written value in input field

    //if val.length is 1 (only one digit number is written) AND val's first character is greater
    //than the max value (12)'s first character (1)
    if (val.length === 1 && val[0] > max[0]) {
      //then add a zero automatically to the number written in the input field
      val = "0" + val;
    }
    //if a two digit number is written..
    if (val.length === 2) {
      if (Number(val) === 0) {
        //if the number of val is 0, then value is "01" (happens when the user types 0 two times)
        val = "01";

        //this can happen when user paste number otherwise it is not possible
      } else if (val > max) {
        //it only pastes the first 12 numbers in the input field
        val = max;
      }
    }

    return val;
  }

  //the format of card expiry
  //how we get input to fx februar 2023 --> 02/23

  function cardExpiry(val) {
    //month can only be from 1-12 (format: 01-12)
    // month passes the value of the written input but only the 2 first digit to the function limit
    //it also passes "12" which becomes max in limit()
    let month = limit(val.substring(0, 2), "12");

    //written year with only 2 digits (2023--> 23)
    let year = val.substring(2, 4);

    //how we get the output (month/year, fx februar 2023 --> 02/23)
    //if truthy then month / year output
    //else, if falsy, then empty string
    return month + (year.length ? "/" + year : "");
  }

  return (
    <section className="steps" id="step5-section">
      <div id="step-wrapper">
        <div className="heading-wrapper">
          <h2 className="h1margin">
            Step 5 <span className="fullsteps">/ 5</span>
          </h2>
          <p>Card information</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="cardname">
            <label htmlFor="name">Name on card</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              autoComplete="cc-name"
              placeholder="Ex. John Doe"
            />
          </div>
          <div className="card-number">
            <label>Card number</label>
            <NumberFormat format="#### #### #### ####" mask="_" />
          </div>

          <div className="expire">
            <label htmlFor="expiry-date">Expiry date</label>
            <NumberFormat
              required
              id="expiry-date"
              name="expirydate"
              className="expiry-date"
              format={cardExpiry}
            />
            {expireDate ? (
              <p className="error-msg">Invalid expiry date</p>
            ) : null}
          </div>
          <div className="code">
            <label htmlFor="security-code">Security code</label>
            <input
              required
              type="text"
              id="security-code"
              name="security-code"
              inputMode="numeric"
              minLength="3"
              maxLength="4"
              placeholder="000"
              pattern="[0-9]+"
            />
          </div>
          <button type="submit" className="next-step" id="payment-sub">
            Confirm payment
          </button>
        </form>
      </div>
    </section>
  );
}
