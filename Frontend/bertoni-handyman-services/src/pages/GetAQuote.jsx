import React, { useState } from "react";

const QuoteForm = () => {
  const [dateInputValue, setDateInputValue] = useState(
    "Preferred Finish Date (optional)"
  );
  const [isDateFocused, setDateFocused] = useState(false);

  const handleDateFocus = () => {
    if (!isDateFocused) {
      setDateInputValue("");
      setDateFocused(true);
    }
  };
  const handleDateBlur = (e) => {
    if (e.target.value === "") {
      setDateInputValue("Preferred Finish Date (optional)");
      setDateFocused(false);
    }
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
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#ffa500",
      color: "#fff",
      cursor: "pointer",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Get a Quote</div>
      <div style={{ marginBottom: "20px" }}>
        Already have an account?{" "}
        <a href="/signin" style={{ textDecoration: "underline" }}>
          Sign In
        </a>{" "}
        here.
      </div>

      <form style={styles.form}>
        <div style={styles.row}>
          <input type="text" placeholder="First Name" style={styles.input} />
          <input type="text" placeholder="Last Name" style={styles.input} />
        </div>

        <div style={styles.row}>
          <input
            type="text"
            placeholder="Phone (optional)"
            style={styles.input}
          />
          <input type="email" placeholder="Email" style={styles.input} />
        </div>

        <textarea
          rows="5"
          placeholder="General/Technical Specifications of Service and Requirements"
          style={styles.textArea}
        ></textarea>

        <input
          type="date"
          onFocus={handleDateFocus}
          onBlur={handleDateBlur}
          value={dateInputValue}
          onChange={(e) => setDateInputValue(e.target.value)}
          placeholder="Preferred Finish Date (optional)"
          style={{ ...styles.input, marginTop: "20px", width: "100%" }}
        />

        <button className="bg-orange-500 text-black text-xl sm:text-2xl md:text-2xl lg:text-3xl px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-3 md:py-4 lg:py-5 font-bold mr-4 sm:mr-6 md:mr-8 lg:mr-10 focus:outline-none focus:ring-2 focus:ring-orange-400 hover:scale-105 shadow-custom-shadow transition-transform">
          Send
        </button>
      </form>
    </div>
  );
};

export default QuoteForm;
