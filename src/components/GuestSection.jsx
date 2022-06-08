import { useState } from "react";

export default function GuestSection({ guestsAmount }) {
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestemail, setGuestEmail] = useState("");

  const gFirstNameChanged = (e) => {
    setGuestFirstName(e.target.value);
  };

  const gLastNameChanged = (e) => {
    setGuestLastName(e.target.value);
  };

  const gEmailChanged = (e) => {
    setGuestEmail(e.target.value);
  };

  return (
    <section className="guest">
      <h2 className="pm_font">Guest</h2>

      <div className="form-part">
        <label htmlFor="gfname">First name</label>
        <input
          type="text"
          className="gFname"
          name="guestfirstname"
          placeholder="John M."
          required
          onChange={gFirstNameChanged}
          value={guestFirstName}
        />
      </div>
      <div className="form-part">
        <label htmlFor="gLname">Last name</label>
        <input
          type="text"
          className="gLname"
          name="guestlastname"
          placeholder="Doe"
          required
          onChange={gLastNameChanged}
          value={guestLastName}
        />
      </div>
      <div id="gemail" className="form-part">
        <label htmlFor="gEmail">Email</label>
        <input
          type="email"
          className="guestEmail"
          name="guestemail"
          placeholder="john@example.com"
          required
          onChange={gEmailChanged}
          value={guestemail}
        ></input>
      </div>
    </section>
  );
}
