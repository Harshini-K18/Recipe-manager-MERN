# Recipe Manager MERN

A simple full-stack Recipe Manager app built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Add, edit, and delete recipes
- Search recipes by title, ingredients, or instructions
- Responsive and modern UI
- Stores data in MongoDB

## Folder Structure

```
Recipe-manager-MERN/
├── backend/
│   ├── server.js
│   └── ... (other backend files)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── RecipeList.js
│   │   ├── App.js
│   │   └── App.css
│   └── ... (other frontend files)
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB)
- postman

---

### 1. Clone the repository

```sh
git clone https://github.com/Harshini-K18/Recipe-manager-MERN.git
cd Recipe-manager-MERN
```

---

### 2. Backend Setup

```sh
cd backend
npm install
```

- Update your MongoDB connection string in `server.js` if needed.

```sh
node server.js
```
The backend will run on [http://localhost:5000](http://localhost:5000).

---

### 3. Frontend Setup

```sh
cd ../frontend
npm install
npm start
```
The frontend will run on [http://localhost:3000](http://localhost:3000).

---

