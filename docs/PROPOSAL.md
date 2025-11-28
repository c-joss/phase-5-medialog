# Phase 5 Project Proposal — **MediaLog: Personal Collection Tracker**

## 1. Introduction

**Overview:**  
MediaLog is a full-stack web application that allows users to organise and manage their personal collections — such as books, movies, games, or music — in one elegant interface.

**Problem:**  
People who enjoy tracking collections often rely on spreadsheets or simple note-taking apps, which don’t provide visual appeal, categorisation, or efficient data management. These methods make it difficult to browse, rearrange, or share collections easily.

**Proposed Solution:**  
MediaLog replaces the need for scattered manual tracking systems with a sleek, interactive platform. Users can create collection entries, assign categories and tags, add reviews and personal ratings, visually rearrange their gallery using drag-and-drop, and export the entire collection to Excel for backup or sharing.

**Benefits:**

- **Centralised Collection Management:** Keeps all hobbies in one place with images, ratings, and categories.
- **Enhanced User Interaction:** Allows drag-and-drop reordering and Excel exporting for advanced usability.
- **Visual Appeal:** Offers a clean, professional interface with smooth animations for a modern user experience.

---

## 2. Issue / Background

**Who it affects:**  
Individuals who want a better way to manage personal collections.

**Current limitations:**

- Manual tools like spreadsheets lack tagging, filtering, and visual sorting.
- Difficult to rearrange or browse items intuitively.
- No built-in export feature for data portability.

**Why it matters:**  
MediaLog addresses these gaps while demonstrating advanced technical skills through structured data modeling, React routing, API handling, and modern UI interactivity.

---

## 3. Proposed Solution

### Backend — Flask + SQLAlchemy

**Models**
| Model | Purpose | Key Fields / Notes |
|---------------|-------------------------------------------|--------------------|
| `User` | Stores user accounts and item ownership | `id`, `username`, `first_name`, `last_name`, `email`, `password` |
| `Category` | Groups items by type | `id`, `name` |
| `Tag` | Flexible item labels | `id`, `name` |
| `Creator` | Stores item creators (authors, studios) | `id`, `name` |
| `Item` | Represents a media entry added by a user | `id`, `title`, `image_url`, `user_id (FK)`, `category_id (FK)` |
| `Review` | Stores user reviews for items | `id`, `rating`, `text`, `user_id (FK)`, `item_id (FK)` |
| `item_tags` | Join table for Item ↔ Tag (many-to-many) | `id`, `item_id`, `tag_id` (unique pair) |
| `item_creators` | Join table for Item ↔ Creator (many-to-many) | `id`, `item_id`, `creator_id` (unique pair) |

**Key Features**

- CRUD for `Item` (Create, Read, Update, Delete).
- Validations: required `title`, `category_id`, `rating` between 1–5.
- Error handling for invalid data and missing records.
- Excel export endpoint using **Pandas**.

---

### Frontend — React

**Routes**

1. `/` – Dashboard
2. `/login` – Login page
3. `/items` – All items (collection list)
4. `/items/:id` – Item detail (tags, creators, reviews)
5. `/items/new` – Create item form
6. `/settings` – Settings menu
7. `/settings/export` – Export options page
8. `/settings/tags` – Manage tags
9. `/settings/categories` – Manage categories
10. `/settings/creators` – Manage creators
11. `*` – Not Found

**Key Features**

- `Interactive Collection Management`: Users can create, edit, delete, and organise collection items by category and tags.
- `Drag & Drop Reordering`: Built with dnd-kit, allowing users to visually rearrange their collection cards.
- `Export to Excel`: Backend functionality built with Pandas generates downloadable `.xlsx` files for data backup or sharing.
- `Personal Reviews & Ratings`: Optional section for users to add personal impressions or ratings for each item.
- `Clean & Consistent UI Design`: A minimalist, responsive layout across all pages ensures a smooth user experience.

---

### Libraries & Tools

| Purpose                | Library / Tool                | Description                                                                            |
| ---------------------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| **Frontend Framework** | **React**                     | Core UI library for building the client interface.                                     |
| **Routing**            | **React Router**              | Manages navigation between pages (Home, Items, Add, Profile).                          |
| **State Management**   | **useContext (React Hook)**   | Handles global state for current user and collection data.                             |
| **Drag & Drop**        | **dnd-kit**                   | Modern React-first drag-and-drop toolkit for intuitive and accessible item reordering. |
| **Backend Framework**  | **Flask**                     | Python web framework for API routes and server logic.                                  |
| **ORM / Database**     | **SQLAlchemy**                | Manages relational data models and database connections.                               |
| **Data Export**        | **Pandas**                    | Generates downloadable Excel (.xlsx) files of the user’s collection.                   |
| **Styling**            | **Tailwind CSS / Custom CSS** | Ensures a minimalist, professional, and fully responsive design.                       |

---

## 4. Experience / Qualifications

**Developer:** _Courtney Macgregor_

- 13 years in shipping and logistics; currently transitioning to software engineering.
- Completed coursework covering Flask, React, and SQLAlchemy, with practical experience deploying projects using Render.

---

## 6. Costs & Benefits

| Type         | Details                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Costs**    | Free open-source tools; hosting via Render (no additional expenses).                                                      |
| **Benefits** | Showcases full-stack proficiency with enhanced functionality that reflects real-world, professional application behavior. |

---

## 8. How **MediaLog** Meets Phase 5 Project Requirements

| Requirement                           | Implementation                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| **Flask + SQLAlchemy backend**        | Flask handles API routes and database logic using SQLAlchemy ORM.               |
| **4+ Models**                         | `User`, `Item`, `Category`, `Tag`, and `item_tags` join table.                  |
| **Many-to-Many Relationship**         | Implemented between `Item` and `Tag` through `item_tags`.                       |
| **Full CRUD on one model**            | Full create, read, update, delete operations on `Item`.                         |
| **Validations & Error Handling**      | Title, category, and rating validations; backend returns clear error messages.  |
| **5+ Client-side Routes**             | Home, Items, Item Detail, Add/Edit Item, Profile.                               |
| **useContext or Redux**               | useContext manages global state for user and collection data.                   |
| **Something New (beyond curriculum)** | 1) Drag-and-drop interface using dnd-kit. 2) Excel export feature using Pandas. |
| **Professional Design**               | Clean UI, responsive layout.                                                    |

---

## 7. Documentation

- **ERD (PDF):**  
  [medialog.drawio (1).pdf](<./medialog.drawio%20(1).pdf>)

- **Wireframes (PDF):**  
  [Medialog Wireframes.pdf](./Medialog%20Wireframes.pdf)

- **Normalization Worksheet (Excel):**  
  [Medialog Normalisation.xlsx](./Medialog%20Normalisation.xlsx)

  ***

## 8. Conclusion

MediaLog is a complete and well-structured project that meets all Phase 5 requirements. It blends essential functionality (CRUD, validations, relationships) with modern UX elements such as drag-and-drop and export features to create a smooth and refined user experience.
