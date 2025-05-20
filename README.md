# Footvolley Event Planner – Frontend

This is the frontend interface for the Footvolley Event Planner platform. 
It enables different types of users—admins, club managers, and the public—to 
interact with the system for planning, managing, and viewing footvolley events.

## Overview

The frontend is built using standard web technologies (HTML, CSS, JavaScript) 
and communicates with a Spring Boot backend to deliver a dynamic experience for managing leagues, 
tournaments, clubs, teams, and match data.

## User Roles and Capabilities

### 👤 Admin
- Create new **Leagues** (a season with multiple tournaments)
- Create, update, and delete **Tournaments**
- Create login credentials for **Clubs**

### 🏠 Club Manager (Authenticated Club User)
- Update **club profile** (location, details, etc.)
- Register **teams** under their club
- Add **players** to teams
- Register to **participate in** or **host** tournaments

### 🌐 Public User (Unauthenticated Visitor)
- View list of **upcoming tournaments**
- View **host club information**
- See **match plans**, **results**, and **rankings**
- View detailed stats for both **individual tournaments** and **leagues**

## Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)

## Running Locally

This frontend does not require a build process. You can run it directly in your browser or use a 
local server for development convenience.

### Option 1: Direct Browser Access

1. Open `index.html` in your preferred browser

### Option 2: Use a local server (recommended for API calls)

```bash
npx live-server
