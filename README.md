<p align="center"><img src="BHS%20Logo.png" style="width: 400px" alt="Bertoni Handyman Services Logo"/></p>
<p align="center"><em>A web application for a construction contractor business that includes quote, job, and employee management.
</em></p>

<br/>

<p align="center">
  <img src="homepage-mockup.png" style="width: 300px"/>
  <img src="admin-mockup.png" style="width: 300px"/>
</p>

<br/>

## Project Synopsis

Bertoni Handyman Services specializes in a range of home repair and improvement projects. This project involves the development of a comprehensive website that serves as a platform for clients to request quotes and schedule appointments, and for admins to manage these requests efficiently.

## Table of Contents

1. [Project Synopsis](#project-synopsis)
2. [Software Requirements](#software-requirements)
3. [Features and User Guide](#features-and-user-guide)
   - [Frontend](#frontend)
   - [Admin Portal](#admin-portal)
   - [Quote From Scratch](#quote-from-scratch)
4. [Database Structure](#database-structure)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Developer Instructions](#developer-instructions)
8. [Timeline and Milestones](#timeline-and-milestones)
9. [Contact Information](#contact-information)

## Features and User Guide

### Frontend

- General information about the company
- Vouchers and reviews section
- Quote Request functionality

<p style="display:flex; flex-direction: column;">
    <img width="50%" src="general_info.png" alt="apis"/>
&nbsp;
</p>

![Animated Gif](GAQ.gif)

Mobile Application View

![Animated Gif](Mobile.gif)

### Admin Portal

- Management of quote requests and user data
- Quote builder tool
- Chat functionality for client interactions

<p style="display:flex; flex-direction: column;">
    <img width="70%" src="manage_quotes.png" alt="apis"/>
&nbsp;
    <img width="70%" src="build_quote.png" alt="data-models"/>
</p>

### Quote From Scratch

- Process for submitting quote requests
- User chat page for detailed discussion
- Steps following the submission of a request

## Database Structure

- Description of database objects: `JobRequest`, `Quote`, `User`, `Chat`
- ![ERD and other diagrams](path/to/diagrams)

## Testing

- Outline of testing strategies and methodologies

## Deployment

These steps outline how to deploy the Bertoni Handyman Services application to a production environment. Before deploying, make sure you have completed the necessary setup and configuration, including setting up your MongoDB database, configuring environment variables, and ensuring all dependencies are installed.

### Prerequisites

Before deploying the application, ensure you have the following prerequisites:

- Node.js (v21.1.0) and npm (10.2.0) installed on your production server.
- A MongoDB database instance set up and accessible from your production environment.
- Properly configured environment variables (e.g., database connection details) in your `.env` file.
- A domain or server where you intend to host your application.

### Deployment Steps

Follow these steps to deploy the application:

1.  **Clone the Repository**:

    Use the following command to clone the project repository to your production server:

```
git clone https://github.com/seanthecod3r/Bertoni-Handyman-Services
```

2. **Frontend Deployment**:

   Navigate to the project directory and then to the frontend directory:

   ```
   cd Bertoni-Handyman-Services
   cd Frontend/bertoni-handyman-services/
   ```

   Install frontend dependencies:

   ```
    npm install
   ```

   Build the frontend for production:

   ```
   npm run build
   ```

3. **Backend Deployment**:

   Navigate to the project directory and then to the backend directory:

   ```
   cd Bertoni-Handyman-Services
   cd Backend/
   ```

   Install backend dependencies:

   ```
   npm install
   ```

4. **Start the Application**:

   Start the backend server:

   ```
   node server.js
   ```

It will typically run on http://localhost:3001.

## Developer Instructions

- Guidelines for developers contributing to the project

  ### Tech Stack used: MERN (MongoDB, Express.js, React.js, Node.js)

  **Client:** React, Redux

  **Server:** Node.js, Express.js

  **Database:** MongoDB

  ***

  ### Setting Up the Project Locally

  1.  **Clone the Repository**:

      Use this command to clone the project repository to your local machine.

      ```
      git clone https://github.com/seanthecod3r/Bertoni-Handyman-Services
      ```

  2.  **Install Node.js and npm**:
      - This project requires Node.js version `[specify version, e.g., 14.x]` and npm version `[specify version, e.g., 6.x]`.
      - Download and install them from [Node.js official website](https://nodejs.org/).

  #### Frontend

  - To run Frontend server, follow these steps:

    - Navigate to the project directory, then to the frontend directory:
      ```
      cd Bertoni-Handyman-Services
      cd Frontend/bertoni-handyman-services/
      ```
    - Install dependencies:

      ```
      npm install
      ```

    - Start the development server:
      ```
      npm run start
      ```
    - It will typically run on `http://localhost:3000`.

    ***

  #### Backend

  - To run Backend server, follow these steps:

    - Navigate to the project directory, then to the Backend directory:
      ```
      cd Bertoni-Handyman-Services
      cd Backend/
      ```
    - Install dependencies:

      ```
      npm install
      ```

    - Start the development server:
      ```
      node server.js
      ```
    - It will typically run on `http://localhost:3001`.

    ***

    ### Additional Notes

    - **Database Configuration**: Ensure that your MongoDB database is set up and running, and the connection details are correctly specified in the `.env` file.

    - **Package Versions**: If there are specific package versions required, they should be listed in your `package.json` file. Make sure to commit this file to maintain consistency across different setups.

    - **Troubleshooting**: If you encounter any issues during setup or running the servers, check the console for errors and ensure all environment variables and dependencies are correctly configured.

  ***

## Timeline and Milestones
   **Milestone 1: User Authentication and Dashboard**
   - [ ] Implement user authentication for clients and employees.
   - [ ] Develop the dashboard interface.
   - [ ] Allow clients to log in and access their personalized dashboard.

   **Milestone 2: Quote Request Feature**
   - [ ] Enable clients to fill out job details for a quote.
   - [ ] Implement a request submission system.
   - [ ] Notify the admin when a quote request is submitted.

   **Milestone 3: Job and Employee Categorization**
   - [ ] Create a system for categorizing jobs.
   - [ ] Implement employee categorization.
   - [ ] Link employees to their respective job categories.
   
   **Milestone 4: Receipts and Job Completion**
   - [ ] Create a system for generating receipts upon job completion.
   - [ ] Allow clients to access and download receipts from their dashboard.
   - [ ] Ensure accuracy and security of receipt data.
         
   **Milestone 5: Email Communication Feature**
   - [ ] Integrate email functionality within the dashboard.
   - [ ] Enable clients to send and receive emails directly from the portal.
   - [ ] Ensure secure and efficient email communication.

   **Milestone 6: Scheduler Implementation**
   - [ ] Develop a scheduling system within the dashboard.
   - [ ] Allow clients to schedule jobs based on employee availability and job categories.
   - [ ] Ensure real-time updates for scheduling changes.

   **Milestone 7: Testing and Quality Assurance**
   - [ ] Conduct thorough testing of all features.
   - [ ] Identify and resolve any bugs or issues.
   - [ ] Perform usability testing to ensure a user-friendly experience.

   **Milestone 8: Deployment and Production**
   - [ ] Prepare the application for production deployment.
   - [ ] Deploy the construction website and admin portal to a live server.
   - [ ] Set up monitoring and error tracking for ongoing maintenance.

## Contact Information

- Sean Bertoni: bertoni.sean@gmail.com | (916)-508-1742

## Contributors

[//]: contributor-faces

<a href="https://github.com/seanthecod3r">
<img src="https://avatars.githubusercontent.com/u/74293781?s=64&amp;v=4" alt="@seanthecod3r" width="50" height="50">
</a>
<a href="https://github.com/ahmedaosman-hub" class="" data-hovercard-type="user" data-hovercard-url="/users/ahmedaosman-hub/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self">
  <img src="https://avatars.githubusercontent.com/u/55333039?s=64&amp;v=4" alt="@ahmedaosman-hub" width="50" height="50">
</a>
<a href="https://github.com/Lofty1971" class="" data-hovercard-type="user" data-hovercard-url="/users/Lofty1971/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self">
  <img src="https://avatars.githubusercontent.com/u/38510472?s=64&amp;v=4" alt="@Lofty1971" width="50" height="50">
</a>
<a href="https://github.com/alexfedy" class="" data-hovercard-type="user" data-hovercard-url="/users/alexfedy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self">
  <img src="https://avatars.githubusercontent.com/u/73800011?s=64&amp;v=4" alt="@alexfedy" width="50" height="50">
</a>
<a href="https://github.com/Mayaar-Irshad" class="" data-hovercard-type="user" data-hovercard-url="/users/Mayaar-Irshad/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self">
  <img src="https://avatars.githubusercontent.com/u/105467566?s=64&amp;v=4" alt="@Mayaar-Irshad" width="50" height="50">
</a>
<a href="https://github.com/raheem6" class="" data-hovercard-type="user" data-hovercard-url="/users/raheem6/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self">
  <img src="https://avatars.githubusercontent.com/u/124087748?s=64&amp;v=4" alt="@raheem6" width="50" height="50">
</a>
<a href="https://github.com/mariellemcbride" class="" data-hovercard-type="user" data-hovercard-url="/users/mariellemcbride/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self">
  <img src="https://avatars.githubusercontent.com/u/27976091?s=64&amp;v=4" alt="@mariellemcbride" width="50" height="50">
</a>
<a href="https://github.com/jagjotmann" class="" data-hovercard-type="user" data-hovercard-url="/users/jagjotmann/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self">
  <img src="https://avatars.githubusercontent.com/u/148426416?s=64&amp;v=4" alt="@jagjotmann" width="50" height="50">
</a>

[//]: contributor-faces
