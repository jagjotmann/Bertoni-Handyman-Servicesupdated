// server.js
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./dist/routes/userRoutes.js");
const quoteRoutes = require("./dist/routes/quoteRoutes.js");
const statusRoutes = require("./dist/routes/statusRoutes.js");
const testimonialRoutes = require("./dist/routes/testimonialRoutes.js");
const emailRoutes = require("./dist/routes/emailRoutes.js");
const LoginRoutes = require("./dist/routes/LoginRoutes.js");

const fs = require("fs").promises;
const process = require("process");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const path = require("path");
//google sheduling imports
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Route middlewares
app.use("/users", userRoutes);
app.use("/quotes", quoteRoutes);
app.use("/status", statusRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/login", LoginRoutes);
app.use("/email", emailRoutes);

// Set MongoDB URI based on the environment
const environment = process.env.NODE_ENV || "development";
const mongoDBURi =
  environment === "production"
    ? process.env.PROD_MONGODB_URI
    : process.env.DEV_MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(mongoDBURi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected")) // Log on successful connection
  .catch((err) => console.error("Error connectiong MongoDB: " + err)); // Log on connection error

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the server start
});

// ***********************************************
// START OF GOOGLE SCHEDULING API SETUP AND ROUTES
// ***********************************************

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// const SCOPES = 'https://www.googleapis.com/auth/calendar';

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  try {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  } catch (err) {
    console.log(
      "Error authenticating google account (unregistered credentials or API key)"
    );
    //for debugging
    // console.log(
    //   err
    // );
  }
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
  try {
    const calendar = google.calendar({ version: "v3", auth });
    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log("No upcoming events found.");
      return;
    }
    console.log("Upcoming 10 events:");
    events.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.summary}`);
    });
  } catch (err) {
    console.log("Error listing events.");
    // console.log(err);
  }
}

app.post("/gapi/createEvent", (req, res) => {
  async function createEvent(auth) {
    const calendar = google.calendar({ version: "v3", auth });
    const event = {
      summary: "Google I/O 2015",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2015-05-28T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2015-05-28T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      attendees: [
        { email: "lpage@example.com" },
        { email: "sbrin@example.com" },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    calendar.events.insert(
      {
        auth: auth,
        calendarId: "primary",
        resource: event,
      },
      function (err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          return;
        }
        console.log("Event created: %s", event.htmlLink);
      }
    );
  }
  authorize.then(createEvent).catch(console.error);
  res.send(200, { message: "Event Created Successfully" });
});

authorize().then(listEvents).catch(console.error);
