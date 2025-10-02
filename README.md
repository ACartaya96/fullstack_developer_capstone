# Fullstack Developer Capstone

### Warning: The live deploy is on a free tier of render.com and may have spun down do to inactivity. Visting the website during this time would require the site to "spin-up" again. Which will result to a 50-seconds or more wait upon REQUEST.

[![Visit Live Site](https://img.shields.io/badge/Visit-Live%20Site-blue?style=for-the-badge)](https://your-app-name.onrender.com)

## How to Run This Project Locally

This project includes both a React frontend and a Django backend.

---

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v8+ recommended)
- **Python** (v3.8+ recommended)
- **pip**
- **MongoDB** (for backend database)
- (Optional) **Docker** if you want to use containerization

---

### 1. Clone the Repository

```bash
git clone https://github.com/ACartaya96/fullstack_developer_capstone.git
cd fullstack_developer_capstone
```

---

### 2. Run the Frontend

```bash
cd server/frontend
npm install
npm start
```

- The app will start on [http://localhost:3000](http://localhost:3000) by default.

---

### 3. Run the Backend

#### Install Python Dependencies

```bash
cd ../
pip install -r requirements.txt
```

#### Set Up MongoDB

- Ensure MongoDB is running locally on its default port (27017).
- Optionally, update database configuration inside the backend code if needed.

#### Start the Django Backend

```bash
cd djangoproj
python ../manage.py runserver
```

- The backend will start on [http://localhost:8000](http://localhost:8000) by default.

---

### 4. Run the Express/MongoDB Service (if needed)

If you need to run the additional Express database service:

```bash
cd ../database
npm install
npm start
```

---

### 5. (Optional) Using Docker

You can use Docker to run the backend:

```bash
cd server
docker build -t capstone-backend .
docker run -p 8000:8000 capstone-backend
```

---

### 6. Environment Variables

- Add any necessary environment variables in a `.env` file (check for `.env.example` or backend/frontend docs for details).

---

### 7. Access the App

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend (API): [http://localhost:8000](http://localhost:8000)

---

## Troubleshooting

- Make sure ports 3000 (frontend), 8000 (backend), and 27017 (MongoDB) are available.
- If you encounter dependency issues, ensure your Node, npm, and Python versions match those listed above.

---

## License

See [LICENSE](LICENSE) for details.
