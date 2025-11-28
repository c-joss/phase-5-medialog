# MediaLog — Personal Media Tracker

A full-stack web application for organising books, games, films, music, and other personal media.
Built with Flask, React, PostgreSQL, and deployed on Render, MediaLog lets users create an account, manage their own items and categories, assign creators and tags, write reviews, and export their entire library as a downloadable CSV or emailed attachment.

This project was developed for the Phase 5 Full-Stack Assessment.

---

## Overview

MediaLog is designed to replace scattered notes and spreadsheets with one clean and organised interface for tracking all personal media. Each user maintains their own private library, with the ability to add detailed metadata using categories, tags, and creators.

The project emphasises clean structure, practical functionality, accurate database relationships, and strong separation between backend and frontend.

---

## Features

### User Accounts

- User signup & login (hashed passwords)
- Auth state stored in React Context
- Protected routes with custom `<ProtectedRoute />`

### Item Management

- Create, update, delete items
- Optional image URL
- View item details, including creators, tags, and reviews (from `ItemDetailPage.jsx`)

### Categories, Tags & Creators

- User-specific categories (unique per user)
- Tag management page (`ManageTagsPage.jsx`)
- Creator management page (`ManageCreatorsPage.jsx`)
- Many-to-many relationships handled via join tables

### Item Search

- Keyword search implemented directly on `ItemsPage.jsx`

### CSV Export

- Uses Python `csv` to generate a user-specific file
- Download via `/export/items?user_id=`
- Email export available via POST request

### Email Export (Mailtrap API)

Originally implemented with SMTP, but Render free tier blocks SMTP ports, resulting in 502 errors.
Now uses Mailtrap Email API (HTTPS) — handled in a background thread for non-blocking UI.

### Responsive UI & Clean Layout

- Custom CSS (`index.css`)
- Consistent spacing, grids, cards, and forms
- Mobile-friendly layout

---

## Tech Stack

### Frontend

- React (Vite)
- React Router
- React Context (Auth)
- Custom CSS
- Fetch wrappers via `apiclient.js` (centralised base URL & error handling)

### Backend

- Flask
- SQLAlchemy ORM
- PostgreSQL
- Marshmallow / Marshmallow-SQLAlchemy
- Flask-Migrate
- Flask-CORS
- Mailtrap Email API (sandbox)
- Python’s built-in threading for background work

### Deployment

- Render (Static Site for frontend, Python Web Service for backend)
- Auto migrations via start command
- Python 3.11 (via runtime.txt)

---

## Architecture

```text
root/
│
├── client/            # React frontend
│   ├── pages/         # Page components
│   ├── components/    # NavBar, Layout, ProtectedRoute
│   ├── context/       # AuthContext
│   ├── apiclient.js   # API wrapper
│   └── ...
│
├── server/            # Flask backend
│   ├── app.py         # Routes, email export, threading
│   ├── models.py      # SQLAlchemy models
│   ├── config.py      # Env config
│   ├── seed.py        # Seed data
│   ├── migrations/    # Alembic
│   └── ...
│
├── docs/              # ERD, wireframes, proposal
├── requirements.txt
├── runtime.txt
└── README.md
```

---

## Frontend Structure

### Entry Point

- `main.jsx` mounts the app and wraps it with AuthProvider.

### Layout System

- `Layout.jsx` renders the global layout including navbar.
- `NavBar.jsx` includes user links + conditional rendering depending on auth.

### Routing

- App routes defined in `App.jsx`
- Protected routes enforced with `ProtectedRoute.jsx`.

### Pages

- `LoginPage.jsx` / `SignUpPage.jsx` — user auth
- `ItemsPage.jsx` — list + search
- `CreateItemPage.jsx` — add item
- `ItemDetailPage.jsx` — display/edit creators/tags/reviews
- `DashboardPage.jsx` — overview
- `ManageTagsPage.jsx` — CRUD tags
- `ManageCreatorsPage.jsx` — CRUD creators
- `ManageCategoriesPage.jsx` — CRUD categories
- `ExportPage.jsx` — CSV export + email export
- `SettingsPage.jsx` — profile + export
- `NotFoundPage.jsx` — fallback (404)

---

## Backend Structure

`server/app.py` contains:

### Routing

- Authentication
- Items, categories, tags, creators
- Reviews
- CSV export
- Email export (Mailtrap API)

### CSV Export

1. Query user items
2. Write rows via `csv.writer`
3. Return `text/csv` file to client OR hand off to email worker

### Email Export

- Runs inside a background thread
- Mailtrap API client attaches CSV as base64
- Uses:

```python
MAILTRAP_API_TOKEN
MAILTRAP_INBOX_ID
```

- Entire process is safe for Render free tier
- SMTP support removed due to blocked ports

---

## Database Models

Located in `server/models.py`.

### User

- id, username, email, password_hash
- Relationships: items, categories, reviews

### Item

- title, image_url, category_id
- Relationships: tags (many-to-many), creators (many-to-many), reviews (one-to-many)

### Category

- Name unique per user

### Tag

- Global list of tags, many-to-many with items

### Creator

- Also global, many-to-many with items

### Review

- rating (1–5), comment
- User + Item foreign keys

---

## CSV Export & Email Flow

### 1. User clicks "Export"

Frontend sends GET or POST to:

```
/export/items
/export/items/email
```

### 2. Backend Builds CSV

- Using Python's built-in `csv` module
- Gather item list filtered by user ID
- Write into in-memory stream

### 3. Email Export (Background)

- Spawn a thread:

```python
threading.Thread(...).start()
```

- Use Mailtrap Email API
- Create email with CSV attachment (base64)

### 4. Mailtrap Sandbox

- Export appears in inbox for review

---

## Deployment (Render)

### Backend (Python Web Service)

#### Build Command

```bash
pip install -r requirements.txt
```

#### Start Command

```
FLASK_APP=server.app flask db upgrade && gunicorn "server.app:create_app()"
```

#### Python Runtime

`runtime.txt` contains:

```
python-3.11.6
```

_Notes_

- Render free tier blocks SMTP → use Mailtrap API
- Must include gunicorn in requirements.txt
- DB migrations applied automatically

---

## Environment Variables

| Variable             | Purpose                      |
| -------------------- | ---------------------------- |
| `DATABASE_URL`       | Render PostgreSQL connection |
| `MAILTRAP_API_TOKEN` | Mailtrap API auth token      |
| `MAILTRAP_INBOX_ID`  | ID of Mailtrap inbox         |
| `MAIL_FROM`          | Displayed email sender       |
| `FRONTEND_URL`       | For CORS (optional)          |

---

## Documentation & Visuals

Included in the `/docs` folder:

- ERD (Excel)
- Wireframes (PDF)
- Database diagram (draw.io PDF)
- Original proposal

---

## Future Improvements

- File/image uploads
- Tag/creator search
- Sorting + filtering
- Pagination
- Dark mode
- PDF export
- Improved UI styling consistency
- Implement reviews and rating display/editing on the frontend

---

## Conclusion

MediaLog demonstrates a complete end-to-end architecture:

- Database design
- API creation
- React frontend
- Authentication
- CSV export
- Background email processing
- Render deployment
- Third-party API integration

Overcoming Render’s SMTP limitations and transitioning to Mailtrap’s Email API was a key learning moment, reinforcing how production environments differ from local development.

This project gave me the chance to practise full-stack concepts and work through challenges in both the build and deployment stages.
