# CampusLeave — Student Leave Management Portal

A clean, multi-page college leave portal built with HTML, CSS, and vanilla JavaScript. This baseline version contains no intentionally introduced debugging bugs.

## Run locally
1. Extract `CampusLeave.zip`.
2. Open the `CampusLeave` folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Sign in using any non-empty Student ID and password. This is a front-end demo only; it does not use real authentication or save data to a server.

## Pages and their stylesheets
- `index.html` → `css/login.css`
- `dashboard.html` → `css/dashboard.css`
- `apply-leave.html` → `css/apply-leave.css`
- `leave-history.html` → `css/leave-history.css`
- `profile.html` → `css/profile.css`
- `notices.html` → `css/notices.css`

Each page CSS file now contains actual page-specific styling. `css/base.css` contains only shared foundations, reusable controls, the sidebar/top bar, common cards/tables, and responsive shell styles.

## JavaScript
`js/script.js` handles the demo interactions. JavaScript is not intended to be part of the debugging competition.

## Notes
This is a demonstration UI. Submitting a leave application displays a success message but does not persist a real request. Profile edits are also local to the current page session.
