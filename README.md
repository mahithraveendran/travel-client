Live Site Link: [https://dream-destination-travel.vercel.app/](https://dream-destination-travel.vercel.app/)

# Dream destination

Travel Buddy is a web application designed to connect travelers seeking companionship for their trips. Users can share their travel plans, search for trips, and find like-minded individuals to join them, fostering a community of travelers who can explore the world together.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)

## Overview

Travel Buddy is designed to make travel more enjoyable and safe by connecting travelers. The platform allows users to:
- Share their travel plans.
- Search for trips based on destination, travel dates, and travel type.
- View detailed trip information and request to join trips.
- Manage their profile, travel requests, and posts.
- Admins can manage users and travel posts.

## Features

- **Home Page/Landing Page**
  - Logo, navigation bar, hero section with catchy headline.
  - Search bar for trips.
  - Recent travel posts and additional sections like featured destinations and travel tips.
  - Footer with contact information and additional links.

- **Login & Registration**
  - Secure forms for user login and registration.

- **Post a Travel/Trip**
  - Private page for posting travel plans with fields for destination, description, travel dates, and type, along with photo uploads.

- **Travels Page**
  - Search and filter travel posts with detailed trip information.

- **Travel Details Page**
  - Detailed trip information with multiple photos, description, itinerary, and travel request button.

- **Travel Request Page**
  - Private page for submitting travel requests.

- **My Profile**
  - User account management with sections for travel request history and travel posts.

- **Admin Dashboard**
  - User and trip management for administrators.

- **Change Password Page**
  - Secure form for changing the user's password.

- **About Us**
  - Information about the website's mission, team, and contact details.

## Prerequisites

- Node.js installed on your machine
- yarn installed on your machine

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/getMonirr/Dream-Destinations.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Dream-Destinations
   ```

3. **Install dependencies:**

   ```bash
   yarn install
   ```

4. **Create a .env file in the root directory and add the following:**

   ```bash
   NEXT_PUBLIC_API_URL=<https://server-dream-destinations.vercel.app/api>
   NEXT_PUBLIC_IMG_KEY=<Put your imgbb API key>
   ```

   Replace "Put your imgbb API key" with the connection URI for your PostgreSQL database.

## Running-the-Application

1. **Just hit this command to build the project**

   ```bash
   yarn build
   ```

2. **Run the project in dev mode**

   ```bash
   yarn dev
   ```

   The application will be running at http://localhost:3000.



