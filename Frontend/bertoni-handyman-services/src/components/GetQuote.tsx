import React, { useState } from "react";

function GetQuote() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [preferredFinishDate, setPreferredFinishDate] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    window.location.href = "/";
  };

  return (
    <div className="get-a-quote">
      <h2>Get a Quote</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone (Optional)</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preferredFinishDate">Preferred Finish Time</label>
          <input
            type="text"
            id="preferredFinishDate"
            value={preferredFinishDate}
            onChange={(e) => setPreferredFinishDate(e.target.value)}
          />
        </div>
        <button type="submit">Request Quote</button>
      </form>
    </div>
  );
}

export default GetQuote;
