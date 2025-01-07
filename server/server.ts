import express from "express";
const app = express();
const PORT = process.env.PORT || 5001;
import "dotenv/config";

// Middleware Includes
import sessionMiddleware from "./modules/session-middleware";
import passport from "./strategies/user.strategy";

// Route Includes
import userRouter from "./routes/user.router";
import { updateLocalCardDatabase } from "./modules/updateDatabase";

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/api/user", userRouter);



// This is the route to hit if you want to update your local card database.
app.put("/api/update", async (req, res) => {
  try {
    await updateLocalCardDatabase();
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});
// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
