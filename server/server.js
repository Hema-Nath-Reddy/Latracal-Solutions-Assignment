import {
  MongoClient,
  ReturnDocument,
  ServerApiVersion,
  ObjectId,
} from "mongodb";

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import bcrypt from "bcrypt";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import https from "https";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cineview_profile_pics", // A folder in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 250, height: 250, crop: "fill" }], // Optional transformations
  },
});

const upload = multer({ storage: storage });
const TMDB_API_KEY = process.env.TMDB_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
let db;

async function connectToDB() {
  try {
    const uri = `${process.env.MONGODB_URI}`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    db = client.db("webathon");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
//API Integrated
//GET /movies - Retrieve all movies (with pagination and filtering)
app.get("/movies", async (req, res) => {
  try {
    const { query, genre, page = 1 } = req.query;

    let tmdbUrl;

    if (query) {
      tmdbUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}&include_adult=false`;
    } else {
      tmdbUrl = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

      if (genre) {
        tmdbUrl += `&with_genres=${genre}`;
      }
    }

    const response = await axios.get(tmdbUrl, {
      headers: {
        Accept: "application/json",
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    const tmdbMovies = response.data.results;

    if (tmdbMovies && tmdbMovies.length > 0) {
      return res.status(200).json(tmdbMovies);
    } else {
      return res.status(404).json({ message: "No movies found" });
    }
  } catch (error) {
    console.log("Error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });

    if (!res.headersSent) {
      return res.status(500).json({
        message: "Error fetching movies from TMDB",
        error: error.response?.data || error.message,
      });
    }
  }
});

//API Integrated
//GET /movies/:id - Retrieve a specific movie with reviews
app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
      {
        headers: { Accept: "application/json" },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    const movie = response.data;

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movies from TMDB",
      error: error.message,
    });
  }
});

//API Integrated
app.get("/movies/cast/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`,
      {
        headers: { Accept: "application/json" },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    const movie = response.data;

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movies from TMDB",
      error: error.message,
    });
  }
});

//POST /movies - Add a new movie (admin only)
app.post("/movie", async (req, res) => {
  try {
    const newMovie = req.body;

    const response = await axios.post(
      `${TMDB_BASE_URL}/movie?api_key=${TMDB_API_KEY}`,
      newMovie,
      {
        headers: { Accept: "application/json" },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    const createdMovie = response.data;

    if (createdMovie) {
      res.status(201).json(createdMovie);
    } else {
      res.status(201).json(createdMovie);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error creating movie in TMDB",
      error: error.message,
    });
  }
});

//API Integrated
//GET /movies/:id/reviews - Retrieve reviews for a specific movie
app.get("/movie/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;

    // Use the aggregation pipeline to join reviews with user details
    const reviewsWithUsers = await db
      .collection("reviews")
      .aggregate([
        // Match reviews for the specific movie ID
        {
          $match: {
            movieId: id,
          },
        },
        // Perform a lookup to join with the 'users' collection
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "reviewerDetails",
          },
        },
        // Unwind the reviewerDetails array to get a single user object
        {
          $unwind: "$reviewerDetails",
        },
        // Project the final output to select only the fields you need
        {
          $project: {
            _id: 1,
            movieId: 1,
            reviewText: 1,
            rating: 1,
            timestamp: 1,
            author: "$reviewerDetails.username", // Use the username from the joined user document
            profilePicture: "$reviewerDetails.profilePicture", // Use the profile picture from the joined user document
          },
        },
      ])
      .toArray();

    if (reviewsWithUsers) {
      res.status(200).json(reviewsWithUsers);
    } else {
      res.status(404).json({ message: "No reviews found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
});
//API Integrated
//POST /movies/:id/reviews - Submit a new review for a movie
app.post("/movies/:id/review", async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewText, userId, rating } = req.body;

    // 1. Validate the user ID
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // 2. Find the user to get their username
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Create the review document
    const newReview = {
      movieId: id, // Store TMDB ID as string
      reviewText,
      author: user.username, // Use username from database for security
      userId: new ObjectId(userId),
      rating: Number(rating),
      timestamp: new Date(),
    };

    // 4. Insert the new review into the database
    const response = await db.collection("reviews").insertOne(newReview);

    if (response.insertedId) {
      // Return the complete review document
      res.status(201).json({ ...newReview, _id: response.insertedId });
    } else {
      res.status(500).json({ message: "Error adding review" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error submitting review",
      error: error.message,
    });
  }
});

//API Integrated partially
//GET /users/:id - Retrieve user profile and review history
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user profile",
      error: error.message,
    });
  }
});

//PUT /users/:id - Update user profile
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email } = req.body;
    const response = await db.collection("users").findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name,
          username,
          email,
        },
      }
    );
    if (response) {
      res.status(200).json({ message: "User profile updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating user profile",
      error: error.message,
    });
  }
});

//API Integrated
// GET /users/:id/watchlist - Retrieve a user's watchlist
app.get("/users/:id/watchlist", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ watchlist: user.watchlist || [] });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching watchlist",
      error: error.message,
    });
  }
});

//API Integrated
// POST /users/:id/watchlist - Add movie to watchlist
app.post("/users/:id/watchlist", async (req, res) => {
  try {
    const { id } = req.params;
    const { movieId } = req.body;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const movieIdNum = parseInt(movieId, 10);
    if (Number.isNaN(movieIdNum)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $addToSet: { watchlist: movieIdNum } },
        { returnDocument: "after" }
      );
    if (!result.value) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ watchlist: result.value.watchlist || [] });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding movie to watchlist",
      error: error.message,
    });
  }
});

//API Integrated
// DELETE /users/:id/watchlist/:movieId - Remove movie from watchlist
app.delete("/users/:id/watchlist/:movieId", async (req, res) => {
  try {
    const { id, movieId } = req.params;

    // Log the ID being received to verify it matches your DB
    console.log("Received userId:", id);

    // Validate the ID format (your code already does this)
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userIdAsObjectId = new ObjectId(id);
    const movieIdNum = parseInt(movieId, 10);

    // Log the result of the query to confirm if a user was found
    const result = await db.collection("users").findOneAndUpdate(
      { _id: userIdAsObjectId }, // This is the query filter
      { $pull: { watchlist: movieIdNum } },
      { returnDocument: "after" }
    );

    // Log the result of the database operation
    console.log("Database findOneAndUpdate result:", result.value);

    if (!result.value) {
      console.log(result.value);
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ watchlist: result.value.watchlist || [] });
  } catch (error) {
    return res.status(500).json({
      message: "Error removing movie from watchlist",
      error: error.message,
    });
  }
});

//API Integrated
app.post("/signUp", upload.single("profilePic"), async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for password hashing (best practice)
    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePictureUrl = "default_profile_pic_url"; // Default URL if no file is uploaded

    // If a file was uploaded, use the secure URL from the Cloudinary response
    if (req.file) {
      profilePictureUrl = req.file.path;
    }

    const user = {
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePictureUrl,
      joinDate: new Date(),
    };

    const result = await db.collection("users").insertOne(user);

    // Send back a success response
    res.status(201).json({
      _id: result.insertedId,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error signing up",
      error: error.message,
    });
  }
});

//API Integrated
app.post("/logIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Remove sensitive data before sending
    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      profile: user.profilePicture,
      joinDate: user.joinDate,
      username: user.username,
      // Add other non-sensitive user fields you need
      // DON'T send password or other sensitive data
    };

    // Return user object along with success message
    res.status(200).json({
      message: "Login successful",
      user: userResponse, // Add this line
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log("Connecting to MongoDB...");
  await connectToDB();
});
