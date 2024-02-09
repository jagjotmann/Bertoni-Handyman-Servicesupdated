/** Creates a focus time event. */
function createFocusTime() {
  const event = {
    start: { dateTime: "2023-11-14T10:00:00+01:00" },
    end: { dateTime: "2023-11-14T12:00:00+01:00" },
    eventType: "focusTime",
    focusTimeProperties: {
      chatStatus: "doNotDisturb",
      autoDeclineMode: "declineOnlyNewConflictingInvitations",
      declineMessage: "Declined because I am in focus time.",
    },
  };
  createEvent(event);
}

/** Creates an out of office event. */
function createOutOfOffice() {
  const event = {
    start: { dateTime: "2023-11-15T10:00:00+01:00" },
    end: { dateTime: "2023-11-15T18:00:00+01:00" },
    eventType: "outOfOffice",
    outOfOfficeProperties: {
      autoDeclineMode: "declineOnlyNewConflictingInvitations",
      declineMessage: "Declined because I am on vacation.",
    },
  };
  createEvent(event);
}

/** Creates a working location event. */
function createWorkingLocation() {
  const event = {
    start: { date: "2023-06-01" },
    end: { date: "2023-06-02" },
    eventType: "workingLocation",
    visibility: "public",
    transparency: "transparent",
    workingLocationProperties: {
      type: "customLocation",
      customLocation: { label: "a custom location" },
    },
  };
  createEvent(event);
}

/**
 * Creates a Calendar event.
 * See https://developers.google.com/calendar/api/v3/reference/events/insert
 */
function createEvent(event) {
  const calendarId = "primary";

  try {
    var response = Calendar.Events.insert(event, calendarId);
    var event =
      response.eventType === "workingLocation"
        ? parseWorkingLocation(response)
        : response;
    console.log(event);
  } catch (exception) {
    console.log(exception.message);
  }
}

/**
 * Reads the event with the given eventId.
 * See https://developers.google.com/calendar/api/v3/reference/events/get
 */
function readEvent() {
  const calendarId = "primary";

  // Replace with a valid eventId.
  const eventId = "sample-event-id";

  try {
    var response = Calendar.Events.get(calendarId, eventId);
    var event =
      response.eventType === "workingLocation"
        ? parseWorkingLocation(response)
        : response;
    console.log(event);
  } catch (exception) {
    console.log(exception.message);
  }
}

/** Lists focus time events. */
function listFocusTimes() {
  listEvents("focusTime");
}

/** Lists out of office events. */
function listOutOfOffices() {
  listEvents("outOfOffice");
}

/** Lists working location events. */
function listWorkingLocations() {
  listEvents("workingLocation");
}

/**
 * Lists events with the given event type.
 * See https://developers.google.com/calendar/api/v3/reference/events/list
 */
function listEvents(eventType = "default") {
  const calendarId = "primary";

  // Query parameters for the list request.
  const optionalArgs = {
    eventTypes: [eventType],
    showDeleted: false,
    singleEvents: true,
    timeMax: "2023-04-01T00:00:00+01:00",
    timeMin: "2023-03-27T00:00:00+01:00",
  };
  try {
    var response = Calendar.Events.list(calendarId, optionalArgs);
    response.items.forEach((event) =>
      console.log(
        eventType === "workingLocation" ? parseWorkingLocation(event) : event
      )
    );
  } catch (exception) {
    console.log(exception.message);
  }
}

/**
 * Parses working location properties of an event into a string.
 * See https://developers.google.com/calendar/api/v3/reference/events#resource
 */
function parseWorkingLocation(event) {
  if (event.eventType != "workingLocation") {
    throw new Error("'" + event.summary + "' is not a working location event.");
  }

  var location = "No Location";
  const workingLocation = event.workingLocationProperties;
  if (workingLocation) {
    if (workingLocation.type === "homeOffice") {
      location = "Home";
    }
    if (workingLocation.type === "officeLocation") {
      location = workingLocation.officeLocation.label;
    }
    if (workingLocation.type === "customLocation") {
      location = workingLocation.customLocation.label;
    }
  }
  return `${event.start.date}: ${location}`;
}
