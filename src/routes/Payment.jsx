import { useNavigate } from "react-router-dom";
//import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";
import { useState } from "react";

export default function Step5({
  reservationData,
  ticketHolderData,
  setFreezeTickets,
}) {
  const [expireDate, setExpireDate] = useState(false);
  const navigate = useNavigate();
  let id = reservationData["id"];

  const onSubmit = (e) => {
    e.preventDefault();
    setExpireDate(false);

    //CURRENT MONTH
    const now = new Date();

    let currentMonth = now.getMonth() + 1;

    //CURRENT YEAR
    let year = now.getFullYear().toString();
    let currentYear = year.slice(2, 4);

    //Indtastet month og year
    let valueMonth = e.target.elements.expirydate.value.slice(0, 2);
    let valueYear = e.target.elements.expirydate.value.slice(3, 5);

    let cleanCurrentMonth = Number(currentMonth);
    let cleanCurrentYear = Number(currentYear);
    let cleanValueMonth = Number(valueMonth);
    let cleanValueYear = Number(valueYear);

    if (cleanValueYear < cleanCurrentYear) {
      setExpireDate(true);
    } else if (
      cleanValueMonth < cleanCurrentMonth &&
      cleanCurrentYear === cleanValueYear
    ) {
      setExpireDate(true);
    } else {
      paymentConfirmed();
    }
  };

  function paymentConfirmed() {
    //POST RESERVATION
    fetch("https://hwaiting.herokuapp.com/fullfill-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    postPersonalData();
  }

  function postPersonalData() {
    const postFullData = JSON.stringify(ticketHolderData);
    console.log(ticketHolderData);
    fetch("https://hwaitingbookings-94dc.restdb.io/rest/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "6290a5a6ccc2033946f4ab6b",
      },
      body: postFullData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    //.catch((err) => console.error(err));

    setFreezeTickets(true);
    navigateto();
  }
  function navigateto() {
    navigate("/confirmation");
  }

  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  function cardExpiry(val) {
    let month = limit(val.substring(0, 2), "12");
    let year = val.substring(2, 4);

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
