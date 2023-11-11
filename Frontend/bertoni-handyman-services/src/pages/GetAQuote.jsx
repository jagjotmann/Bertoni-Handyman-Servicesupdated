import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const QuoteForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredFinishDate, setPreferredFinishDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [specifications, setSpecifications] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      style={{
        ...styles.input,
        width: "100%",
      }}
    >
      {value || placeholder}
    </button>
  ));
  CustomInput.displayName = "CustomInput";
  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First Name cannot be empty";
    if (!lastName.trim()) newErrors.lastName = "Last Name cannot be empty";
    if (!email.trim()) newErrors.email = "Email cannot be empty";
    if (!specifications.trim())
      newErrors.specifications = "Specifications cannot be empty";
    return newErrors;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    let formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      // Mock API call - replace with actual API call
      try {
        const response = await sendFormDataToServer({
          firstName,
          lastName,
          email,
          phoneNumber,
          preferredFinishDate,
          specifications,
        });
        // Handle response
        console.log(response);
        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setPreferredFinishDate("");
        setSpecifications("");
        setIsSubmitted(true);
      } catch (error) {
        // Handle error
        console.error(error);
        setErrors({ submit: "Failed to submit the form. Please try again." });
      }
      setIsSubmitting(false);
    }
  };

  const sendFormDataToServer = (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: "success", ...formData });
      }, 2000);
    });
  };

  const handleDataChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    let formattedInput = "";

    if (input.length <= 2) {
      formattedInput = input;
    } else if (input.length <= 4) {
      formattedInput = "${input.slice(0,2)} - ${input.slice(2)}";
    } else {
      formattedInput =
        "${input.slice(0,2)} - ${input.slice(2,4)} - ${input.slice(4,8)}";
    }

    setPreferredFinishDate(formattedInput);
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
      fontWeight: "bold",
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
      gap: "16px",
    },
    input: {
      width: "50%",
      padding: "15px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "1rem",
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
      backgroundColor: "#f97316",
      color: "#000",
      fontWeight: "bold",
      marginRight: "4px",
      outline: "none",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Example for shadow-custom-shadow, adjust your actual shadow
      transition: "transform 0.2s",
    },

    sentContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "40px 0",
    },
    signInLink: {
      textDecoration: "underline",
      color: "#ffa500",
    },
    dateInput: {
      color: "#ccc",
    },
    dateInputNotEmpty: {
      color: "black",
    },
  };

  const renderForm = () => (
    <>
      <div style={styles.title}>Get a Quote</div>
      <div style={{ marginBottom: "20px" }}>
        Already have an account?{" "}
        <a href="/signin" style={{ textDecoration: "underline" }}>
          Sign In
        </a>{" "}
        here.
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
                firstName: firstName.trim() ? "" : "First Name cannot be empty",
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
                lastName: lastName.trim() ? "" : "Last Name cannot be empty",
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
                email: email.trim() ? "" : "Email cannot be empty",
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
                specifications: specifications.trim()
                  ? ""
                  : "General/Technical Specifications and Requirements cannot be empty",
              })
            }
          ></textarea>
        </div>
        <div style={{ height: "20px" }}></div>
        <div>
          <DatePicker
            showIcon
            selected={preferredFinishDate}
            onChange={(date) => setPreferredFinishDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText=" Preferred Finish Date (optional) "
            CustomInput={<CustomInput />}
          />
        </div>
        <div style={{ height: "20px" }}></div>
        <button
          type="submit"
          disabled={isSubmitting} // Disable button during form submission
          style={{ ...styles.button, opacity: isSubmitting ? 0.5 : 1 }}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
        {errors.submit && <p style={{ color: "red" }}>{errors.submit}</p>}
      </form>
    </>
  );

  return (
    <div style={styles.container}>
      {isSubmitted ? (
        // Show success message after form submission
        <div style={styles.sentContainer}>
          <h2 style={styles.title}>Sent!</h2>
          <p style={{ color: "orange", fontSize: "16px" }}>
            Thanks for submitting a Quote Request!
            <br />
          </p>
          <p
            style={{
              ...styles.row,
              fontSize: "16px",
              fontWeight: "normal",
              textAlign: "center",
            }}
          >
            We have sent you an email with your{" "}
            <strong>&nbsp; Quote Number</strong>.
          </p>
          <p
            style={{
              ...styles.row,
              fontSize: "16px",
              fontWeight: "normal",
              textAlign: "center",
            }}
          >
            You can use your Quote Number to sign into your account to view your
            Quote's status.
          </p>

          <button
            onClick={() => (window.location.href = "/signin")}
            style={{
              ...styles.button,
              textDecoration: "none",
              display: "block",
              width: "fit-content",
              marginTop: "20px",
            }}
          >
            Sign in
          </button>
        </div>
      ) : (
        // Show form
        renderForm()
      )}
    </div>
  );
};

export default QuoteForm;
