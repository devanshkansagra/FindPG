# FindPG : Find Your Perfect Hostel or PG Nearby!
A modern platform that helps students and working professionals quickly discover nearby hostels and PG accommodations. Users can search, filter, and compare PGs based on location, price, and amenities. Built with React and styled with Tailwind CSS for a responsive and elegant UI.


## 📜 Features

### Authentication and Authorization:

- Secure login and signup using JWT authentication and Bcrypt.js for password hashing.
- Two roles: Tenant and Agent.

### Tenant Functionality:

- Search PGs/Hostels by location, budget, and amenities.
- Apply filters (e.g., price range, single/double occupancy, food included).
- Save favorite PGs for quick access.
- Book visits or contact property owners directly.
- Update profile details.

### Agent Functionality:

- Add, update, or remove PG listings.
- Upload images, set rent, facilities, and availability.
- Manage tenant requests and inquiries.
- Track occupancy and bookings.

### General Features:

- Mobile-friendly responsive design.
- Interactive maps integration for nearby PG search.
- Secure profile management for both tenants and agents.

## 🛠️ Tech Stack

### Client:

- React
- Zustand
- Tailwind CSS
- Socket.io

### Server:

- Node.js
- Express
- Socket.io

### Database & Storage:

- MongoDB
- AWS S3 Bucket

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devanshkansagra/FindPG.git
   ```

2. Go to backend and run 
    ```bash
    cd backend
    npm install
    ```

3. Go to frontend and run
    ```bash
    cd frontend
    npm install
    ```

4. Setup .env file 
    - Backend
    ```bash
    ORIGIN=http://localhost:5173 # (or your frontend deployment url)
    SERVER=http://localhost:4000 # (or your backend deployment url)
    MONGDB_URI="mongodb://localhost:27017/FindPG"  # (or MongDB Atlas URL)
    ACCESS_TOKEN_SECRET=3f8d1c7e-9b2a-4e6e-8c1a-7a5e2d4b9c3f #(Recommended to generate random)
    ACCESS_TOKEN_EXPIRY=3599s
    REFRESH_TOKEN_SECRET=68ceaf35-3cd8-8321-b6b3-9572e0df983f #(Recommended to generate random)
    REFRESH_TOKEN_EXPIRY=7d
    AWS_BUCKET_NAME=
    AWS_BUCKET_REGION=
    AWS_ACCESS_KEY=
    AWS_SECRET_ACCESS_KEY=
    GMAIL_USER=
    GMAIL_APP_PASSWORD=
    ```

    - Frontend
     ```bash
        VITE_SERVER_ORIGIN=http://localhost:4000
    ```

5. To Run Project
    ```bash
    cd frontend
    npm start run 

    cd backend
    npm run dev
    ```