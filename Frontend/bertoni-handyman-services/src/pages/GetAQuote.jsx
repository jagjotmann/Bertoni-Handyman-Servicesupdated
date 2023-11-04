import React, { useState } from "react";

const QuoteForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredFinishDate, setPreferredFinishDate] = useState("");
  const [errors, setErrors] = useState({});
  const [specifications, setSpecifications] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = {};
    if (!firstName) newErrors.firstName = "First Name cannot be empty";
    if (!lastName) newErrors.lastName = "Last Name cannot be empty";
    if (!email) newErrors.email = "Email cannot be empty";
    setErrors(newErrors);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "40px 0",
    },
    title: {
      fontSize: "32px",
      marginBottom: "20px",
    },
    form: {
      width: "100%",
      background: "#f6f6f6",
      padding: "20px",
      borderRadius: "5px",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    input: {
      width: "48%",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    textArea: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      resize: "vertical",
    },
    button: {
      padding: "12px 20px",
      fontSize: "16px",
      borderRadius: "10px",
      backgroundColor: "#ffa500",
      color: "#fff",
      fontWeight: "bold",
      marginRight: "4px",
      outline: "none",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Example for shadow-custom-shadow, adjust your actual shadow
      transition: "transform 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Get a Quote</div>
      <div style={{ marginBottom: "20px" }}>
        Already have an account? {""}
        <a href="/signin" style={{ textDecoration: "underline" }}>
          Sign In
        </a>
        &nbsp; here.
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.row}>
          <input
            type="text"
            placeholder={errors.firstName || "First Name"}
            style={{
              ...styles.input,
              borderColor: errors.firstName ? "red" : "#ccc",
              color: errors.firstName ? "red" : "black",
            }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() =>
              setErrors({
                ...errors,
                firstName: firstName ? "" : "First Name cannot be empty",
              })
            }
          />
          <input
            type="text"
            placeholder={errors.lastName || "Last Name"}
            style={{
              ...styles.input,
              borderColor: errors.lastName ? "red" : "#ccc",
              color: errors.lastName ? "red" : "black",
            }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() =>
              setErrors({
                ...errors,
                lastName: lastName ? "" : "Last Name cannot be empty",
              })
            }
          />
        </div>
        <div style={styles.row}>
          <input
            type="text"
            placeholder={errors.phoneNumber || "Phone (optional)"}
            style={{
              ...styles.input,
              borderColor: errors.phoneNumber ? "red" : "#ccc",
            }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="email"
            placeholder={errors.email || "Email"}
            style={{
              ...styles.input,
              borderColor: errors.email ? "red" : "#ccc",
              color: errors.email ? "red" : "black",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              setErrors({
                ...errors,
                email: email ? "" : "Email cannot be empty",
              })
            }
          />
        </div>
        <div>
          <textarea
            rows="5"
            placeholder={
              errors.specifications ||
              "General/Technical Specifications of Service and Requirements"
            }
            style={{
              ...styles.textArea,
              borderColor: errors.specifications ? "red" : "#ccc",
              color: errors.specifications ? "red" : "black",
            }}
            value={specifications}
            onChange={(e) => setSpecifications(e.target.value)}
            onBlur={() =>
              setErrors({
                ...errors,
                specifications: specifications
                  ? ""
                  : "Specifications cannot be empty",
              })
            }
          ></textarea>
        </div>
        <div>
          <input
            type="date"
            placeholder="Preferred Finish Date (optional)"
            style={{
              ...styles.input,
              marginTop: "10px",
              marginBottom: "10px",
              width: "100%",
            }}
            value={preferredFinishDate}
            onChange={(e) => setPreferredFinishDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-black text-xl sm:text-2xl md:text-2xl lg:text-3xl px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-3 md:py-4 lg:py-5 font-bold mr-4 sm:mr-6 md:mr-8 lg:mr-10 focus:outline-none focus:ring-2 focus:ring-orange-400 hover:scale-105 shadow-custom-shadow transition-transform"
          style={{ borderRadius: "10px" }}
        >
          {" "}
          Send{" "}
        </button>
      </form>
    </div>
  );
};

export default QuoteForm;
