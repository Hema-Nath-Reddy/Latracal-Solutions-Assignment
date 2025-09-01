Movie Review Platform
This is a comprehensive full-stack application for a movie review platform. The application allows users to browse movies, view detailed information, read and submit reviews, and manage a personal watchlist. The project is built with a modern technology stack, focusing on performance, scalability, and clean code architecture.

Key Features:
User Authentication: Secure user sign-up and login with password hashing.

Dynamic Movie Listings: Fetches trending movies from TMDB and supports searching and filtering by genre, year, and rating.

Movie Details Page: Displays in-depth information for individual movies, including cast, reviews, and a trailer link.

Review Submission: Authenticated users can submit star ratings and text reviews, which are stored in a MongoDB database.

Watchlist Functionality: Users can add or remove movies from their personal watchlist. The watchlist is persisted in the database and is accessible from any device.

Centralized State Management: The application uses Redux Toolkit to manage global state, ensuring data consistency and a smooth user experience by minimizing redundant API calls.

Technology Stack
Frontend: React, React Router, Redux Toolkit, Tailwind CSS.

Backend: Node.js, Express.

Database: MongoDB.

External APIs: The Movie Database (TMDB) for movie information, posters, and cast. Cloudinary for secure user profile picture storage.

Setup and Installation
Follow these steps to get the project up and running on your local machine.

1. Clone the Repository
git clone https://github.com/Hema-Nath-Reddy/Latracal-Solutions-Assignment
cd your-repository-name

3. Backend Setup
Navigate to the server directory, install the dependencies, and start the server.

cd server
npm install
npm start

3. Frontend Setup
Open a new terminal window, navigate to the project's root directory, and install the frontend dependencies.

npm install
npm run dev
The application should now be running at http://localhost:5173.

Environment Variables
The application requires environment variables for both the backend and frontend to function correctly.

Backend 
Create a .env file in your server directory with the following variables:

MONGODB_URI=your_mongodb_connection_string
TMDB_KEY=your_tmdb_api_key
TMDB_ACCESS_TOKEN=your_tmdb_v4_access_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

API Documentation
The backend exposes a RESTful API to manage movies, reviews, and user data.

Movies
GET /movies: Retrieve a paginated and filtered list of movies from the TMDB API.

GET /movies/:id: Fetch details for a specific movie from the TMDB API.

GET /movies/cast/:id: Retrieve the cast for a specific movie from the TMDB API.

POST /movies/:id/reviews: Submit a new review for a movie (requires authentication).

GET /movie/:id/reviews: Get all user-submitted reviews for a specific movie.

Users & Watchlist
POST /signUp: Register a new user and upload a profile picture.

POST /logIn: Authenticate a user and create a session.

GET /users/:id: Retrieve a user's profile and review history.

GET /users/:id/watchlist: Get the list of movies in a user's watchlist.

POST /users/:id/watchlist: Add a movie to a user's watchlist (requires authentication).

DELETE /users/:id/watchlist/:movieId: Remove a movie from a user's watchlist (requires authentication).

Additional Notes and Design Decisions
Frontend State Management: Redux Toolkit was chosen for its streamlined approach to state management, especially for asynchronous data fetching and global state such as user authentication and the watchlist.

Authentication: A simplified session management approach was used. On successful login, the user's ID and profile data are stored in localStorage, and the application's state is updated accordingly. This is handled by a custom useAuth hook.

Image Handling: To avoid storing large files in MongoDB, user profile pictures are uploaded to Cloudinary, and only the resulting public URL is saved in the database.

UI/UX: Frontend validation and React Hot Toast provide non-intrusive notifications for user feedback on actions like signing up or submitting reviews, improving the user experience.

Performance Optimization: The API endpoints are designed to handle filtering and pagination on the backend to reduce network bandwidth and ensure the application remains responsive, even with a large number of movies.
