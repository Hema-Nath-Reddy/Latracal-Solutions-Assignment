import {
  MongoClient,
  ReturnDocument,
  ServerApiVersion,
  ObjectId,
} from "mongodb";
import https from "https";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
let db;
dotenv.config();
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
//GET /movies - Retrieve all movies (with pagination and filtering)
app.get("/movies", async (req, res) => {
  try {
    const { query, genre, page = 1 } = req.query;

    let tmdbUrl = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&page=${page}`;

    if (query) {
      tmdbUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`;
    }
    // You can add logic for genre filtering here if TMDB's API supports it directly.

    const response = await axios.get(tmdbUrl, {
      headers: { Accept: "application/json" },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      // 👈 bypass SSL check
    });
    const tmdbMovies = response.data.results;

    // Optionally, you can now check your local database for any custom reviews or ratings
    // and merge them with the TMDB data before sending the response.

    if (tmdbMovies) {
      res.status(200).json(tmdbMovies);
    } else {
      res.status(404).json({ message: "No movies found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movies from TMDB",
      error: error.message,
    });
  }
});
//GET /movies/:id - Retrieve a specific movie with reviews
app.get("/movie/:id", async (req, res) => {
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
    const { review } = req.body;
    const response = await db
      .collection("reviews")
      .insertOne({ movieId: id, review });
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
const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log("Connecting to MongoDB...");
  /*   await connectToDB(); */
});
