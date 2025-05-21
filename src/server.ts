import "reflect-metadata";
import "dotenv/config";
import App from "./app";
import dotenv from "dotenv";
import AuthRoute from "./modules/auth/auth.route";
import UserRoute from "./modules/user/user.route";
import MemorialRoute from "./modules/memorial/memorial.route";
import RSVPRoute from "./modules/rsvp/rsvp.route";
import ObituaryRoute from "./modules/obituary/obituary.route";
import passport from "./config/passport";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const routes = [
  new AuthRoute(),
  new UserRoute(),
  new MemorialRoute(),
  new RSVPRoute(),
  new ObituaryRoute(),
];
const app = new App(routes);

// // Initialize Passport
// app.app.use(passport.initialize());

// // Add OAuth routes
// app.app.use('/api/auth', authRoutes);

app.listen();
