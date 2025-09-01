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

//GET /movies/:id/reviews - Retrieve reviews for a specific movie
app.get("/movies/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await db
      .collection("reviews")
      .find({ movieId: id })
      .toArray();
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No reviews found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews from TMDB",
      error: error.message,
    });
  }
});

//POST /movies/:id/reviews - Submit a new review for a movie
app.post("/movies/:id/review", async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewText, name, userId, rating } = req.body;
    const response = await db
      .collection("reviews")
      .insertOne({ movieId: id, reviewText, name, userId, rating });
    if (response) {
      const movieId = response.insertedId;
      res.status(201).json({ message: "Review added successfully", movieId });
    } else {
      res.status(500).json({ message: "Error adding review" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movies from TMDB",
      error: error.message,
    });
  }
});

//API Integrated
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

//GET /users/:id/watchlist - Retrieve user's watchlist
app.get("/users/:id/watchlist", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { watchlist: 1, _id: 0 } }
      );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.watchlist || []);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user's watchlist",
      error: error.message,
    });
  }
});

//POST /users/:id/watchlist - Add movie to watchlist
app.post("/users/:id/watchlist", async (req, res) => {
  try {
    const { id } = req.params;
    const { movieId } = req.body;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    if (!ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }
    const user = await db.collection("users").findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $addToSet: { watchlist: new ObjectId(movieId) },
      }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json({
      message: "Error adding movie to watchlist",
      error: error.message,
    });
  }
});

//DELETE /users/:id/watchlist/:movieId - Remove movie from watchlist
app.delete("/user/:id/watchlist", async (req, res) => {
  try {
    const { id } = req.params;
    const { movieId } = req.body;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    if (!ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }
    const response = await db.collection("users").findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $pull: { watchlist: new ObjectId(movieId) },
      }
    );
    if (!response) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }
    return res.status(200).json({ message: "Movie removed from watchlist" });
  } catch (error) {
    res.status(500).json({
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
      joinDate : user.joinDate,
      username: user.username
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
