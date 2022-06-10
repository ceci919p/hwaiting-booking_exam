import Select from "react-select";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import GuestSection from "../components/GuestSection";

export default function Step4({
  setTicketHolderData,
  ticketsinBasketNo,
  reservationData,
  setGuestData,
  guestData,
}) {
  //we make useState for each input field since it changes when the user writes something in the input fields
  //we start off by giving them empty strings (strings because that's what the value of the input fields are)
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  //in our UI we have a form for the ticket holder and section for each guest.
  //to get the number of sections that should be added to the UI we take our
  //tickets in basket and removes one (the ticket holder) from the array

  const N = ticketsinBasketNo - 1;
  const guestsAmount = Array.from({ length: N }, (_, index) => index + 1);

  let id = reservationData["id"];

  //fNameChanged is when the user has written something in the firstname input field
  //we then update our state for our firstname input field to the value written in
  //the input field (e.target.value)
  const fNameChanged = (e) => {
    setFname(e.target.value);
  };

  const lNameChanged = (e) => {
    setLname(e.target.value);
  };

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  //this is from an installed npm module "react-select-country-input"
  //which gives us an dropdown with all the countries that exists (in english)
  const options = useMemo(() => countryList().getData(), []);

  const countryChanged = (value) => {
    setCountry(value);
  };

  const cityChanged = (e) => {
    setCity(e.target.value);
  };

  //preventdefault makes sure it does not refresh the page when submitting
  const onSubmit = (e) => {
    e.preventDefault();

    //if we only have 1 guest we cannot map
    if (ticketsinBasketNo === 2) {
      let oneGuest = {
        //gets fullName by concatenating the written guest firstname with the written guest lastname
        fullName: e.target.elements.guestfirstname.value.concat(
          " ",
          e.target.elements.guestlastname.value
        ),
        email: e.target.elements.guestemail.value,
      };
      //send oneGuest as a parameter to the setData function, which holds ticketHolderData
      setData(oneGuest);
    } else if (ticketsinBasketNo >= 3) {
      //if more than one guest

      //make array with guestFirstNames for each guest - same with guestLastName
      let guestFirstNames = [];
      e.target.elements.guestfirstname.forEach((n) => {
        guestFirstNames.push(n.value);
      });

      let guestLastNames = [];
      e.target.elements.guestlastname.forEach((n) => {
        guestLastNames.push(n.value);
      });

      // map igennem firstnames: e=value i array, i=index i array
      //matcher current e med e i andet array med samme index + et mellemrum
      let guestNameData = guestFirstNames.map(
        (e, i) => e + " " + guestLastNames[i]
      );

      let guestEmails = [];
      e.target.elements.guestemail.forEach((e) => {
        guestEmails.push(e.value);
      });

      let fullGuestData = guestEmails.map((email, index) => {
        return {
          fullName: guestNameData[index],
          email: email,
        };
      });

      setData(fullGuestData);
    } else if (ticketsinBasketNo === 1) {
      setData();
    }

    function setData(data) {
      setTicketHolderData({
        firstName: e.target.elements.firstname.value,
        lastName: e.target.elements.lastname.value,
        email: e.target.elements.email.value,
        country: e.target.elements.country.value,
        city: e.target.elements.city.value,
        bookingId: id,
        guests: data,
      });
    }

    navigate("/booking/payment");
  };
  const selectstyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
    }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "black",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };
  return (
    <section id="step4-section" className="steps">
      <div id="step4-wrapper">
        <div className="heading-wrapper">
          <h2 className="h1margin">
            Step 4 <span className="fullsteps">/ 5</span>
          </h2>
          <p>Your information</p>
        </div>

        <div id="form-information">
          <form onSubmit={onSubmit}>
            <section id="ticket-holder">
              <h2 className="pm_font">Ticket holder</h2>

              <div id="firstname" className="form-part">
                <label htmlFor="fname">First name</label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="John M."
                  required
                  onChange={fNameChanged}
                  value={fName}
                />
              </div>

              <div id="lastname" className="form-part">
                <label htmlFor="lname">Last name</label>
                <input
                  type="text"
                  id="lname"
                  name="lastname"
                  placeholder="Doe"
                  required
                  onChange={lNameChanged}
                  value={lName}
                />
              </div>

              <div id="email" className="form-part">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  onChange={emailChanged}
                  value={email}
                ></input>
              </div>
              <div id="fcountry" className="form-part">
                <label htmlFor="">Country</label>
                <Select
                  id="country"
                  name="country"
                  //className="form-part"
                  options={options}
                  value={country}
                  onChange={countryChanged}
                  styles={selectstyles}
                  required
                />
              </div>

              <div id="city" className="form-part">
                <label htmlFor="city"> City/State</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  pattern="^[\p{L}\s-]+$"
                  placeholder="København"
                  onChange={cityChanged}
                  value={city}
                  required
                ></input>
              </div>
            </section>
            {/* show additional guest info if theres more than one ticket selected. The number of additional guest number depends on the amount of tickets selcted */}
            {guestsAmount.length >= 1
              ? guestsAmount.map((a) => (
                  <GuestSection guestsAmount={guestsAmount} />
                ))
              : null}
            <button type="submit" className="next-step" id="info-sub">
              Next
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
