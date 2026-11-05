# Eventora – Event Management Website

A responsive website where users can explore upcoming events, read details, and register with a validated form.

**Live demo:** _add your deployed link here_
**Repository:** _add your GitHub link here_

## Features
- Hero section with a live countdown to the next event
- Event cards (name, date, venue, description, category)
- Search by keyword and filter by category
- Event details popup with a registration form (name, email, phone, event)
- JavaScript validation with clear error messages and a confirmation screen
- Registrations saved in Local Storage, with a "My registrations" list and cancel option
- Dark / light mode (remembers your choice)
- Responsive on mobile, tablet and desktop; keyboard friendly and respects reduced motion

## Tech stack
HTML5, CSS3 (variables, grid, flexbox), vanilla JavaScript. No frameworks.

## Project structure

index.html   page structure
style.css    styling, themes, responsive rules
script.js    event data, search/filter, countdown, validation, Local Storage


## How it works
- `EVENTS` array in `script.js` holds all events. Add or edit objects there to change the site.
- `render()` draws the cards using the current search text and category.
- `check()` and `submit()` validate the form: name (letters, 3+), email pattern, 10-digit Indian mobile number, and block duplicate registrations.
- Registrations and theme are stored with `localStorage`.

## Run locally
Open `index.html` in a browser, or use the VS Code "Live Server" extension.

## Deployment
Deployed with GitHub Pages / Netlify / Vercel (static site, no build step).

## Future improvements
Real images per event, a backend for emails, an admin page to add events.