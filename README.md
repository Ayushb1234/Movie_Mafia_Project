# CineRate

Movie catalog with user reviews and ratings.

## Run locally

1. Install MongoDB locally or create a MongoDB Atlas database. Copy `.env.example` to `server/.env` and set `MONGO_URI` and a long random `JWT_SECRET`.
2. In `server/.env`, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` to the credentials you want for the movie catalog administrator (password must be at least 12 characters).
3. Install dependencies with `npm install --prefix server` and `npm install --prefix client`.
4. Start the API with `npm run server` from this folder. On the first run, the API adds six starter movies to an empty database.
5. Start the website in another terminal with `npm run client`, then open `http://localhost:5173`.
6. Create the administrator account with `npm run create-admin --prefix server`, then sign in using the configured email and password.

The administrator can add, edit, and delete movies from the Admin Dashboard. Anyone can browse movies; signed-in users can post one review per movie, including a 1–5 star rating and comment. Register a normal user account from the website to review movies.

To point the client at a non-local API, set `VITE_API_URL` in `client/.env` (for example, `https://your-api.example/api`).
