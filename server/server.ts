import express from 'express';
const app = express();
const PORT = process.env.PORT || 5001;
import 'dotenv/config'

// Middleware Includes
import sessionMiddleware from './modules/session-middleware';
import passport from './strategies/user.strategy';

// Route Includes
import userRouter from './routes/user.router';

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
