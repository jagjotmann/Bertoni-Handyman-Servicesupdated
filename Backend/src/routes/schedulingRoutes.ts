//@ts-nocheck

const express = require("express");
const router = express.Router();
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const axios = require("axios");

import { Request, Response } from "express";
const stdin = process.openStdin();

let OATH2_INSTANCE;

// If modifying these scopes, delete token.json.
const SCOPES = [
  // 'https://www.googleapis.com/auth/calendar.readonly',
  // 'https://www.googleapis.com/auth/calendar.events',
  "https://www.googleapis.com/auth/calendar",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";
let access_token;

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Calendar API.
  console.log("Authorizing Credentials...");
  authorize(JSON.parse(content));
});

router.get("/listEvents", async (req: Request, res: Response) => {
  //   const { email, firstName, lastName, password } = req.body;
  //   const saltRounds = 10;
  //   const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    listEvents(OATH2_INSTANCE, 10);
    res.status(201).json({ message: "Events Listed Successfully." });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/createEvent", async (req: Request, res: Response) => {
  const data = req.body;
  try {
    createEvent(OATH2_INSTANCE, data);
    res.status(201).json({ message: "Event created." });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// switch (Number(d)) {
//   case 10:
//     listEvents(auth, numberOfListedEvents);
//     break;
//   case 20:
//     createEvent(auth);
//     break;
//   case 30:
//     updateEvent(auth);
//     break;
//   case 40:
//     deleteFirstEvent(auth);
//     break;
//   case 41:
//     deleteFirstEvent(auth, true);
//     break;
//   case 90:
//     printAuth(auth);
//     break;
//   case 666:
//     revokeToken(auth);
//     break;
//   case 0:
//     process.exit();
//     break;
// }

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
    let client_token = JSON.parse(token);
    access_token = JSON.parse(token);
    OATH2_INSTANCE = oAuth2Client;
    console.log("Google API Credentials loaded successfully.");
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: code=", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      OATH2_INSTANCE = oAuth2Client;
    });
  });
}

function getCalendar(auth) {
  return google.calendar({ version: "v3", auth });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, numberOfEvents = 15) {
  const calendar = getCalendar(auth);
  const isoDate = new Date(1970, 1, 1).toISOString();

  calendar.events.list(
    paramsEventsList(isoDate, numberOfEvents),
    (err, res) => {
      if (err) console.log(err);

      const { items } = res.data;
      if (items.length) {
        res.data.items.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(
            `${start.slice(0, 10)} at ${start.slice(11, 16)} - ${
              event.summary
            } -> eventID: ${event.id}`
          );
        });
        // printAuth(calendar)
      } else {
        console.log("No events found");
      }
    }
  );
}

function paramsEventsList(fromIsoDate, numberOfEvents) {
  const paramsList = {
    calendarId: "wizardsweb42@gmail.com",
    timeMin: fromIsoDate,
    maxResults: numberOfEvents,
    singleEvents: true,
    orderBy: "startTime",
  };
  return paramsList;
}

function getActionFromUser(auth) {
  const numberOfListedEvents = 100;
  console.log(
    `10 - Lists your ${numberOfListedEvents} first Google calendar events`
  );
  // console.log(`11 - Lists your ${numberOfListedEvents} first Google calendar events from Today`)
  console.log("20 - Inserts new event for tomorrow");
  console.log("30 - Update the first event to current day");
  console.log("40 - Delete first event");
  console.log("41 - Delete first event from today");
  console.log("90 - Print Auth");
  console.log("666 - Revoke your token");
  console.log("\n0 - Exit");
  console.log("\n");
  console.log("Choose an action:");

  stdin.addListener("data", function (d) {
    switch (Number(d)) {
      case 10:
        listEvents(auth, numberOfListedEvents);
        break;
      case 20:
        createEvent(auth);
        break;
      case 30:
        updateEvent(auth);
        break;
      case 40:
        deleteFirstEvent(auth);
        break;
      case 41:
        deleteFirstEvent(auth, true);
        break;
      case 90:
        printAuth(auth);
        break;
      case 666:
        revokeToken(auth);
        break;
      case 0:
        process.exit();
        break;
    }
  });
}

function printAuth(calendar) {
  // console.log('- Auth: ', auth)
  // const calendar = getCalendar(auth)
  console.log("\n\n\n");
  console.log(calendar._options.auth.credentials.access_token);
}

function deleteFirstEvent(auth, fromToday) {
  const calendar = getCalendar(auth);
  let isoDate;
  fromToday
    ? (isoDate = new Date().toISOString())
    : (isoDate = new Date(1970, 1, 1).toISOString());

  calendar.events.list(paramsEventsList(isoDate, 1), (err, res) => {
    if (err) console.log(err);

    const { items } = res.data;
    if (items.length) {
      res.data.items.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(
          `${start.slice(0, 10)} at ${start.slice(11, 16)} - ${event.summary}`
        );
      });

      // console.log(items[0].id)
      deleteEvent(auth, items[0].id);
    } else {
      console.log("No events found");
    }
  });
}

function createEvent(auth, data) {
  const calendar = google.calendar({ version: "v3", auth });
  // console.log(calendar)
  console.log(data);
  return;

  let tomorrowOneHourLater = new Date(tomorrow.getTime());
  tomorrowOneHourLater.setHours(tomorrow.getHours() + 1);

  let event = {
    summary: "Sample Event happening Tomorrow!",
    description:
      "This is your sample event created from Murilloves' Google Calendar NODEJS API",
    start: {
      dateTime: tomorrow.toISOString(),
    },
    end: {
      dateTime: tomorrowOneHourLater.toISOString(),
    },
    attendees: [{ email: "lpage@example.com" }, { email: "sbrin@example.com" }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 30 },
      ],
    },
  };

  calendar.events.insert(
    {
      auth: auth,
      calendarId: "wizardsweb42@gmail.com",
      resource: event,
    },
    (err, res) => {
      if (err) return console.log(err);
      const event = res.data;

      if (event) {
        console.log("Booked event:");
        console.log(event);
      }
    }
  );
}

function updateEvent(auth) {
  const calendar = google.calendar({ version: "v3", auth });

  const calendarId = "wizardsweb42@gmail.com";
  let eventId = "";

  let event = {};

  calendar.events.list(
    paramsEventsList(new Date(1970, 1, 1).toISOString(), 1),
    (err, res) => {
      if (err) console.log(err);

      const { items } = res.data;

      eventId = items[items.length - 1].id;

      event = items[items.length - 1];

      let today = new Date();
      let todayOneHourAfter = new Date(today.getTime());
      todayOneHourAfter.setHours(todayOneHourAfter.getHours() + 1);

      (event.start.dateTime = today),
        (event.end.dateTime = todayOneHourAfter),
        calendar.events.update(
          {
            auth,
            calendarId,
            eventId,
            resource: event,
          },
          (err, res) => {
            if (err) return console.log(err);
            const event = res.data;

            if (event) {
              console.log("Booked event:");
              console.log(event);
            }
          }
        );
    }
  );
}

function createOOO(auth, details) {
  const calendar = google.calendar({ version: "v3", auth });
  // console.log(calendar)

  let tomorrowOneHourLater = new Date(tomorrow.getTime());
  tomorrowOneHourLater.setHours(tomorrow.getHours() + 1);

  let event = {
    summary: "Out of Office",
    description: "I am out of the office at this time.",
    start: {
      dateTime: tomorrow.toISOString(),
    },
    end: {
      dateTime: tomorrowOneHourLater.toISOString(),
    },
    transparency: "opaque",
    outOfOfficeProperties: {
      autoDeclineMode: "declineOnlyNewConflictingInvitations",
      declineMessage: "Sorry, I am out of office at this time.",
    },
    eventType: "outOfOffice",
  };

  calendar.events.insert(
    {
      auth: auth,
      calendarId: "wizardsweb42@gmail.com",
      resource: event,
    },
    (err, res) => {
      if (err) return console.log(err);
      const event = res.data;

      if (event) {
        console.log("Out of office event created:");
        console.log(event);
      }
    }
  );
}

function deleteEvent(auth, evId) {
  const calendar = google.calendar({ version: "v3", auth });

  calendar.events.delete(
    {
      auth: auth,
      calendarId: "wizardsweb42@gmail.com",
      eventId: evId,
    },
    (err, res) => {
      if (err) return console.log(err);
      if (res) {
        console.log("Event deleted!");
      }
    }
  );
}

function revokeToken() {
  axios
    .post(
      `https://accounts.google.com/o/oauth2/revoke?token=${client_token.access_token}`,
      {}
    )
    .then((res) => {
      console.log(
        "status: ",
        res.response.status,
        "response: ",
        res.response.statusText
      );
    })
    .catch((err) => {
      console.log("Access Token error: ", err.response.data);
    });

  axios
    .post(
      `https://accounts.google.com/o/oauth2/revoke?token=${client_token.refresh_token}`,
      {}
    )
    .then((res) => {
      console.log(
        "status: ",
        res.response.status,
        "response: ",
        res.response.statusText
      );
    })
    .catch((err) => {
      console.log("Refresh Token error: ", err.response.data);
    });
}

module.exports = router;
